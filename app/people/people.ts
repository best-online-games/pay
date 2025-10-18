namespace $ {
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
