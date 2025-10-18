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
			this.grant_admin_rule()
			this.register_in_people()
		}

		@$mol_action
		grant_admin_rule() {
			// Admin rights are granted via presets on creation time (e.g., People.hall and new nodes).
			// No direct ensure() on atom/list fields here.
		}

		@$mol_action
		register_in_people() {
			// Add this user into global People registry (admin rights are set via People.hall preset)
			const people = $bog_pay_app_people.hall()
			// List is hosted in admin hall, rights are inherited
			people.List(null)!.has(this.ref(), true)
		}
	}

	// Global registry of users for admin overview/cron-like actions
	export class $bog_pay_app_people extends $hyoo_crus_entity.with({
		List: $hyoo_crus_list_ref_to(() => $bog_pay_app_person),
	}) {
		@$mol_mem
		static hall() {
			// Allow any user to append themselves into People registry
			return this.$.$hyoo_crus_glob.home().hall_by($bog_pay_app_people, { '': $hyoo_crus_rank_post('just') })!
		}
	}
}
