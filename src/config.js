const { Regex } = require('@companion-module/base')

module.exports = {
	getConfigFields() {
		return [
			{
				type: 'static-text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This module is for Epson Business projectors.',
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'Projector IP Address',
				width: 6,
				default: '192.168.0.1',
				regex: Regex.IP,
			},
			{
                type: 'checkbox',
                label: 'HTTPS Connection',
                id: 'https',
                default: false
            },
			/*{
				type: 'checkbox',
				id: 'polling',
				label: 'Enable Polling',
				width: 12,
			},
			{
				type: 'static-text',
				id: 'intervalInfo',
				width: 9,
				label: 'Update Interval',
				value: 'Please enter the amount of time in milliseconds to request new information from the device.',
				isVisible: (configValues) => configValues.polling == true,
			},
			{
				type: 'textinput',
				id: 'interval',
				label: 'Update Interval',
				width: 3,
				default: 1000,
				isVisible: (configValues) => configValues.polling == true,
			},*/
			{
				type: 'static-text',
				id: 'info2',
				label: 'Verbose Logging',
				width: 12,
				value: `Enabling this option will put more detail in the log, which can be useful for troubleshooting purposes.`
			},
			{
				type: 'checkbox',
				id: 'verbose',
				label: 'Enable Verbose Logging',
				default: false
			},
		]
	}
}