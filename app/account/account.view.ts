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
		images(next?: readonly string[]) {
			return (next as readonly string[] | undefined) ?? []
		}

		@$mol_action
		attach_add_files(files: File[]) {
			if (!files || files.length === 0) return
			const urls = this.images().slice()
			for (const file of files) {
				// Превью через ObjectURL
				const url = URL.createObjectURL(file)
				urls.push(url)
			}
			this.images(urls)
		}

		@$mol_action
		attach_remove_index(index: number) {
			const urls = this.images().slice()
			const id = urls[index]
			if (id !== undefined) {
				try {
					URL.revokeObjectURL(id)
				} catch {}
				urls.splice(index, 1)
				this.images(urls)
			}
		}

		Attach_images() {
			const $ = this.$
			return $.$mol_attach.make({
				attach_title: () => 'Загрузить изображение',
				items: () => this.images(),
				attach_new: (files: File[]) => {
					this.attach_add_files(files)
				},
				item_uri: (index: number) => this.images()[index] ?? '',
				item_drop: (index: number, event?: Event) => {
					this.attach_remove_index(index)
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
