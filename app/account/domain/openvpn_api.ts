namespace $ {
	export class $bog_pay_app_openvpn_api extends $mol_object2 {
		@$mol_mem
		base_url() {
			const override = $mol_state_arg.value('pay_api')
			if (override) return this.normalize_base(override)

			const loc = $mol_dom_context?.location
			if (!loc) return 'http://87.120.36.150:8080'


			return this.normalize_base('http://87.120.36.150:8080')
		}

		private normalize_base(input: string) {
			return input.endsWith('/') ? input.slice(0, -1) : input
		}

		private ensure_url(path: string) {
			return `${this.base_url()}${path}`
		}

		private headers() {
			return { 'Content-Type': 'text/plain; charset=utf-8' }
		}

		@$mol_action
		ensure_certificate(client: string) {
			const url = this.ensure_url('/api/v1/openvpn/certificates')
			return $mol_fetch.text(url, {
				method: 'POST',
				headers: this.headers(),
				body: client,
			})
		}

		@$mol_action
		revoke_certificate(client: string) {
			const url = this.ensure_url('/api/v1/openvpn/certificates/revoke')
			$mol_fetch.response(url, {
				method: 'POST',
				headers: this.headers(),
				body: client,
			})
		}
	}
}
