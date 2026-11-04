const test = require('node:test')
const assert = require('node:assert/strict')
const http = require('node:http')
const Module = require('node:module')
const base = require('@companion-module/base')
let Instance
const originalLoad = Module._load
Module._load = function (id, ...args) {
	if (id === '@companion-module/base') return { ...base, InstanceBase: class {}, runEntrypoint: (value) => { Instance = value } }
	return originalLoad.call(this, id, ...args)
}
require('../index')
Module._load = originalLoad
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
async function until(predicate) {
	for (let i = 0; i < 100; i++) {
		if (predicate()) return
		await wait(10)
	}
	assert.fail('Timed out waiting for module response')
}

test('HTTP framing, actions, status feedback, polling, reload and destroy', async () => {
	const requests = []
	let system = 'Standby'
	const server = http.createServer((req, res) => {
		let body = ''
		req.on('data', (part) => { body += part })
		req.on('end', () => {
			requests.push({ method: req.method, url: req.url, headers: req.headers, body })
			res.setHeader('Content-Type', 'text/plain')
			const reply = req.method === 'POST' ? JSON.stringify({ system }) : 'OK'
			res.write(reply.slice(0, 3))
			setImmediate(() => res.end(reply.slice(3)))
		})
	})
	await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
	const instance = new Instance()
	const values = {}
	const logs = []
	let feedbackChecks = 0
	Object.assign(instance, {
		log: (...args) => logs.push(args),
		updateStatus: (status) => { instance.status = status },
		setActionDefinitions: (actions) => { instance.actions = actions },
		setFeedbackDefinitions: (feedbacks) => { instance.feedbacks = feedbacks },
		setVariableDefinitions: () => {}, setPresetDefinitions: () => {},
		setVariableValues: (update) => Object.assign(values, update),
		getVariableValue: (id) => values[id],
		checkFeedbacks: () => { feedbackChecks++ },
	})
	const config = { host: `127.0.0.1:${server.address().port}`, https: false, polling: true, interval: 50 }
	try {
		await instance.init(config)
		await until(() => values.system_status === 'Standby')
		assert.equal(instance.status, base.InstanceStatus.Ok)
		assert.equal(instance.feedbacks.system_status.callback({ options: { status: 'Standby' } }), true)
		assert.equal(instance.feedbacks.system_status.callback({ options: { status: 'OK' } }), false)
		const post = requests.find((r) => r.method === 'POST')
		assert.equal(post.url, '/cgi-bin/webconf')
		assert.equal(post.body, 'page=70')
		assert.match(post.headers['content-type'], /application\/x-www-form-urlencoded/)
		assert.equal(post.headers.authorization, undefined)
		const cases = [
			['power', { powerAction: 'ON' }, 'IMPWR=ON'], ['power', { powerAction: 'OFF' }, 'KEY=6C'],
			['source', { sourceId: 'A0' }, 'SOURCE=A0'], ['audioVideoMute', { avMuteAction: 'OFF' }, 'MUTE=OFF'],
			['freeze', { freezeAction: 'ON' }, 'FREEZE=ON'], ['brightness', { brightness: 75 }, '_OSD_IMLUMLEVEL=75'],
			['fadeTime', { fadeIn: 2, fadeOut: 3 }, 'FADEIN=40&FADEOUT=60'],
			['testPattern', { patternId: '200D' }, 'TESTPATTERN=01%200D'], ['hideTestPattern', {}, 'TESTPATTERN=00'],
			['loadLensPosition', { loadSlot: '0A' }, 'POPLP=0A'], ['saveLensPosition', { loadSlot: '01' }, 'PUSHLP=01'],
			['focusAction', { focusAction: 'DEC' }, 'FOCUS=DEC'], ['zoomAction', { zoomAction: 'INC' }, 'ZOOM=INC'],
			['shiftAction', { shiftAction: '2' }, 'HLENS=DEC'],
		]
		for (const [id, options, expected] of cases) {
			const count = requests.filter((r) => r.method === 'GET').length
			await instance.actions[id].callback({ options })
			await until(() => requests.filter((r) => r.method === 'GET').length > count)
			const req = requests.filter((r) => r.method === 'GET').at(-1)
			assert.match(req.url, new RegExp('^/cgi-bin/directsend\\?' + expected.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '&_=\\d+$'))
		}
		system = 'OK'
		await until(() => values.system_status === 'OK')
		assert.equal(instance.feedbacks.system_status.callback({ options: { status: 'OK' } }), true)
		assert.ok(feedbackChecks > 1)
		instance.processResponse(Buffer.from('invalid json'))
		assert.equal(values.system_status, 'OK')
		assert.ok(logs.some(([level, msg]) => level === 'error' && msg.includes('Failed preocessing')))
		const oldInterval = instance.INTERVAL
		await instance.configUpdated({ ...config, polling: false })
		assert.equal(instance.INTERVAL, null)
		assert.ok(oldInterval._destroyed)
		await wait(100)
		const stopped = requests.length
		await wait(120)
		assert.equal(requests.length, stopped)
		await instance.configUpdated(config)
		assert.ok(instance.INTERVAL)
		await instance.destroy()
		assert.equal(instance.INTERVAL, null)
	} finally {
		await instance.destroy()
		server.closeAllConnections?.()
		await new Promise((resolve) => server.close(resolve))
	}
})
