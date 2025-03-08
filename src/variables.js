module.exports = {
	initVariables: function () {
		let self = this;

		let variables = [
			{
				name: 'System Status',
				variableId: 'system_status',
			},
		];

		self.setVariableDefinitions(variables);
	},

	checkVariables: function () {
		let self = this;

		try {
			
		}
		catch(error) {
			self.log('error', 'Error setting variables: ' + error);
		}
	}
}
