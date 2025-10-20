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
	}
}
