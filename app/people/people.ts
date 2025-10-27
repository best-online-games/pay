namespace $ {
  // Global shared registry of users for admin overview/cron-like actions
  // This is a SHARED land that everyone can write to (to register themselves)

  // Use the main domain land for people registry (same as app domain)
  export const $bog_pay_app_people_registry_land = 'OonXNN12_gSræV7iT'

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
      const glob = this.$.$hyoo_crus_glob
      const registry_ref = this.$.$hyoo_crus_ref($bog_pay_app_people_registry_land)
      const shared_land = glob.Land(registry_ref)

      console.log('>>> Accessing people registry in global land:', {
        land_ref: shared_land.ref().description,
      })

      // IMPORTANT: Pass public permissions when creating registry
      // This ensures all nested nodes (like List) have public access
      const registry = shared_land.home().hall_by($bog_pay_app_people, {
        '': this.$.$hyoo_crus_rank_join('just'),
      })

      if (!registry) {
        throw new Error('Cannot access people registry in global land')
      }

      return registry
    }
  }
}
