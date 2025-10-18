namespace $ {
	// Global shared registry of users for admin overview/cron-like actions
	export class $bog_pay_app_people extends $hyoo_crus_entity.with({
		List: $hyoo_crus_list_ref_to(() => $bog_pay_app_person),
	}) {
		// НЕ МЕНЯТЬ !!!!!!!!!!!!!!!!!!
		// Fixed public land ID for shared People registry
		// All users must use the SAME land ID to see each other
		static shared_land_id = 'bogPay00_people00_Shared00'

		@$mol_mem
		static hall() {
			// Use fixed shared land so every user appends to the same People list
			const glob = this.$.$hyoo_crus_glob

			// Grab the fixed public land (create if not exists, with public write access)
			const land_ref = this.$.$hyoo_crus_ref(this.shared_land_id)
			const shared_land = glob.land_grab({
				[land_ref.description!]: $hyoo_crus_rank_post('just'),
			})

			this.$.$mol_log3_rise({
				place: this,
				message: 'People hall land',
				land_ref: shared_land.ref().description,
			})

			const ref = this.$.$hyoo_crus_ref_resolve(shared_land.ref(), this.$.$hyoo_crus_ref('___bogPeopl'))
			return glob.Node(ref, $bog_pay_app_people)
		}
	}
}
