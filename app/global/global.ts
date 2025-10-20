namespace $ {
	/**
	 * Global land helper for bog/pay application
	 *
	 * This demonstrates how to access and use a global CRUS land
	 * similar to how piterjs uses global lands for shared data.
	 *
	 * Example usage:
	 * ```ts
	 * const globalLand = $bog_pay_app_global.land()
	 * const sharedData = globalLand.home().hall_by(YourEntity, {})
	 * ```
	 */

	// Global land ID from https://crus.hyoo.ru/#!section=glob/ref=zGBdtaer_FopVR1YS
	export const $bog_pay_app_global_land_id = 'zGBdtaer_FopVR1YS'

	export class $bog_pay_app_global extends $mol_object2 {
		/**
		 * Get the global shared land
		 * This land can be used for app-wide shared data (plans, announcements, etc.)
		 */
		@$mol_mem
		static land() {
			const glob = this.$.$hyoo_crus_glob
			const land_ref = this.$.$hyoo_crus_ref($bog_pay_app_global_land_id)
			const land = glob.Land(land_ref)

			this.$.$mol_log3_rise({
				place: this,
				message: 'Global land accessed',
				land_ref: land.ref().description,
			})

			return land
		}

		/**
		 * Example: Access a specific entity type from the global land
		 *
		 * Usage:
		 * ```ts
		 * const plans = $bog_pay_app_global.hall_by($bog_pay_app_plan, {})
		 * ```
		 */
		@$mol_mem_key
		static hall_by<T extends $hyoo_crus_entity>(
			Entity: typeof $hyoo_crus_entity & (new (...args: any[]) => T),
			hint: { [key: string]: any },
		): T | null {
			return this.land().home().hall_by(Entity, hint)
		}

		/**
		 * Example: Get a specific node from the global land by reference
		 *
		 * Usage:
		 * ```ts
		 * const ref = this.$.$hyoo_crus_ref('some_relative_id')
		 * const entity = $bog_pay_app_global.node(ref, $bog_pay_app_plan)
		 * ```
		 */
		static node<T extends $hyoo_crus_entity>(
			ref: $hyoo_crus_ref,
			Entity: typeof $hyoo_crus_entity & (new (...args: any[]) => T),
		): T | null {
			const glob = this.$.$hyoo_crus_glob
			return glob.Node(ref, Entity)
		}

		/**
		 * Example: Create a reference relative to the global land
		 * Useful for referencing data stored in the global land
		 */
		static resolve_ref(relative_id: string): $hyoo_crus_ref {
			const base = this.land().ref()
			const rel = this.$.$hyoo_crus_ref(relative_id)
			return this.$.$hyoo_crus_ref_resolve(base, rel)
		}
	}

	/**
	 * Example entity that could be stored in the global land
	 * (This is just a demonstration - modify based on your needs)
	 */
	export class $bog_pay_app_global_config extends $hyoo_crus_entity.with({
		AppName: $hyoo_crus_text,
		Version: $hyoo_crus_atom_str,
		MaintenanceMode: $hyoo_crus_atom_str, // 'true' | 'false'
		AnnouncementText: $hyoo_crus_text,
	}) {
		@$mol_mem
		is_maintenance() {
			return this.MaintenanceMode()?.val() === 'true'
		}

		/**
		 * Get or create the global config from the global land
		 */
		@$mol_mem
		static instance(): $bog_pay_app_global_config | null {
			return $bog_pay_app_global.hall_by($bog_pay_app_global_config, {})
		}
	}
}
