namespace $ {
	export class $bog_pay_person extends $hyoo_crus_entity.with({
		Name: $hyoo_crus_text,
		Email: $hyoo_crus_text,
		CreatedAt: $hyoo_crus_atom_str,
		BalanceCents: $hyoo_crus_atom_str,
		Subscriptions: $hyoo_crus_list_ref_to(() => $bog_pay_subscription),
		Invoices: $hyoo_crus_list_ref_to(() => $bog_pay_invoice),
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
	}
}
