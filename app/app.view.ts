namespace $.$$ {
  new $mol_after_frame(() => {
    $hyoo_crus_yard.masters = ['https://crus.hd4.ru/'] // только прод-мастер
    $hyoo_crus_glob.yard().sync() // дёрнуть синхронизацию
  })

  export class $bog_pay_app extends $.$bog_pay_app {
    @$mol_mem
    domain_id() {
      return 'YpaaEBfX_BcHFsæKs' as $mol_int62_string
    }

    @$mol_mem
    domain_rights() {
      const land_id = this.domain_id()
      return new Uint8Array($mol_fetch.buffer(require(`/bog/pay/app/${land_id}!${land_id}.bin`)))
    }

    @$mol_mem
    Domain() {
      const yard = super.Yard()

      $mol_wire_sync(yard.world()).apply(this.domain_rights())

      return yard.world().Fund($bog_pay_app_domain).Item(this.domain_id())
    }

    body() {
      const originalLang = this.$.$mol_locale.lang()
      this.$.$mol_locale.lang('en')
      this.$.$mol_state_arg.value('page', this.Deck().Content().title().replaceAll(' ', '_'))
      this.$.$mol_locale.lang(originalLang)
      return [this.Content()]
    }
  }

  export const $bog_pay_person = $.$bog_pay_app_person
  export const $bog_pay_plan = $.$bog_pay_app_plan
  export const $bog_pay_subscription = $.$bog_pay_app_subscription
  export const $bog_pay_account = $.$bog_pay_app_account_domain
  export const $bog_pay_invoice = $.$bog_pay_app_invoice
}
