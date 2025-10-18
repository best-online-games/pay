namespace $ {
	export class $bog_pay_server extends $mol_build_server {
		override port() {
			return 9081
		}
		html() {}

		// Mock endpoint: /vpn/check?peer=...
		// Returns JSON: { peer, allowed, status, periodEnd }
		// For development it always returns allowed: true with short TTL.
		override expressGenerator() {
			const base = super.expressGenerator()
			return async (req: any, res: any, next: (err?: unknown) => any) => {
				try {
					const url = new URL(req.url || '/', 'http://localhost')
					if (url.pathname === '/vpn/check') {
						const peer = url.searchParams.get('peer') || ''
						const now = new Date()
						res.set('content-type', 'application/json')
						res.set('cache-control', 'no-store')
						res.status(200)
							.send(
								JSON.stringify({
									peer,
									allowed: true,
									status: 'mock',
									periodEnd: new Date(now.valueOf() + 60_000).toISOString(), // 1 minute TTL for dev
								}),
							)
							.end()
						return
					}
				} catch {
					/* ignore parse errors */
				}
				return base(req, res, next)
			}
		}
	}
}
