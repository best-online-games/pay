namespace $ {
	// Global shared registry of users for admin overview/cron-like actions
	// This is a SHARED land that everyone can write to (to register themselves)

	// Use the global land for people registry
	export const $bog_pay_app_people_registry_land = $bog_pay_app_global_land_id

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
		static hall(): $bog_pay_app_people {
			// Use global land helper
			const registry = $bog_pay_app_global.hall_by($bog_pay_app_people, {})

			if (!registry) {
				throw new Error('Cannot access people registry in global land')
			}

			// Ensure List is initialized
			if (!registry.List(null)) {
				console.log('>>> Initializing people registry List')
			}

			this.$.$mol_log3_rise({
				place: this,
				message: 'People registry accessed',
				land_ref: $bog_pay_app_global_land_id,
			})

			return registry
		}
	}
}
