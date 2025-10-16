namespace $ {
	export class $bog_pay_server_build extends $mol_build {
		@$mol_mem
		override server() {
			return $bog_pay_server.make({
				build: $mol_const(this),
			})
		}
	}

	// Запуск сервера
	setTimeout(() => {
		const build = $bog_pay_server_build.make({
			root: () => $mol_file.absolute('.'),
		})

		build.server().start()
	})
}
