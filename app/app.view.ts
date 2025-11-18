namespace $.$$ {
  export class $bog_pay_app extends $.$bog_pay_app {
    @$mol_mem
    domain_id() {
      return 'YpaaEBfX_BcHFsæKs' as $mol_int62_string
    }


    body() {
      const originalLang = this.$.$mol_locale.lang()
      this.$.$mol_locale.lang('en')
      this.$.$mol_state_arg.value('page', this.Deck().Content().title().replaceAll(' ', '_'))
      this.$.$mol_locale.lang(originalLang)
      return [this.Content()]
    }
  }
}
