const { combineRgb } = require('@companion-module/base');

module.exports = {
	initPresets: function () {
		let self = this;
		
		const presets = {}
		presets[`epson`] = {
			type: 'button',
			category: 'Control',
			name: 'Power On/Off with longpress',
			style: {
				text: 'Beamer\\n$(Beamer:system_status)',
				textExpression: false,
				size: 'auto',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			options: {
				relativeDelay: false,
				rotaryActions: false,
				stepAutoProgress: true
			},
			steps: [
				{
					down: [],
					up: [
						{
							// action on release
							actionId: 'power',
							delay: 200,
							options: {
								powerAction: 'ON',
							},
						},
					],
					400: {
						options: { runWhileHeld: true },
						actions: [
						{
							// action on long press release
							actionId: 'power',
							delay: 10,
							options: {
								powerAction: 'OFF',
							},
						},
						{
							// action on long press release
							actionId: 'power',
							delay: 30,
							options: {
								powerAction: 'OFF',
							},
						},
						],
					},
				},
			],
			feedbacks: [
				{
					feedbackId: 'internal',
					options: {
						ok_fg: 16777215,
						ok_bg: 51200,
						warning_fg: 0,
						warning_bg: 16776960,
						error_fg: 16777215,
						error_bg: 13107200,
						disabled_fg: 10066329,
						disabled_bg: 4210752
					},
					style: {},
					isInverted: false,
				},
				{
					feedbackId: 'system_status',
					options: {
						status: 'Standby'
					},
					style: {
						bgcolor: 16711680,
						color: 0
					},
					isInverted: false,
				},
				{
					feedbackId: 'system_status',
					options: {
						status: 'Warm-up'
					},
					style: {
						bgcolor: 16776960,
						color: 0
					},
					isInverted: false,
				},
				{
					feedbackId: 'system_status',
					options: {
						status: 'OK'
					},
					style: {
						bgcolor: 51200,
						color: 0
					},
					isInverted: false,
				}
			],
		}
		
		self.setPresetDefinitions(presets);
	}
}
