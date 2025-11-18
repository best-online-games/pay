namespace $.$$ {
	export class $bog_pay_app_account extends $.$bog_pay_app_account {
		openvpn_base_url() {
			return 'http://87.120.36.150:8080'
		}

		openvpn_api() {
			const base = this.openvpn_base_url()
			const headers = { 'Content-Type': 'text/plain; charset=utf-8' }
			return {
				ensure_certificate: (client: string) =>
					this.$.$mol_fetch.text(`${base}/api/v1/openvpn/certificates`, {
						method: 'POST',
						headers,
						body: client,
					}),
				revoke_certificate: (client: string) =>
					this.$.$mol_fetch.response(`${base}/api/v1/openvpn/certificates/revoke`, {
						method: 'POST',
						headers,
						body: client,
					}),
			}
		}

		@$mol_mem
		ovpn_file_name() {
			const peer = this.$.$hyoo_crus_glob.home().land().auth().peer()
			return `${peer}.ovpn`
		}

		@$mol_action
		ovpn_file_blob() {
			const peer = this.$.$hyoo_crus_glob.home().land().auth().peer()
			const profile = this.openvpn_api().ensure_certificate(peer)
			return new Blob([profile], { type: 'application/x-openvpn-profile' })
		}
	}
}
