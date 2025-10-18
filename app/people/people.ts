namespace $ {
	// Global shared registry of users for admin overview/cron-like actions
	export class $bog_pay_app_people extends $hyoo_crus_entity.with({
		List: $hyoo_crus_list_ref_to(() => $bog_pay_app_person),
	}) {
		@$mol_mem
		static hall() {
			// Each user creates their own land with public write access
			// Users' lands will sync together through CRUS
			const glob = this.$.$hyoo_crus_glob
			const shared_land = glob.land_grab({ '': $hyoo_crus_rank_post('just') })

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
