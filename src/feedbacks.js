const { combineRgb } = require('@companion-module/base');

module.exports = {
	initFeedbacks: function () {
		let self = this;
		let feedbacks = {
			'system_status': {
				type: 'boolean',
				name: 'System Status',
				description: 'Returns Standby or Lamp On',
				defaultStyle: {
					bgcolor: combineRgb(255,0,0),
					color: combineRgb(0,0,0),
				},
				options: [
					{
						type: 'dropdown',
						label: 'Status',
						id: 'status',
						choices: [
							{ id: 'Standby', label: 'Standby' },
							{ id: 'Warm-up', label: 'Warm-up' },
							{ id: 'OK', label: 'OK' }
						],
						default: 'Standby'
					}
				],
				callback: (feedback) => {
					return feedback.options.status === self.getVariableValue('system_status');
				}
			}
		};

		const foregroundColor = combineRgb(255, 255, 255) // White
		const backgroundColorRed = combineRgb(255, 0, 0) // Red

		self.setFeedbackDefinitions(feedbacks);
	}
}
