namespace $ {
	export class $bog_pay_account extends $mol_object2 {
		// CRUS context

		@$mol_mem
		profile() {
			// Профиль текущего пользователя (локально, CRUS home space)
			return $hyoo_crus_glob.home().hall_by($bog_pay_person, {})
		}

		@$mol_mem
		plan_basic() {
			// Единственный публичный тариф
			return $bog_pay_plan.basic()
		}

		@$mol_mem
		sub_active() {
			// Текущая активная (или trial) подписка, если есть
			return this.profile()?.active_sub() ?? null
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
			// Идемпотентно: продлевает на месяц от текущего периода (или от текущего времени)
			let sub = this.sub_active()

			// Если нет подписки вообще — создадим и активируем сразу месяц (без trial)
			if (!sub) {
				const person = this.profile()!
				const plan = this.plan_basic()
				sub = person.Subscriptions(null)!.remote_make({})!
				sub.Person(null)!.val(person.ref())
				sub.Plan(null)!.val(plan.ref())
				// Активируем на месяц
				sub.activate_month()
			} else {
				// Продление текущей активной/триальной
				sub.activate_month()
			}

			// Мокаем оплату/чекаут
			console.log('[Billing] renew (mock): +1 month', {
				subscription: sub.ref().description,
				status: sub.Status()?.val(),
				period: { start: sub.PeriodStart()?.val(), end: sub.PeriodEnd()?.val() },
			})

			// Проверяем и приводим доступ
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
				sub.enforce_access_mock()
			} else {
				// Нет активной подписки => отозвать у всего, что могло остаться в провижнене
				// Для простоты перебираем все подписки профиля
				const person = this.profile()
				const subs = person?.Subscriptions()?.remote_list() ?? []
				for (const s of subs) {
					s.enforce_access_mock()
				}
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
