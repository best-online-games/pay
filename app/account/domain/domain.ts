namespace $ {
	export class $bog_pay_app_account_domain extends $mol_object2 {
		// CRUS context

		@$mol_mem
		profile() {
			// Профиль текущего пользователя (локально, CRUS home space)
			const person = $hyoo_crus_glob.home().hall_by($bog_pay_app_person, {})

			// Ensure person is registered in People list in global land
			this.ensure_registered(person!)

			return person
		}

		@$mol_action
		ensure_registered(person: $bog_pay_app_person) {
			try {
				const registry = $bog_pay_app_people.hall()
				const list = registry.List(null)

				if (!list) {
					console.error('>>> Cannot register: List is null')
					return
				}

				const person_ref = person.ref()
				const already_has = list.has(person_ref.description!)

				if (already_has) {
					console.log('>>> User already registered in global land', {
						person_ref: person_ref.description,
						peer: person.land().auth().peer(),
					})
					return
				}

				// Add to global registry
				list.add(person_ref.description!)

				console.log('>>> ✅ User registered in global land', {
					person_ref: person_ref.description,
					peer: person.land().auth().peer(),
					name: person.Name()?.str() || '(no name)',
					email: person.Email()?.str() || '(no email)',
					global_land: $bog_pay_app_global_land_id,
				})

				this.$.$mol_log3_rise({
					place: this,
					message: 'User registered in global land',
					person_ref: person_ref.description,
					peer: person.land().auth().peer(),
				})
			} catch (error) {
				console.error('>>> Failed to register user in global land', error)
				this.$.$mol_log3_rise({
					place: this,
					message: 'Failed to register user',
					error: String(error),
				})
			}
		}

		@$mol_mem
		plan_basic() {
			// Единственный публичный тариф
			return $bog_pay_app_plan.basic()
		}

		@$mol_mem
		sub_active() {
			// Текущая активная (или trial) подписка, если есть
			return this.profile()?.active_sub() ?? null
		}

		// Pricing & Balance

		@$mol_mem
		price_cents() {
			return 9900
		}

		@$mol_mem
		balance_cents(next?: number) {
			const person = this.profile()!
			if (next !== undefined) {
				person.BalanceCents(null)!.val(String(Math.max(0, Math.floor(next))))
			}
			return Number(person.BalanceCents()?.val() ?? '0')
		}

		// Invoices

		@$mol_action
		topup_mock_rub(amountRub: number) {
			const person = this.profile()!
			const inv = person.Invoices(null)!.remote_make({})!
			inv.Person(null)!.val(person.ref())
			inv.Kind(null)!.val('topup')
			inv.AmountCents(null)!.val(String(Math.round(amountRub * 100)))
			inv.Currency(null)!.val('RUB')
			inv.Provider(null)!.val('mock')
			inv.mark_pending()
			inv.mark_paid()

			const newBal = this.balance_cents() + inv.amount_cents()
			this.balance_cents(newBal)

			console.log('[Billing] topup (mock):', {
				person: person.ref().description,
				delta: inv.amount_cents(),
				balance: newBal,
			})

			return inv
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

			this.balance_cents(bal - amount)

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

		// OVPN mock download

		@$mol_mem
		ovpn_file_name() {
			const peer = this.$.$hyoo_crus_glob.home().land().auth().peer()
			return `${peer}.ovpn`
		}

		ovpn_file_blob() {
			const peer = this.$.$hyoo_crus_glob.home().land().auth().peer()
			const content = `# OVPN profile (mock)
# user: ${peer}
# generated: ${new Date().toISOString()}
`
			return new Blob([content], { type: 'application/x-openvpn-profile' })
		}

		// Actions

		@$mol_action
		subscribe() {
			// Идемпотентно: если уже есть активная — просто приводим доступ в соответствие
			const active = this.sub_active()
			if (active) {
				active.enforce_access_mock()
				return active
			}

			const person = this.profile()!
			const plan = this.plan_basic()

			// Создаём подписку и запускаем trial (14 дней)
			const sub = person.Subscriptions(null)!.remote_make({})!
			sub.Person(null)!.val(person.ref())
			sub.Plan(null)!.val(plan.ref())
			sub.start_trial()

			// Мокаем выпуск сертификата
			sub.enforce_access_mock()
			console.log('[Billing] subscribe (mock): start trial for plan', {
				person: person.ref().description,
				plan: plan.ref().description,
				status: sub.Status()?.val(),
				period: { start: sub.PeriodStart()?.val(), end: sub.PeriodEnd()?.val() },
			})

			return sub
		}

		@$mol_action
		renew() {
			// Продление вручную: списываем средства и продлеваем период
			let sub = this.sub_active()

			if (!sub) {
				const person = this.profile()!
				const plan = this.plan_basic()
				sub = person.Subscriptions(null)!.remote_make({})!
				sub.Person(null)!.val(person.ref())
				sub.Plan(null)!.val(plan.ref())
			}

			// Оплата (mock, с баланса)
			if (!this.charge_sub_renewal_mock(sub)) {
				console.log('[Billing] renew (mock): insufficient funds, please top-up balance first')
				return sub
			}

			// Продлеваем период на dev-интервал
			sub.activate_month()

			console.log('[Billing] renew (mock): +period', {
				subscription: sub.ref().description,
				status: sub.Status()?.val(),
				period: { start: sub.PeriodStart()?.val(), end: sub.PeriodEnd()?.val() },
				balance: this.balance_cents(),
			})

			// Приводим доступ
			sub.enforce_access_mock()
			return sub
		}

		@$mol_action
		cancel_auto() {
			const sub = this.sub_active()
			if (!sub) return

			sub.cancel_auto()
			console.log('[Billing] cancel auto (mock): access remains until period end', {
				subscription: sub.ref().description,
				status: sub.Status()?.val(),
				renewal: sub.RenewalMode()?.val(),
				period: { start: sub.PeriodStart()?.val(), end: sub.PeriodEnd()?.val() },
			})

			// Доступ не отзываем до конца оплаченного/триального периода
			sub.enforce_access_mock()
		}

		// Enforcement

		@$mol_action
		enforce_access() {
			// Внешняя точка согласования доступа: дергать периодически (UI таймером) или при навигации
			const sub = this.sub_active()

			if (sub) {
				// Если период истёк и стоит автопродление — пытаемся списать и продлить
				const expired = sub.period_end_ms() <= Date.now()
				const mode = sub.RenewalMode()?.val()

				if (expired && mode === 'auto') {
					const paid = this.charge_sub_renewal_mock(sub)
					if (paid) {
						sub.activate_month()
					} else {
						// Недостаточно средств: отключаем автопродление и ставим canceled
						sub.RenewalMode(null)!.val('manual')
						sub.Status(null)!.val('canceled')
					}
				}

				sub.enforce_access_mock()
				return
			}

			// Нет активной подписки => отозвать у всего, что могло остаться в провижнене
			const person = this.profile()
			const subs = person?.Subscriptions()?.remote_list() ?? []
			for (const s of subs) {
				s.enforce_access_mock()
			}
		}

		// Queries for UI

		@$mol_mem
		is_vpn_allowed() {
			// Бизнес-правило: VPN доступен только при активной/триальной подписке и пока не истек PeriodEnd
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
	}
}
