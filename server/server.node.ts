namespace $ {
	export class $bog_pay_server extends $mol_build_server {
		handlePrerenderRequest(req: typeof $node.express.request, res: typeof $node.express.response) {
			// Обработка prerender запросов для поисковых ботов
			if (req.query._escaped_fragment_) {
				const fragment = decodeURIComponent(String(req.query._escaped_fragment_))
				const url = req.protocol + '://' + req.get('host') + req.path + '#!' + fragment
				const html = this.prerender(url)

				res.send(html).end()
				return true
			}

			// Передаем управление стандартному обработчику сборщика
			return this.generate(req.url)
		}

		@$mol_mem_key
		prerender(uri: string) {
			$mol_wire_solid()
			return this.$.$mol_browser.html(uri)
		}

		override port() {
			return 9081
		}
	}
}
