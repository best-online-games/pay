namespace $.$$ {
	/**
	 * UI component to display global land status and data
	 * Useful for debugging and monitoring global land integration
	 */
	export class $bog_pay_app_global_status extends $.$bog_pay_app_global_status {
		@$mol_mem
		status_title() {
			try {
				const land = $bog_pay_app_global.land()
				return land ? '✅ Global Land Connected' : '❌ Not Connected'
			} catch (error) {
				return '❌ Error: ' + String(error)
			}
		}

		@$mol_mem
		land_ref() {
			try {
				const land = $bog_pay_app_global.land()
				return 'Land ID: ' + (land?.ref().description ?? 'N/A')
			} catch {
				return 'Land ID: N/A'
			}
		}

		@$mol_mem
		connected_text() {
			try {
				const land = $bog_pay_app_global.land()
				const online = land ? 'Online' : 'Offline'
				return 'Status: ' + online
			} catch {
				return 'Status: Error'
			}
		}

		@$mol_mem
		app_name() {
			try {
				const config = $bog_pay_app_global_config.instance()
				const name = config?.AppName()?.text()
				return 'App Name: ' + (name || '(not set)')
			} catch {
				return 'App Name: (error)'
			}
		}

		@$mol_mem
		maintenance_text() {
			try {
				const config = $bog_pay_app_global_config.instance()
				const isMaintenance = config?.is_maintenance()
				return 'Maintenance Mode: ' + (isMaintenance ? '🔧 Yes' : '✅ No')
			} catch {
				return 'Maintenance Mode: (error)'
			}
		}

		@$mol_mem
		announcement() {
			try {
				const config = $bog_pay_app_global_config.instance()
				const text = config?.AnnouncementText()?.text()
				return 'Announcement: ' + (text || '(none)')
			} catch {
				return 'Announcement: (error)'
			}
		}

		@$mol_mem
		plan_title() {
			try {
				const plan = $bog_pay_app_plan_manager.basic_hybrid()
				return 'Title: ' + (plan?.Title()?.text() ?? 'N/A')
			} catch (error) {
				return 'Title: Error - ' + String(error)
			}
		}

		@$mol_mem
		plan_price() {
			try {
				const plan = $bog_pay_app_plan_manager.basic_hybrid()
				const cents = plan?.price_cents() ?? 0
				const rubles = (cents / 100).toFixed(2)
				return 'Price: ' + rubles + ' ₽/month'
			} catch (error) {
				return 'Price: Error'
			}
		}

		@$mol_mem
		plan_descr() {
			try {
				const plan = $bog_pay_app_plan_manager.basic_hybrid()
				return 'Description: ' + (plan?.Descr()?.text() ?? 'N/A')
			} catch {
				return 'Description: Error'
			}
		}
	}
}
