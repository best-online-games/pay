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
			// Ensure admin write access and registration to People registry on first access
			this.ensure_admin_and_registry()

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

		@$mol_action
		ensure_admin_and_registry() {
			this.register_in_people()
		}

		@$mol_action
		register_in_people() {
			// Add this user into global People registry (admin rights are set via People.hall preset)
			const people = $bog_pay_app_people.hall()
			// List is hosted in admin hall, rights are inherited
			const list = people.List(null)
			if (!list) {
				this.$.$mol_log3_rise({
					place: this,
					message: 'People list is null',
					hint: 'Cannot register user in global People registry',
				})
				return
			}

			const wasRegistered = list.has(this.ref())
			list.has(this.ref(), true)

			if (!wasRegistered) {
				this.$.$mol_log3_rise({
					place: this,
					message: 'User registered in People',
					person: this.ref().description,
					name: this.Name()?.str() || '(no name)',
					email: this.Email()?.str() || '(no email)',
				})
			}
		}
	}
}
