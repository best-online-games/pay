namespace $ {
	// Global shared registry of users for admin overview/cron-like actions
	export class $bog_pay_app_people extends $hyoo_crus_entity.with({
		List: $hyoo_crus_list_ref_to(() => $bog_pay_app_person),
	}) {
		@$mol_mem
		static hall() {
			// Use shared land so every user appends to the same People list
			const glob = this.$.$hyoo_crus_glob
			const shared_land = glob.land_grab({ '': $hyoo_crus_rank_post('just') })
			const ref = this.$.$hyoo_crus_ref_resolve(shared_land.ref(), this.$.$hyoo_crus_ref('bogPeopl'))
			return glob.Node(ref, $bog_pay_app_people)
		}
	}
}
