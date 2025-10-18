namespace $ {
	// Global shared registry of users for admin overview/cron-like actions
	// This is a SHARED land that everyone can write to (to register themselves)
	export class $bog_pay_app_people extends $hyoo_crus_entity.with({
		List: $hyoo_crus_list_ref_to(() => $bog_pay_app_person),
	}) {
		@$mol_mem
		static hall() {
			// Use SHARED land for registry so admin can see all users
			// Land ID: bogPay01_people01_Registry (3 parts, 8 chars each)
			const glob = this.$.$hyoo_crus_glob

			// Create or get shared registry land with public write access
			const shared_land_id = 'bogPay01_people01_Registry'
			const shared_land = glob.land_grab(
				this.$.$hyoo_crus_ref(shared_land_id),
				{ '': this.$.$hyoo_crus_rank_post('just') }, // Everyone can write
			)

			this.$.$mol_log3_rise({
				place: this,
				message: 'People registry (shared land)',
				land_ref: shared_land.ref().description,
			})

			// Root node in shared land is the People registry
			return shared_land.home().hall_by($bog_pay_app_people, {})!
		}
	}
}
