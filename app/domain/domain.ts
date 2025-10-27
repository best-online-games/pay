namespace $ {
  export class $bog_pay_app_domain extends $hyoo_crowd_struct {
    @$mol_mem
    editable() {
      return this.land.allowed_mod()
    }

    // People registry для списка всех зарегистрированных пользователей
    @$mol_mem
    people_registry() {
      // Получаем registry через статический метод hall()
      return $bog_pay_app_people.hall()
    }
  }
}
