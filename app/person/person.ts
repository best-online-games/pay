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

		// Registration: add reference to this Person into shared registry
		// Person lives in user's home land, but reference goes to shared registry
		@$mol_mem
		ensure_registered() {
			console.log('>>> ensure_registered called for Person', this.ref().description)

			// Get shared registry
			const people = $bog_pay_app_people.hall()
			console.log('>>> got shared people registry land', people.land().ref().description)

			const list = people.List(null)
			console.log('>>> got list', list)
			if (!list) {
				console.log('>>> ERROR: list is null!')
				return false
			}

			// Check if this Person ref is already in the list
			const wasRegistered = list.has(this.ref())
			console.log('>>> wasRegistered', wasRegistered, 'my ref:', this.ref().description)

			if (!wasRegistered) {
				console.log('>>> adding my Person ref to shared registry')
				list.has(this.ref(), true)
				console.log('>>> added!')

				this.$.$mol_log3_rise({
					place: this,
					message: 'User registered in People',
					person: this.ref().description,
					name: this.Name()?.str() || '(no name)',
					email: this.Email()?.str() || '(no email)',
				})
			}
			console.log('>>> ensure_registered done')
			return true
		}
	}
}
