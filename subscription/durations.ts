namespace $ {

	/**
	 * Dev-config: durations for subscription logic.
	 * During development both trial and renewal are 5 seconds.
	 * Adjust these values for production (e.g., 14 days trial, 1 month renewal).
	 */

	/** Trial duration (ms). Dev: 5 seconds */
	export const $bog_pay_trial_ms: number = 5_000

	/** Renewal extension duration (ms). Dev: 5 seconds */
	export const $bog_pay_renewal_ms: number = 5_000

}
