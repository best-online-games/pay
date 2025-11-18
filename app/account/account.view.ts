namespace $.$$ {
	const balance_write = new WeakMap<$hyoo_crus_atom_str, any>()

	export class $bog_pay_app_account extends $.$bog_pay_app_account {
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

		@$mol_mem
		status_text() {
			const st = this.subscription_status()
			if (st === 'none') return 'Подписка: отсутствует'
			return `Подписка: ${st}`
		}

		@$mol_mem
		period_text() {
			const p = this.subscription_period()
			if (!p.start || !p.end) return 'Период: —'
			const start = new Date(p.start).toLocaleString()
			const end = new Date(p.end).toLocaleString()
			return `Период: ${start} — ${end}`
		}

		@$mol_mem
		renewal_text() {
			const r = this.subscription_renewal()
			return `Автопродление: ${r ?? '—'}`
		}

		@$mol_mem
		vpn_text() {
			return this.is_vpn_allowed() ? 'VPN доступен' : 'VPN недоступен'
		}

		Subscribe_btn() {
			const $ = this.$
			return $.$mol_button_major.make({
				sub: () => [$.$mol_text.make({ text: () => 'Оформить (14 дней бесплатно)' })],
				click: () => {
					this.subscribe()
				},
				enabled: () => this.subscription_status() === 'none',
			})
		}

		Renew_btn() {
			const $ = this.$
			return $.$mol_button_minor.make({
				sub: () => [$.$mol_text.make({ text: () => '+1 месяц (mock)' })],
				click: () => {
					this.renew()
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
							this.subscription_renewal() === 'auto'
								? 'Выключить автопродление'
								: 'Включить автопродление',
					}),
				],
				click: () => {
					const mode = this.subscription_renewal()
					if (mode === 'auto') this.cancel_auto()
					else this.sub_active()?.renew_auto()
				},
				enabled: () => this.subscription_status() !== 'none',
			})
		}

		Download_ovpn_btn() {
			const $ = this.$
			return $.$mol_button_download.make({
				sub: () => [$.$mol_text.make({ text: () => 'Скачать .ovpn' })],
				file_name: () => this.ovpn_file_name(),
				blob: () => this.ovpn_file_blob(),
				enabled: () => this.is_vpn_allowed(),
			})
		}
	}
}
