namespace $ {
	/** Trial duration (ms). Dev: 5 seconds */
	export const $bog_pay_trial_ms: number = 5_000
	/** Renewal extension duration (ms). Dev: 5 seconds */
	export const $bog_pay_renewal_ms: number = 5_000

	// Subscription statuses:
	// 'trial' | 'active' | 'canceled' | 'past_due'
	// RenewalMode: 'auto' | 'manual'
	export class $bog_pay_app_subscription extends $hyoo_crus_entity.with({
		Person: $hyoo_crus_atom_ref_to(() => $bog_pay_app_person),
		Plan: $hyoo_crus_atom_ref_to(() => $bog_pay_app_plan),
		Status: $hyoo_crus_atom_str,
		PeriodStart: $hyoo_crus_atom_str,
		PeriodEnd: $hyoo_crus_atom_str,
		CancelAt: $hyoo_crus_atom_str,
		RenewalMode: $hyoo_crus_atom_str,
		AccessState: $hyoo_crus_atom_str, // 'provisioned' | 'revoked'
	}) {
		// Helpers

		@$mol_mem
		now_ms() {
			return Date.now()
		}

		@$mol_mem
		period_start_ms() {
			const s = this.PeriodStart()?.val()
			return s ? Date.parse(s) : 0
		}

		@$mol_mem
		period_end_ms() {
			const s = this.PeriodEnd()?.val()
			return s ? Date.parse(s) : 0
		}

		@$mol_mem
		is_trial() {
			return this.Status()?.val() === 'trial' && this.period_end_ms() > this.now_ms()
		}

		@$mol_mem
		is_active() {
			const status = this.Status()?.val()
			if (this.period_end_ms() <= this.now_ms()) return false
			return status === 'active' || status === 'trial'
		}

		@$mol_mem
		is_expired() {
			return !!this.period_end_ms() && this.period_end_ms() <= this.now_ms()
		}

		@$mol_mem
		remaining_ms() {
			const end = this.period_end_ms()
			return end ? Math.max(0, end - this.now_ms()) : 0
		}

		// State transitions

		@$mol_action
		start_trial() {
			// Dev-config: short trial duration
			const now = new Date()
			const end = new Date(now.valueOf() + $bog_pay_trial_ms)

			this.Status(null)!.val('trial')
			this.PeriodStart(null)!.val(now.toISOString())
			this.PeriodEnd(null)!.val(end.toISOString())
			this.RenewalMode(null)!.val('auto')

			// Optionally mark access desired
			this.AccessState(null)!.val('revoked')
		}

		@$mol_action
		activate_month() {
			// Dev-config: extend by configured renewal duration from max(now, current end)
			const now = new Date()
			const currentEnd = this.period_end_ms()
			const baseTs = currentEnd && currentEnd > now.valueOf() ? currentEnd : now.valueOf()
			const end = new Date(baseTs + $bog_pay_renewal_ms)

			// If we're transitioning from past_due/canceled to active
			this.Status(null)!.val('active')
			if (!this.PeriodStart()?.val()) {
				this.PeriodStart(null)!.val(now.toISOString())
			}
			this.PeriodEnd(null)!.val(end.toISOString())

			if (!this.RenewalMode()?.val()) {
				this.RenewalMode(null)!.val('auto')
			}
		}

		@$mol_action
		cancel_auto() {
			// Stop auto-renew; access remains until PeriodEnd
			this.RenewalMode(null)!.val('manual')
			this.CancelAt(null)!.val(new Date().toISOString())
			// Keep Status as-is; will become past_due on expiry
		}

		@$mol_action
		renew_auto() {
			this.RenewalMode(null)!.val('auto')
			// If still within period and was 'past_due' (unexpected), make active
			if (this.period_end_ms() > Date.now() && this.Status()?.val() !== 'active') {
				this.Status(null)!.val('active')
			}
		}

		@$mol_action
		expire_if_needed() {
			// If period is over — handle by renewal mode
			if (!this.is_expired()) return
			const renewal = this.RenewalMode()?.val()
			if (renewal === 'auto') {
				// Auto-renew: extend period and keep status active
				this.activate_month()
			} else {
				// Manual renewal: expire gracefully
				this.Status(null)!.val('canceled')
			}
		}

		// Certificate operations (OpenVPN API)

		@$mol_action
		provision_access(api: ReturnType<$.$bog_pay_app_account['openvpn_api']>) {
			const person = this.Person()?.remote()
			const client = person?.ref().description
			if (!client) return

			api.ensure_certificate(client)
			this.AccessState(null)!.val('provisioned')
		}

		@$mol_action
		revoke_access(api: ReturnType<$.$bog_pay_app_account['openvpn_api']>) {
			const person = this.Person()?.remote()
			const client = person?.ref().description
			if (!client) return

			api.revoke_certificate(client)
			this.AccessState(null)!.val('revoked')
		}

		@$mol_mem
		access_desired() {
			// Access is desired only when subscription is currently active or in trial
			return this.is_active()
		}

		@$mol_action
		enforce_access(api: ReturnType<$.$bog_pay_app_account['openvpn_api']>) {
			// Reconciliation (tolerant): daily check is enough. Do not revoke on expiry; revoke only after cancellation.
			this.expire_if_needed()
			const desired = this.access_desired()
			const state = this.AccessState()?.val()
			const status = this.Status()?.val()

			if (desired && state !== 'provisioned') {
				this.provision_access(api)
			}
			// Revoke only when subscription is explicitly canceled
			if (status === 'canceled' && state === 'provisioned') {
				this.revoke_access(api)
			}
		}
	}
}
