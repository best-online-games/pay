namespace $ {
	// Global shared registry of users for admin overview/cron-like actions
	// This is a SHARED land that everyone can write to (to register themselves)

	// SHARED REGISTRY LAND ID - everyone must use the same land!
	// This is the land_ref created by admin, all users write to it
	// TODO: Replace with actual land_ref after admin creates it
	export const $bog_pay_app_people_registry_land = 'a5ppYKwl_7XdWXlnm'

	export class $bog_pay_app_people extends $hyoo_crus_entity.with({
		List: $hyoo_crus_list_ref_to(() => $bog_pay_app_person),
	}) {
		// Admin must call this once to create shared registry land
		@$mol_action
		static init_registry() {
			const glob = this.$.$hyoo_crus_glob
			const registry_land = glob.land_grab({ '': this.$.$hyoo_crus_rank_post('just') })

			this.$.$mol_log3_rise({
				place: this,
				message: 'Created shared registry land',
				land_ref: registry_land.ref().description,
				instructions: 'Copy this land_ref and update $bog_pay_app_people_registry_land constant!',
			})

			return registry_land.ref().description
		}

		@$mol_mem
		static hall() {
			// Access shared registry land by known land_ref
			const glob = this.$.$hyoo_crus_glob
			const registry_ref = this.$.$hyoo_crus_ref($bog_pay_app_people_registry_land)
			const shared_land = glob.Land(registry_ref)

			this.$.$mol_log3_rise({
				place: this,
				message: 'People registry (shared land)',
				land_ref: shared_land.ref().description,
			})

			// Root node in shared land is the People registry
			// If it doesn't exist yet, create it
			let registry = shared_land.home().hall_by($bog_pay_app_people, {})
			if (!registry) {
				console.warn('>>> Registry not found in land, creating...')
				// Force creation by accessing List
				registry = shared_land.home().hall_by($bog_pay_app_people, {})!
			}
			return registry
		}
	}
}
