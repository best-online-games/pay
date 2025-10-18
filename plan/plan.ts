namespace $ {
	export class $bog_pay_plan extends $hyoo_crus_entity.with({
		Title: $hyoo_crus_text,
		Descr: $hyoo_crus_text,
		PriceCents: $hyoo_crus_atom_str, // 9900 = 99 RUB
		Currency: $hyoo_crus_atom_str, // RUB
		Period: $hyoo_crus_atom_str, // 'month'
		TrialDays: $hyoo_crus_atom_str, // '14'
		Public: $hyoo_crus_atom_str, // 'true' | 'false'
	}) {
		@$mol_mem
		price_cents() {
			return Number(this.PriceCents()?.val() ?? '0')
		}

		@$mol_mem
		is_public() {
			return this.Public()?.val() === 'true'
		}

		static basic_id() {
			return '___bogPayPl'
		}

		@$mol_mem
		static basic() {
			const base = this.$.$hyoo_crus_glob.home().land().ref()
			const rel = this.$.$hyoo_crus_ref(this.basic_id())
			const ref = this.$.$hyoo_crus_ref_resolve(base, rel)
			const plan = this.$.$hyoo_crus_glob.Node(ref, $bog_pay_plan)

			// Инициализация единственного публичного тарифа (seed)
			if (!plan.PriceCents()?.val()) {
				plan.Title(null)!.text('Bog Ping Premium')
				plan.Descr(null)!.text('Единый тариф: 99 ₽/мес, первые 14 дней бесплатно')
				plan.PriceCents(null)!.val('9900')
				plan.Currency(null)!.val('RUB')
				plan.Period(null)!.val('month')
				plan.TrialDays(null)!.val('14')
				plan.Public(null)!.val('true')
			}

			return plan
		}
	}
}
