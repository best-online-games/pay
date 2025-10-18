namespace $ {
	// Global shared registry of users for admin overview/cron-like actions
	export class $bog_pay_app_people extends $hyoo_crus_entity.with({
		List: $hyoo_crus_list_ref_to(() => $bog_pay_app_person),
	}) {
		@$mol_mem
		static hall() {
			// Use each user's home land as registry
			// Everyone registers in their own home land
			const glob = this.$.$hyoo_crus_glob
			const home_land = glob.home().land()

			this.$.$mol_log3_rise({
				place: this,
				message: 'People hall land (using home)',
				land_ref: home_land.ref().description,
			})

			const ref = this.$.$hyoo_crus_ref_resolve(home_land.ref(), this.$.$hyoo_crus_ref('___bogPeopl'))
			return glob.Node(ref, $bog_pay_app_people)
		}
	}
}
