const prerender = require('prerender')
const express = require('express')
const path = require('path')

// Prerender сервер
const prerenderServer = prerender({
	port: 4000,
	chromeFlags: ['--no-sandbox', '--headless', '--disable-gpu', '--disable-dev-shm-usage'],
	chromeLocation: '/usr/bin/google-chrome',
})

prerenderServer.start()

// Express сервер
const PORT = 8000
const app = express()

app.use(require('prerender-node').set('prerenderServiceUrl', 'http://localhost:4000/'))

app.use(express.static(path.join(__dirname, 'pay')))

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`)
})
