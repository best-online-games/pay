namespace $ {

	/**
	 * CRUS Invoice entity for top-ups (balance refill) and charges (subscription billing).
	 *
	 * Notes:
	 * - AmountCents/Currency store money in minor units (e.g. 9900 + RUB).
	 * - Kind: 'topup' | 'charge'
	 * - Status: 'pending' | 'paid' | 'failed' | 'canceled'
	 * - Subscription is optional for 'charge' invoices; for 'topup' can be empty.
	 * - Provider/ProviderInvoiceId/PaymentUrl are for external billing integration (mock for now).
	 */
	export class $bog_pay_invoice extends $hyoo_crus_entity.with({
		Person: $hyoo_crus_atom_ref_to(() => $bog_pay_person),
		Subscription: $hyoo_crus_atom_ref_to(() => $bog_pay_subscription),

		Kind: $hyoo_crus_atom_str,         // 'topup' | 'charge'
		AmountCents: $hyoo_crus_atom_str,  // e.g. '9900'
		Currency: $hyoo_crus_atom_str,     // e.g. 'RUB'

		Status: $hyoo_crus_atom_str,       // 'pending' | 'paid' | 'failed' | 'canceled'
		CreatedAt: $hyoo_crus_atom_str,    // ISO string
		PaidAt: $hyoo_crus_atom_str,       // ISO string

		Provider: $hyoo_crus_atom_str,         // e.g. 'mock'
		ProviderInvoiceId: $hyoo_crus_atom_str,// external invoice id
		PaymentUrl: $hyoo_crus_text,           // checkout URL (if any)
		Meta: $hyoo_crus_text,                 // optional free-form
	}) {

		// Helpers

		@$mol_mem
		amount_cents() {
			return Number(this.AmountCents()?.val() ?? '0')
		}

		@$mol_mem
		is_topup() {
			return this.Kind()?.val() === 'topup'
		}

		@$mol_mem
		is_charge() {
			return this.Kind()?.val() === 'charge'
		}

		@$mol_mem
		is_paid() {
			return this.Status()?.val() === 'paid'
		}

		@$mol_mem
		is_pending() {
			return this.Status()?.val() === 'pending'
		}

		@$mol_mem
		is_failed() {
			return this.Status()?.val() === 'failed'
		}

		// State transitions (mock-friendly)

		@$mol_action
		mark_pending() {
			if (!this.CreatedAt()?.val()) this.CreatedAt(null)!.val(new Date().toISOString())
			this.Status(null)!.val('pending')
		}

		@$mol_action
		mark_paid() {
			this.Status(null)!.val('paid')
			this.PaidAt(null)!.val(new Date().toISOString())
		}

		@$mol_action
		mark_failed() {
			this.Status(null)!.val('failed')
		}

		@$mol_action
		cancel() {
			this.Status(null)!.val('canceled')
		}

	}

}
