namespace $.$$ {
  new $mol_after_frame(() => {
    $hyoo_crus_yard.masters = ['https://crus.hd4.ru/'] // только прод-мастер
    $hyoo_crus_glob.yard().sync() // дёрнуть синхронизацию
  })

  export class $bog_pay_app_admin extends $.$bog_pay_app_admin {}
	export class $bog_pay_app extends $.$bog_pay_app {
		body() {
			const originalLang = this.$.$mol_locale.lang()
			this.$.$mol_locale.lang('en')
			this.$.$mol_state_arg.value('page', this.Deck().Content().title().replaceAll(' ', '_'))
			this.$.$mol_locale.lang(originalLang)
			return [this.Content()]
		}

		Switch() {
			const sw = this.Deck().Switch()
			const base_value = sw.value
			sw.value = (next?: string) => {
				if (next === undefined) return '0'
				base_value.call(sw, next)
				return next
			}
			return sw
		}

	}
}
