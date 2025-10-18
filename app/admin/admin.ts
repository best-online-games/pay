namespace $ {
	/**
	 * Admins registry and helpers.
	 *
	 * Храним список публичных ключей админов в CRUS (редактируется вручную владельцем репозитория).
	 * - проверка принадлежности к админам,
	 * - сбор пресета прав (rule) для ensure(...)
	 */
	const $bog_pay_app_admins_seed = [
		// '__-7aV2X2UKgsMCMNNZLfJ1gBzqkgUfco0R8xyTeYz03twp8fDZx4gKzJ5sYh4dgoIMjAVxZYNOafOVKFsc4Zo',
	] as const

	export class $bog_pay_app_admins extends $hyoo_crus_entity.with({
		// Список публичных ключей админов
		PublicPeers: $hyoo_crus_list_str,
	}) {
		// Хранилище реестра админов (только чтение для клиентов; наполняется вручную в репозитории)
		@$mol_mem
		static hall() {
			return this.$.$hyoo_crus_glob.home().hall_by($bog_pay_app_admins, { '': $hyoo_crus_rank_post('just') })!
		}

		// Текущий список админских публичных ключей
		@$mol_mem
		static peers() {
			const list = this.hall().PublicPeers(null)!
			const prev = list.items()
			if (prev.length === 0 && $bog_pay_app_admins_seed.length) {
				list.items([...$bog_pay_app_admins_seed])
			}
			return list.items()
		}

		// Проверка вхождения произвольного публичного ключа в список админов
		@$mol_mem_key
		static has(pub: string) {
			return this.peers().includes(pub)
		}
	}

	/**
	 * Утилиты для работы с админами.
	 * Сохраняем старое имя класса-обёртки, чтобы не менять вызовы в коде.
	 */
	export class $bog_pay_app_admin extends $mol_object2 {
		// Список админов (публичные ключи)
		@$mol_mem
		static peers() {
			return $bog_pay_app_admins.peers()
		}

		// Является ли текущий пользователь админом
		@$mol_mem
		static is_me() {
			const my_pub = this.$.$hyoo_crus_glob.home().land().auth().public().toString()
			console.log('ADMIN', $bog_pay_app_admins.has(my_pub))
			return $bog_pay_app_admins.has(my_pub)
		}

		// Пресет прав для всех админов (по умолчанию rule)
		@$mol_mem
		static preset(rank: typeof $hyoo_crus_rank.Value = $hyoo_crus_rank_rule) {
			const preset: $hyoo_crus_rank_preset = {}
			for (const pub of $bog_pay_app_admins.peers()) {
				if (pub === this.$.$hyoo_crus_glob.home().land().auth().public().toString()) {
					preset[pub] = rank
				}
				continue
			}
			return preset
		}

		// Пресет с полными правами для админов
		@$mol_mem
		static preset_rule() {
			return this.preset($hyoo_crus_rank_rule)
		}
	}
}
