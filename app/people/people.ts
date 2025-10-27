namespace $ {
  // Global shared registry of users for admin overview/cron-like actions
  // This is a SHARED land that everyone can write to (to register themselves)
  // All users (including admin) are automatically added to the list when they first access their profile

  // Use the main domain land for people registry (with join-level permissions)
  export const $bog_pay_app_people_registry_land = 'Pnb1U21r_SIUrlFCI'

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
      console.log('>>> [REGISTRY STEP 1] Starting hall() for people registry')

      const glob = this.$.$hyoo_crus_glob
      const registry_ref = this.$.$hyoo_crus_ref($bog_pay_app_people_registry_land)

      console.log('>>> [REGISTRY STEP 2] Getting shared land', {
        land_id: $bog_pay_app_people_registry_land,
      })

      const shared_land = glob.Land(registry_ref)

      console.log('>>> [REGISTRY STEP 3] Got shared land', {
        land_ref: shared_land.ref().description,
      })

      // IMPORTANT: Pass public permissions when creating registry
      // This ensures all nested nodes (like List) have public access
      const rank = this.$.$hyoo_crus_rank(this.$.$hyoo_crus_rank_tier.join)

      console.log('>>> [REGISTRY STEP 4] Creating/accessing registry with permissions', {
        rank_level: this.$.$hyoo_crus_rank_tier.join,
      })

      const registry = shared_land.home().hall_by($bog_pay_app_people, {
        '': rank,
      })

      if (!registry) {
        console.error('>>> [REGISTRY ERROR] Cannot access people registry in global land')
        throw new Error('Cannot access people registry in global land')
      }

      console.log('>>> [REGISTRY STEP 5] Got registry, checking List', {
        registry_ref: registry.ref().description,
        list_exists: !!registry.List(),
      })

      // Initialize List field if it doesn't exist yet
      // This ensures the List is created with proper permissions for everyone to write
      if (!registry.List()) {
        console.log('>>> [REGISTRY STEP 6] List is null, initializing it')

        // Create List - it will inherit permissions from the registry land
        // Since registry was created with join-level permissions, List will have them too
        const list = registry.List(null)!

        console.log('>>> [REGISTRY STEP 7] List initialized', {
          list_now_exists: !!registry.List(),
          list_ref: list.ref().description,
        })
      } else {
        const list = registry.List()!
        console.log('>>> [REGISTRY STEP 6] List already exists', {
          list_size: list.items_vary().length,
        })
      }

      return registry
    }
  }
}
