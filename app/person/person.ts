namespace $ {
	export class $bog_pay_app_person extends $hyoo_crus_entity.with({
		Name: $hyoo_crus_text,
		Email: $hyoo_crus_text,
		CreatedAt: $hyoo_crus_atom_str,
		BalanceCents: $hyoo_crus_atom_str,
		Subscriptions: $hyoo_crus_list_ref_to(() => $bog_pay_app_subscription),
		Invoices: $hyoo_crus_list_ref_to(() => $bog_pay_app_invoice),
		Photos: $hyoo_crus_list_ref_to(() => $hyoo_crus_atom_bin),
	}) {
		@$mol_mem
		active_sub() {
			const now = Date.now()
			const subs = this.Subscriptions()?.remote_list() ?? []

			for (const sub of subs) {
				const status = sub.Status()?.val()
				const endStr = sub.PeriodEnd()?.val()
				const endAt = endStr ? Date.parse(endStr) : 0

				// Активной считаем подписку/триал с неистекшим периодом
				if (!endAt || endAt <= now) continue
				if (status === 'active' || status === 'trial') return sub
			}

			return null
		}

		// Registration happens separately, not in active_sub to avoid loops
		@$mol_mem
		ensure_registered() {
			console.log('>>> ensure_registered called', new Error().stack)

			const people = $bog_pay_app_people.hall()
			console.log('>>> got people.hall()')

			const list = people.List(null)
			console.log('>>> got list', list)
			if (!list) return false

			const wasRegistered = list.has(this.ref())
			console.log('>>> wasRegistered', wasRegistered)

			if (!wasRegistered) {
				console.log('>>> adding to list')
				list.has(this.ref(), true)
				console.log('>>> added to list')
				this.$.$mol_log3_rise({
					place: this,
					message: 'User registered in People list',
					person: this.ref().description,
				})
			}
			console.log('>>> ensure_registered done')
			return true
		}
	}
}
