namespace $.$$ {
	/**
	 * Страница с навбаром, которая переключает контент по параметру URL
	 * Показывает навбар с ссылками сверху и активную страницу в body
	 */
	export class $bog_pay_app_navbar extends $.$bog_pay_app_navbar {
		@$mol_mem
		spread() {
			return this.$.$mol_state_arg.value(this.param(), undefined) ?? ''
		}

		@$mol_mem
		spread_ids(): readonly string[] {
			return Object.keys(this.spreads())
		}

		@$mol_mem
		tools() {
			return this.spread_ids().map(id => this.Menu_link(id))
		}

		@$mol_mem_key
		menu_link_arg(id: string) {
			return { page: id }
		}

		@$mol_mem
		Page_current() {
			const id = this.spread()
			const spreads = this.spreads() as Record<string, $mol_view>
			return spreads[id] ?? null
		}

		@$mol_mem_key
		Menu_link_title(id: string) {
			return id
		}
	}
}
