const { InstanceStatus } = require('@companion-module/base');

const Client = require('node-rest-client').Client;

module.exports = {
	initConnection: function () {
		let self = this;

		self.updateStatus(InstanceStatus.Ok);
		
		//self.getInformation();
		//self.setupInterval();
	},
	
	setupInterval: function() {
		let self = this;
	
		self.stopInterval();
	
		if (self.config.polling == true) {
			self.INTERVAL = setInterval(self.getInformation.bind(self), self.config.interval);
			self.log('info', 'Starting Update Interval: Every ' + self.config.interval + 'ms');
		}
	},
	
	stopInterval: function() {
		let self = this;
	
		if (self.INTERVAL !== null) {
			self.log('info', 'Stopping Update Interval.');
			clearInterval(self.INTERVAL);
			self.INTERVAL = null;
		}
	},
	
	getInformation: async function () {
		let self = this;

		//send commands to request status about the projector

	},

	sendCommand: function(path) {
		let self = this;

		if (self.config.host !== '' && self.config.host !== undefined) {
			const https = self.config.https;
			const timestamp = new Date().getTime();
			const url = "http" + (https ? "s" : "") + "://" + self.config.host + '/cgi-bin/directsend?' + path + "&_=" + timestamp;
			
			let args = {
				headers: { //I really don't think these are necessary but the original author had them in there -- JA
					'Connection': 'keep-alive',
					'Accept': 'text/plain, */*; q=0.01',
					'X-Requested-With': 'XMLHttpRequest',
					'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
					'Sec-Fetch-Site': 'same-origin',
					'Sec-Fetch-Mode': 'cors',
					'Referer': url + '/cgi-bin/WebControl/Lens_Control',
					'Accept-Encoding': 'gzip, deflate, br',
					'Accept-Language': 'de,en;q=0.9'
				}
			};

			if (self.config.verbose) {
				self.log('debug', 'Requesting: ' + url);
			}
			
			let client = new Client();
		
			client.get(url, args, function (data, response) {
				//do something with response
				self.checkFeedbacks();
				self.checkVariables();
			})
			.on('error', function(error) {
				self.log('error', 'Error Sending Command ' + error.toString());
			});
		}
	}
}