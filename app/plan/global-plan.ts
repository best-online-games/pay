namespace $ {
	/**
	 * Enhanced plan manager that can use either:
	 * 1. Local user land (current implementation)
	 * 2. Global shared land (new capability)
	 * 
	 * This demonstrates how to migrate from local-only plans to globally shared plans.
	 */

	export class $bog_pay_app_plan_manager extends $mol_object2 {
		/**
		 * Get the basic plan from GLOBAL land instead of user's home land
		 * 
		 * Benefits:
		 * - Single source of truth for pricing
		 * - Admin can update prices globally
		 * - All users see the same plans
		 */
		@$mol_mem
		static basic_from_global() {
			// Resolve reference relative to global land
			const ref = $bog_pay_app_global.resolve_ref($bog_pay_app_plan.basic_id())
			const plan = this.$.$hyoo_crus_glob.Node(ref, $bog_pay_app_plan)

			// Initialize default values if this is the first access
			if (!plan?.PriceCents()?.val()) {
				plan!.Title(null)!.text('Bog Ping Premium')
				plan!.Descr(null)!.text('Единый тариф: 99 ₽/мес, первые 14 дней бесплатно')
				plan!.PriceCents(null)!.val('9900')
				plan!.Currency(null)!.val('RUB')
				plan!.Period(null)!.val('month')
				plan!.TrialDays(null)!.val('14')
				plan!.Public(null)!.val('true')
			}

			return plan
		}

		/**
		 * Get all public plans from the global land
		 * This is useful if you want to store multiple plan options globally
		 */
		@$mol_mem
		static public_plans_from_global() {
			// Example: If you have a Plans entity in global land
			// const plans_registry = $bog_pay_app_global.hall_by($bog_pay_app_plans_list, {})
			// return plans_registry?.List()?.remote_list().filter(p => p.is_public()) ?? []
			
			// For now, just return the basic plan
			return [this.basic_from_global()].filter(Boolean)
		}

		/**
		 * Hybrid approach: Try global land first, fallback to local
		 * This allows gradual migration
		 */
		@$mol_mem
		static basic_hybrid() {
			try {
				const global_plan = this.basic_from_global()
				if (global_plan?.PriceCents()?.val()) {
					return global_plan
				}
			} catch (error) {
				this.$.$mol_log3_rise({
					place: this,
					message: 'Failed to load plan from global land, using local',
					error,
				})
			}

			// Fallback to local plan
			return $bog_pay_app_plan.basic()
		}
	}

	/**
	 * Registry of all available plans in the global land
	 * This is similar to how piterjs manages meetups in a global domain
	 */
	export class $bog_pay_app_plans_registry extends $hyoo_crus_entity.with({
		Plans: $hyoo_crus_list_ref_to(() => $bog_pay_app_plan),
	}) {
		/**
		 * Get or create the plans registry from global land
		 */
		@$mol_mem
		static instance() {
			return $bog_pay_app_global.hall_by($bog_pay_app_plans_registry, {})
		}

		/**
		 * Get all public plans
		 */
		@$mol_mem
		public_plans() {
			return (
				this.Plans()
					?.remote_list()
					?.filter((plan) => plan.is_public()) ?? []
			)
		}

		/**
		 * Admin: Create a new plan in the global land
		 */
		@$mol_action
		create_plan() {
			const plans_list = this.Plans(null)
			if (!plans_list) {
				throw new Error('Cannot create plan: Plans list not initialized')
			}

			const plan = plans_list.remote_make({})
			if (!plan) {
				throw new Error('Failed to create plan')
			}

			// Set default values
			plan.Title(null)!.text('New Plan')
			plan.PriceCents(null)!.val('0')
			plan.Currency(null)!.val('RUB')
			plan.Period(null)!.val('month')
			plan.TrialDays(null)!.val('0')
			plan.Public(null)!.val('false')

			return plan
		}
	}
}
