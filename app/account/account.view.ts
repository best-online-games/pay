namespace $.$$ {
	export class $bog_pay_app_account extends $.$bog_pay_app_account {
		@$mol_mem
		account() {
			return new this.$.$bog_pay_account()
		}

		@$mol_action
		enforce() {
			this.account().enforce_access()
		}

		@$mol_mem
		enforce_loop() {
			new this.$.$mol_after_timeout(2000, () => {
				this.enforce()
				this.enforce_loop()
			})
			return null as any
		}

		@$mol_mem
		status_text() {
			const st = this.account().subscription_status()
			if (st === 'none') return 'Подписка: отсутствует'
			return `Подписка: ${st}`
		}

		@$mol_mem
		period_text() {
			const p = this.account().subscription_period()
			if (!p.start || !p.end) return 'Период: —'
			const start = new Date(p.start).toLocaleString()
			const end = new Date(p.end).toLocaleString()
			return `Период: ${start} — ${end}`
		}

		@$mol_mem
		renewal_text() {
			const r = this.account().subscription_renewal()
			return `Автопродление: ${r ?? '—'}`
		}

		@$mol_mem
		vpn_text() {
			return this.account().is_vpn_allowed() ? 'VPN доступен' : 'VPN недоступен'
		}

		Subscribe_btn() {
			const $ = this.$
			return $.$mol_button_major.make({
				sub: () => [$.$mol_text.make({ text: () => 'Оформить (14 дней бесплатно)' })],
				click: () => {
					this.account().subscribe()
				},
				enabled: () => this.account().subscription_status() === 'none',
			})
		}

		Renew_btn() {
			const $ = this.$
			return $.$mol_button_minor.make({
				sub: () => [$.$mol_text.make({ text: () => '+1 месяц (mock)' })],
				click: () => {
					this.account().renew()
				},
				enabled: () => true,
			})
		}

		Cancel_btn() {
			const $ = this.$
			return $.$mol_button_minor.make({
				sub: () => [
					$.$mol_text.make({
						text: () =>
							this.account().subscription_renewal() === 'auto'
								? 'Выключить автопродление'
								: 'Включить автопродление',
					}),
				],
				click: () => {
					const mode = this.account().subscription_renewal()
					if (mode === 'auto') this.account().cancel_auto()
					else this.account().sub_active()?.renew_auto()
				},
				enabled: () => this.account().subscription_status() !== 'none',
			})
		}

		Info_status() {
			const $ = this.$
			return $.$mol_text.make({ text: () => this.status_text() })
		}

		Info_period() {
			const $ = this.$
			return $.$mol_text.make({ text: () => this.period_text() })
		}

		Info_renewal() {
			const $ = this.$
			return $.$mol_text.make({ text: () => this.renewal_text() })
		}

		Info_vpn() {
			const $ = this.$
			return $.$mol_text.make({ text: () => this.vpn_text() })
		}

		Info_peer() {
			const $ = this.$
			return $.$mol_text.make({
				text: () => {
					const peer = this.$.$hyoo_crus_glob.home().land().auth().peer()
					return `User ID: ${peer}`
				},
			})
		}

		Info_balance() {
			const $ = this.$
			return $.$mol_text.make({
				text: () => {
					const cents = this.account().balance_cents()
					const rub = (cents / 100).toFixed(2)
					return `Баланс: ${rub} ₽`
				},
			})
		}

		@$mol_mem
		images() {
			const person = this.account().profile()
			const bins = person?.Photos()?.remote_list() ?? []
			return bins.map(bin => {
				const data = bin.val()
				if (!data) return ''
				const blob = new Blob([data], { type: 'image/*' })
				return URL.createObjectURL(blob)
			})
		}

		@$mol_action
		attach_add_files(files: File[]) {
			if (!files || files.length === 0) return
			const person = this.account().profile()!
			for (const file of files) {
				const buf = new Uint8Array(this.$.$mol_wire_sync(file).arrayBuffer())
				const bin = person.Photos(null)!.remote_make({})!
				bin.val(buf)
			}
		}

		@$mol_action
		attach_remove_index(index: number) {
			const person = this.account().profile()
			const list = person?.Photos()?.remote_list() ?? []
			const bin = list[index]
			if (!bin) return
			const url = this.images()[index]
			if (url) {
				try {
					URL.revokeObjectURL(url)
				} catch {}
			}
			person!.Photos(null)!.has(bin.ref(), false)
		}

		Attach_images() {
			const $ = this.$
			const self = this
			return $.$mol_button_open.make({
				accept: () => 'image/*',
				multiple: () => false,
				sub: function () {
					const bins = self.account().profile()?.Photos()?.remote_list() ?? []
					const data = bins[0]?.val() ?? null
					const content = data
						? $.$mol_image.make({
								title: () => '',
								uri: () => {
									if (!data) return ''
									const blob = new Blob([data], { type: 'image/*' })
									return URL.createObjectURL(blob)
								},
							})
						: $.$mol_icon_upload.make({})
					// Ensure native file input is present so click opens picker
					// and show either current image or upload icon
					// @ts-ignore - this is $mol_button_open instance
					return [content, this.Native()]
				},
				hint: () => 'Изменить изображение',
				files: (next?: readonly File[]) => {
					if (next && next.length) {
						const person = self.account().profile()!
						const list = person.Photos(null)!
						const existed = person.Photos()?.remote_list() ?? []
						if (existed[0]) list.has(existed[0].ref(), false)
						const buf = new Uint8Array(self.$.$mol_wire_sync(next[0]).arrayBuffer())
						const bin = list.remote_make({})!
						bin.val(buf)
					}
					// reset file input after handling
					return []
				},
			})
		}

		Download_ovpn_btn() {
			const $ = this.$
			return $.$mol_button_download.make({
				sub: () => [$.$mol_text.make({ text: () => 'Скачать .ovpn (mock)' })],
				file_name: () => this.account().ovpn_file_name(),
				blob: () => this.account().ovpn_file_blob(),
			})
		}

		Topup_btn() {
			const $ = this.$
			return $.$mol_button_minor.make({
				sub: () => [$.$mol_text.make({ text: () => 'Пополнить +199 ₽ (mock)' })],
				click: () => {
					this.account().topup_mock_rub(199)
				},
			})
		}

		Actions() {
			const $ = this.$
			return $.$mol_row.make({
				sub: () => [
					this.Subscribe_btn(),
					this.Renew_btn(),
					this.Cancel_btn(),
					this.Topup_btn(),
					this.Download_ovpn_btn(),
				],
			})
		}

		body() {
			this.enforce_loop()
			return [
				this.Info_peer(),
				this.Info_status(),
				this.Info_period(),
				this.Info_renewal(),
				this.Info_vpn(),
				this.Info_balance(),
				this.Attach_images(),
				this.Actions(),
			]
		}
	}
}
