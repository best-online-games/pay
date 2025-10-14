namespace $.$$ {
	export class $bog_pay_app_page_libraries extends $.$bog_pay_app_page_libraries {
		@$mol_mem_key
		spread_title(id: string) {
			const titles: Record<string, string> = {
				overview: 'Overview',
				installation: 'Installation',
				usage: 'Usage',
			}
			return titles[id] || id
		}
	}
}
