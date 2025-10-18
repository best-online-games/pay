namespace $.$$ {
	// Admin page: shows list of users and runs "cron-like" enforcement while open.
	export class $bog_pay_app_admin_page extends $mol_page {
		// Guard: only admin can see and run enforcement
		@$mol_mem
		is_admin() {
			return $bog_pay_app_admin.is_me()
		}

		title() {
			new this.$.$mol_after_frame(() => {
				const btn = this.$.$mol_dom_context.document.querySelector(
					'[id^="$bog_pay_app.Root"] [mol_deck_switch_option][id$="Option(\'3\')"]',
				) as HTMLElement | null
				if (btn && !this.is_admin()) {
					btn.style.display = 'none'
				}
			})
			if (this.is_admin()) {
				return this.$.$mol_locale.text('$bog_pay_app_admin_page_title')
			} else {
				return ''
			}
		}
		sub_title() {
			return this.$.$mol_locale.text('$bog_pay_app_admin_page_title')
		}

		// Using admin helper directly: $bog_pay_app_admin.is_me()

		// Price source (fallback to 9900 if plan not seeded yet)
		@$mol_mem
		price_cents() {
			return Number($bog_pay_app_plan.basic().PriceCents()?.val() ?? '9900')
		}

		// People registry - read from shared registry land
		@$mol_mem
		people() {
			console.log('>>> Admin.people() - reading from shared registry')

			// Get shared registry
			const people_registry = $bog_pay_app_people.hall()
			console.log('>>> Got registry land', people_registry.land().ref().description)

			const list = people_registry.List(null)
			if (!list) {
				console.log('>>> ERROR: registry list is null!')
				return []
			}

			// Get all person references from registry
			const person_refs = list.items_maybe()
			console.log('>>> Registry has', person_refs.length, 'person refs')

			const all_people: $bog_pay_app_person[] = []
			const seen_peers = new Set<string>()

			// Resolve each reference to actual Person object
			for (const person_ref of person_refs) {
				try {
					console.log('>>> Resolving person ref', person_ref.description)

					// Load the person from their home land
					const glob = this.$.$hyoo_crus_glob
					const person = glob.Node(person_ref, $bog_pay_app_person)

					if (!person) {
						console.log('>>> WARNING: Could not resolve person ref', person_ref.description)
						continue
					}

					const peer = person.land().auth().peer()
					console.log('>>> Got person', {
						ref: person_ref.description,
						peer,
						name: person.Name()?.str() || '(no name)',
						email: person.Email()?.str() || '(no email)',
					})

					// Skip duplicates (same peer)
					if (seen_peers.has(peer)) {
						console.log('>>> SKIPPED - duplicate peer')
						continue
					}

					all_people.push(person)
					seen_peers.add(peer)
					console.log('>>> ADDED to list, total:', all_people.length)
				} catch (e) {
					console.log('>>> ERROR resolving person ref', person_ref.description, e)
				}
			}

			console.log('>>> Admin.people() - FINAL RESULT', {
				refs_in_registry: person_refs.length,
				people_found: all_people.length,
				peers: Array.from(seen_peers),
			})

			this.$.$mol_log3_rise({
				place: this,
				message: 'People from shared registry',
				refs_in_registry: person_refs.length,
				people_found: all_people.length,
				people: all_people.map(p => ({
					land_ref: p?.land().ref().description ?? '?',
					peer: p?.land().auth().peer() ?? '?',
					name: p?.Name()?.str() || '(no name)',
					email: p?.Email()?.str() || '(no email)',
				})),
			})

			return all_people
		}

		// Rows content for UI
		@$mol_mem
		rows() {
			return this.people().map((person, i) => this.Row(i))
		}

		// Periodic enforcement while admin page is open (dev: every 10s; prod можно увеличить)
		@$mol_mem
		cron_loop() {
			if (!this.is_admin()) return null as any
			new this.$.$mol_after_timeout(10_000, () => {
				this.enforce_all()
				this.cron_loop() // reschedule
			})
			return null as any
		}

		// Single person fields
		@$mol_mem_key
		person_peer(index: number) {
			const p = this.people()[index]
			return p?.land().auth().peer() ?? '—'
		}

		@$mol_mem_key
		person_name(index: number) {
			const p = this.people()[index]
			return p?.Name()?.str() || '(no name)'
		}

		@$mol_mem_key
		person_email(index: number) {
			const p = this.people()[index]
			return p?.Email()?.str() || '(no email)'
		}

		@$mol_mem_key
		person_balance_rub(index: number) {
			const p = this.people()[index]
			const cents = Number(p?.BalanceCents()?.val() ?? '0')
			return (cents / 100).toFixed(2)
		}

		@$mol_mem_key
		person_sub(index: number) {
			const p = this.people()[index]
			const subs = p?.Subscriptions()?.remote_list() ?? []
			// pick active/trial first; else last
			const now = Date.now()
			const sorted = subs
				.slice()
				.sort(
					(a, b) =>
						(b.PeriodEnd()?.val() ? Date.parse(b.PeriodEnd()!.val()!) : 0) -
						(a.PeriodEnd()?.val() ? Date.parse(a.PeriodEnd()!.val()!) : 0),
				)
			const active = sorted.find(s => {
				const end = s.PeriodEnd()?.val()
				if (!end) return false
				const end_at = Date.parse(end)
				const st = s.Status()?.val()
				return end_at > now && (st === 'active' || st === 'trial')
			})
			return active ?? sorted[0] ?? null
		}

		@$mol_mem_key
		person_sub_status(index: number) {
			const s = this.person_sub(index)
			return s?.Status()?.val() ?? 'none'
		}

		@$mol_mem_key
		person_sub_period_end(index: number) {
			const s = this.person_sub(index)
			const end = s?.PeriodEnd()?.val()
			return end ? new Date(end).toLocaleString() : '—'
		}

		// UI composition

		Enforce_btn() {
			const $ = this.$
			return $.$mol_button_minor.make({
				sub: () => [$.$mol_text.make({ text: () => 'Enforce now' })],
				click: () => {
					this.enforce_all()
				},
				enabled: () => this.is_admin(),
			})
		}

		Head_bar() {
			const $ = this.$
			return $.$mol_row.make({
				sub: () => [
					$.$mol_text.make({
						text: () =>
							this.is_admin() ? 'Admin: People overview' : 'No admin access (set ?admin=<public_peer>)',
					}),
					this.Enforce_btn(),
				],
			})
		}

		@$mol_mem_key
		Row(index: number) {
			const $ = this.$

			this.$.$mol_log3_rise({
				place: this,
				message: 'Rendering person row',
				index,
				peer: this.person_peer(index),
				name: this.person_name(index),
				email: this.person_email(index),
				balance: this.person_balance_rub(index),
				status: this.person_sub_status(index),
				period_end: this.person_sub_period_end(index),
			})

			return $.$mol_row.make({
				sub: () => [
					$.$mol_text.make({ text: () => `Peer: ${this.person_peer(index)}` }),
					$.$mol_text.make({ text: () => `Name: ${this.person_name(index)}` }),
					$.$mol_text.make({ text: () => `Email: ${this.person_email(index)}` }),
					$.$mol_text.make({ text: () => `Balance: ${this.person_balance_rub(index)} ₽` }),
					$.$mol_text.make({ text: () => `Status: ${this.person_sub_status(index)}` }),
					$.$mol_text.make({ text: () => `Until: ${this.person_sub_period_end(index)}` }),
				],
			})
		}

		Body_list() {
			const $ = this.$
			return $.$mol_list.make({
				rows: () => this.rows(),
			})
		}

		sub() {
			// run cron loop while page is mounted
			this.cron_loop()
			return [this.Head_bar(), this.Body_list()]
		}

		// Enforcement logic (cron-like)

		@$mol_action
		enforce_all() {
			if (!this.is_admin()) return
			for (const person of this.people()) {
				this.enforce_person(person)
			}
		}

		@$mol_action
		enforce_person(person: $bog_pay_app_person) {
			// Pick latest subscription (or active)
			const subs = person.Subscriptions()?.remote_list() ?? []
			if (subs.length === 0) return

			// Choose sub to maintain
			let sub = subs.slice().sort((a, b) => {
				const ae = a.PeriodEnd()?.val() ? Date.parse(a.PeriodEnd()!.val()!) : 0
				const be = b.PeriodEnd()?.val() ? Date.parse(b.PeriodEnd()!.val()!) : 0
				return be - ae
			})[0]

			const end_str = sub.PeriodEnd()?.val()
			const end_at = end_str ? Date.parse(end_str) : 0
			const mode = sub.RenewalMode()?.val()
			const now = Date.now()

			// If expired and auto-renew => try charge and extend
			if (end_at && end_at <= now && mode === 'auto') {
				const charged = this.charge_person_for_sub(person, sub)
				if (charged) {
					sub.activate_month()
				} else {
					// no funds: switch to manual and cancel
					sub.RenewalMode(null)!.val('manual')
					sub.Status(null)!.val('canceled')
				}
			}

			// Enforce access state (reconcile provision/revoke)
			sub.enforce_access_mock()
		}

		@$mol_action
		charge_person_for_sub(person: $bog_pay_app_person, sub: $bog_pay_app_subscription) {
			const price = this.price_cents()
			const balance = Number(person.BalanceCents()?.val() ?? '0')
			if (balance < price) return false

			// deduct
			person.BalanceCents(null)!.val(String(balance - price))

			// invoice record
			const inv = person.Invoices(null)!.remote_make({})!
			inv.Person(null)!.val(person.ref())
			inv.Subscription(null)!.val(sub.ref())
			inv.Kind(null)!.val('charge')
			inv.AmountCents(null)!.val(String(price))
			inv.Currency(null)!.val('RUB')
			inv.Provider(null)!.val('admin-cron')
			inv.mark_pending()
			inv.mark_paid()

			return true
		}
	}
}
