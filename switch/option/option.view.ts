namespace $.$$ {
	export class $bog_pay_switch_option extends $.$bog_pay_switch_option {
		@$mol_mem
		override attr() {
			const baseAttr = super.attr()
			const someAttr = this.some_attr()

			if (!someAttr) return baseAttr

			return {
				...baseAttr,
				some_attr: someAttr,
			}
		}
	}
}
