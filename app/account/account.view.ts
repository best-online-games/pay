namespace $.$$ {
	export class $bog_pay_app_account extends $.$bog_pay_app_account {
		@$mol_mem
		account() {
			return this
		}

		openvpn_base_url() {
			return 'http://87.120.36.150:8080'
		}

		openvpn_api() {
			const base = this.openvpn_base_url()
			const headers = { 'Content-Type': 'text/plain; charset=utf-8' }
			return {
				ensure_certificate: (client: string) =>
					this.$.$mol_fetch.text(`${base}/api/v1/openvpn/certificates`, {
						method: 'POST',
						headers,
						body: client,
					}),
				revoke_certificate: (client: string) =>
					this.$.$mol_fetch.response(`${base}/api/v1/openvpn/certificates/revoke`, {
						method: 'POST',
						headers,
						body: client,
					}),
			}
		}

		// CRUS context

		@$mol_mem
		profile() {
			const person = this.$.$hyoo_crus_glob.home().hall_by($bog_pay_app_person, {})
			this.ensure_registered()
			return person
		}

		@$mol_mem
		ensure_registered() {
			const person = this.$.$hyoo_crus_glob.home().hall_by($bog_pay_app_person, {})
			if (!person) return

			const person_ref = person.ref()
			const peer = person.land().auth().peer()

			try {
				const registry = $bog_pay_app_people.hall()
				const list = registry.List()
				if (!list) return
				if (list.has(person_ref.description!)) return
				list.add(person_ref.description!)
			} catch (error) {
				if (error instanceof Promise) throw error
				console.error('Failed to register in global land', { error, peer })
			}
		}

		@$mol_mem
		plan_basic() {
			return $bog_pay_app_plan.basic()
		}

		@$mol_mem
		sub_active() {
			return this.profile()?.active_sub() ?? null
		}

		// Pricing & Balance

		@$mol_mem
		price_cents() {
			return 9900
		}

		@$mol_mem
		balance_cents() {
			const person = this.profile()!
			return this.$.$bog_pay_balance_get(person)
		}

		@$mol_action
		balance_decrease(amountCents: number) {
			if (amountCents <= 0) return this.balance_cents()
			const person = this.profile()!
			const next = Math.max(0, this.balance_cents() - Math.floor(amountCents))
			this.$.$bog_pay_balance_set(person, next)
			return next
		}

		@$mol_action
		charge_sub_renewal_mock(sub: $bog_pay_app_subscription) {
			const amount = this.price_cents()
			const person = this.profile()!
			const bal = this.balance_cents()

			if (bal < amount) {
				console.log('[Billing] charge skipped: insufficient funds', { balance: bal, need: amount })
				return false
			}

			this.balance_decrease(amount)

			const inv = person.Invoices(null)!.remote_make({})!
			inv.Person(null)!.val(person.ref())
			inv.Subscription(null)!.val(sub.ref())
			inv.Kind(null)!.val('charge')
			inv.AmountCents(null)!.val(String(amount))
			inv.Currency(null)!.val('RUB')
			inv.Provider(null)!.val('mock')
			inv.mark_pending()
			inv.mark_paid()

			console.log('[Billing] charge (mock): renewal paid', {
				subscription: sub.ref().description,
				amount,
				balance: this.balance_cents(),
			})

			return true
		}

		@$mol_mem
		ovpn_file_name() {
			const peer = this.$.$hyoo_crus_glob.home().land().auth().peer()
			return `${peer}.ovpn`
		}

		@$mol_action
		ovpn_file_blob() {
			if (!this.is_vpn_allowed()) {
				throw new Error('VPN unavailable: no active subscription')
			}

			const peer = this.$.$hyoo_crus_glob.home().land().auth().peer()
			const profile = this.openvpn_api().ensure_certificate(peer)
			return new Blob([profile], { type: 'application/x-openvpn-profile' })
		}

		// Actions

		@$mol_action
		subscribe() {
			const active = this.sub_active()
			if (active) {
				active.enforce_access(this.openvpn_api())
				return active
			}

			const person = this.profile()!
			const plan = this.plan_basic()

			const sub = person.Subscriptions(null)!.remote_make({})!
			sub.Person(null)!.val(person.ref())
			sub.Plan(null)!.val(plan.ref())
			sub.start_trial()

			sub.enforce_access(this.openvpn_api())
			return sub
		}

		@$mol_action
		renew() {
			let sub = this.sub_active()

			if (!sub) {
				const person = this.profile()!
				const plan = this.plan_basic()
				sub = person.Subscriptions(null)!.remote_make({})!
				sub.Person(null)!.val(person.ref())
				sub.Plan(null)!.val(plan.ref())
			}

			if (!this.charge_sub_renewal_mock(sub)) {
				return sub
			}

			sub.activate_month()
			sub.enforce_access(this.openvpn_api())
			return sub
		}

		@$mol_action
		cancel_auto() {
			const sub = this.sub_active()
			if (!sub) return

			sub.cancel_auto()
			sub.enforce_access(this.openvpn_api())
		}

		// Enforcement

		@$mol_action
		enforce_access() {
			const sub = this.sub_active()

			if (sub) {
				const expired = sub.period_end_ms() <= Date.now()
				const mode = sub.RenewalMode()?.val()

				if (expired && mode === 'auto') {
					const paid = this.charge_sub_renewal_mock(sub)
					if (paid) {
						sub.activate_month()
					} else {
						sub.RenewalMode(null)!.val('manual')
						sub.Status(null)!.val('canceled')
					}
				}

				sub.enforce_access(this.openvpn_api())
				return
			}

			const person = this.profile()
			const subs = person?.Subscriptions()?.remote_list() ?? []
			for (const s of subs) {
				s.enforce_access(this.openvpn_api())
			}
		}

		// Queries for UI

		@$mol_mem
		is_vpn_allowed() {
			return !!this.sub_active()
		}

		@$mol_mem
		subscription_status() {
			const sub = this.sub_active()
			if (!sub) return 'none'
			return sub.Status()?.val() ?? 'none'
		}

		@$mol_mem
		subscription_period() {
			const sub = this.sub_active()
			return {
				start: sub?.PeriodStart()?.val() ?? null,
				end: sub?.PeriodEnd()?.val() ?? null,
			}
		}

		@$mol_mem
		subscription_renewal() {
			const sub = this.sub_active()
			return sub?.RenewalMode()?.val() ?? null
		}

		@$mol_action
		enforce() {
			this.account().enforce_access()
		}

		@$mol_mem
		enforce_loop() {
			new this.$.$mol_after_timeout(2000, () => {
				this.enforce()
				this.enforce_loop()
			})
			return null as any
		}

		@$mol_mem
		status_text() {
			const st = this.account().subscription_status()
			if (st === 'none') return 'Подписка: отсутствует'
			return `Подписка: ${st}`
		}

		@$mol_mem
		period_text() {
			const p = this.account().subscription_period()
			if (!p.start || !p.end) return 'Период: —'
			const start = new Date(p.start).toLocaleString()
			const end = new Date(p.end).toLocaleString()
			return `Период: ${start} — ${end}`
		}

		@$mol_mem
		renewal_text() {
			const r = this.account().subscription_renewal()
			return `Автопродление: ${r ?? '—'}`
		}

		@$mol_mem
		vpn_text() {
			return this.account().is_vpn_allowed() ? 'VPN доступен' : 'VPN недоступен'
		}

		Subscribe_btn() {
			const $ = this.$
			return $.$mol_button_major.make({
				sub: () => [$.$mol_text.make({ text: () => 'Оформить (14 дней бесплатно)' })],
				click: () => {
					this.account().subscribe()
				},
				enabled: () => this.account().subscription_status() === 'none',
			})
		}

		Renew_btn() {
			const $ = this.$
			return $.$mol_button_minor.make({
				sub: () => [$.$mol_text.make({ text: () => '+1 месяц (mock)' })],
				click: () => {
					this.account().renew()
				},
				enabled: () => true,
			})
		}

		Cancel_btn() {
			const $ = this.$
			return $.$mol_button_minor.make({
				sub: () => [
					$.$mol_text.make({
						text: () =>
							this.account().subscription_renewal() === 'auto'
								? 'Выключить автопродление'
								: 'Включить автопродление',
					}),
				],
				click: () => {
					const mode = this.account().subscription_renewal()
					if (mode === 'auto') this.account().cancel_auto()
					else this.account().sub_active()?.renew_auto()
				},
				enabled: () => this.account().subscription_status() !== 'none',
			})
		}

		Info_status() {
			const $ = this.$
			return $.$mol_text.make({ text: () => this.status_text() })
		}

		Info_period() {
			const $ = this.$
			return $.$mol_text.make({ text: () => this.period_text() })
		}

		Info_renewal() {
			const $ = this.$
			return $.$mol_text.make({ text: () => this.renewal_text() })
		}

		Info_vpn() {
			const $ = this.$
			return $.$mol_text.make({ text: () => this.vpn_text() })
		}

		Info_peer() {
			const $ = this.$
			return $.$mol_text.make({
				text: () => {
					const peer = this.$.$hyoo_crus_glob.home().land().auth().peer()
					return `User ID: ${peer}`
				},
			})
		}

		Info_balance() {
			const $ = this.$
			return $.$mol_text.make({
				text: () => {
					const cents = this.account().balance_cents()
					const rub = (cents / 100).toFixed(2)
					return `Баланс: ${rub} ₽`
				},
			})
		}

		@$mol_mem
		images() {
			const person = this.account().profile()
			const bins = person?.Photos()?.remote_list() ?? []
			return bins.map((bin: $hyoo_crus_atom_bin) => {
				const data = bin.val()
				if (!data) return ''
				const blob = new Blob([data], { type: 'image/*' })
				return URL.createObjectURL(blob)
			})
		}

		@$mol_action
		attach_add_files(files: File[]) {
			if (!files || files.length === 0) return
			const person = this.account().profile()!
			for (const file of files) {
				const buf = new Uint8Array(this.$.$mol_wire_sync(file).arrayBuffer())
				const bin = person.Photos(null)!.remote_make({})!
				bin.val(buf)
			}
		}

		@$mol_action
		attach_remove_index(index: number) {
			const person = this.account().profile()
			const list = person?.Photos()?.remote_list() ?? []
			const bin = list[index]
			if (!bin) return
			const url = this.images()[index]
			if (url) {
				try {
					URL.revokeObjectURL(url)
				} catch { }
			}
			person!.Photos(null)!.has(bin.ref(), false)
		}

		Attach_images() {
			const $ = this.$
			return $.$bog_pay_app_account_avatar.make({})
		}

		Download_ovpn_btn() {
			const $ = this.$
			return $.$mol_button_download.make({
				sub: () => [$.$mol_text.make({ text: () => 'Скачать .ovpn' })],
				file_name: () => this.account().ovpn_file_name(),
				blob: () => this.account().ovpn_file_blob(),
				enabled: () => this.account().is_vpn_allowed(),
			})
		}

		Actions() {
			const $ = this.$
			return $.$mol_row.make({
				sub: () => [
					this.Subscribe_btn(),
					this.Renew_btn(),
					this.Cancel_btn(),
					this.Download_ovpn_btn(),
				],
			})
		}

		body() {
			this.enforce_loop()
			return [
				this.Info_peer(),
				this.Info_status(),
				this.Info_period(),
				this.Info_renewal(),
				this.Info_vpn(),
				this.Info_balance(),
				this.Attach_images(),
				this.Actions(),
			]
		}
	}
}
