namespace $ {
	// 1) Список админов по короткому user_id (peer)
	// Заполняй сюда свои user_id (например: 'u2ldl9lC', 'abc12345', ...)
	export const $bog_pay_app_admin_peers = [
		'SjixkGkN',
		'mcBM6jhX',
		// 'CR9M4ik7',
		// 'SjixkGkN'
	] as const

	export class $bog_pay_app_admin extends $mol_object2 {
		// Является ли текущий пользователь админом (по user_id/peer)
		@$mol_mem
		static is_me() {
			const my_peer = this.$.$hyoo_crus_glob.home().land().auth().peer()
			return ($bog_pay_app_admin_peers as readonly string[]).includes(my_peer)
		}
	}
}
