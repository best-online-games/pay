namespace $.$$ {
	export class $bog_pay_switch extends $.$bog_pay_switch {
		@$mol_mem_key
		override Option(id: string): $bog_pay_switch_option {
			const option = super.Option(id) as $bog_pay_switch_option
			const someAttr = this.option_some_attr(id)
			if (someAttr) {
				option.some_attr = () => someAttr
			}
			return option
		}
	}
}
