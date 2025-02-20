const { InstanceStatus } = require('@companion-module/base');

const Client = require('node-rest-client').Client;

module.exports = {
	initConnection: function () {
		let self = this;

		self.updateStatus(InstanceStatus.Connecting);
		
		self.getInformation();
		self.stopInterval();
		self.setupInterval();
	},
	
	setupInterval: function() {
		let self = this;
	
		//self.stopInterval();
	
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
				if (self.config.verbose) {
					self.log('debug', 'Getting Status Information')
				}
				self.sendPostRequest('/cgi-bin/webconf', 'page=70') // get status information
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

			self.log('info', 'Requesting: ' + url);
			
			let client = new Client();
		
			client.get(url, args, function (data, response) {
				//do something with response
				self.checkFeedbacks();
				self.checkVariables();
			})
			.on('error', function(error) {
				this.updateStatus(InstanceStatus.ConnectionFailure, error.message)
				self.log('error', 'Error Sending Command ' + error.toString());
			});
		}
	},
	
	sendPostRequest(path, formData) {
		if (this.config.host !== '' && this.config.host !== undefined) {
			const https = this.config.https;
			const url = "http" + (https ? "s" : "") + "://" + this.config.host + path;

			let args = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
					'Connection': 'keep-alive',
					'Accept': '*/*',
					'X-Requested-With': 'XMLHttpRequest',
					'User-Agent': 'Companion-Epson-Module'
				},
				data: formData // formdata as string, e.g. 'page=70' for 'Status Information'
			};
			if (this.config.verbose) {
				this.log('debug', `POSTing to: ${url}`);
				this.log('debug', `Data: ${formData}`);
			}
			let client = new Client();

			client.post(url, args, (data, response) => {
				if (response.statusCode === 200) {
					this.updateStatus(InstanceStatus.Ok)
					if (this.config.verbose) {
						this.log('debug', `Response received: ${data.toString()}`);
					}
					this.processResponse(data);
				} else {
					this.updateStatus(InstanceStatus.ConnectionFailure, error.message)
					this.log('error', `Unexpected response: ${response.statusCode}`);
				}
			}).on('error', (error) => {
				this.updateStatus(InstanceStatus.ConnectionFailure, error.message)
				this.log('error', `Error Sending POST Request: ${error.toString()}`);
				//this.updateStatus(InstanceStatus.Disconnected)
				//this.stopInterval();
			});
		}
	},

	processResponse(data) {
		try {
			// parse response
			const parsedData = JSON.parse(data.toString());

			// extract `system`-Status
			const systemStatus = parsedData.system;
			
			// log for debugging
			this.log('info', `System Status: ${systemStatus}`);
			
			// set variables
			this.setVariableValues({
				system_status: systemStatus,
			});
			
			// refresh feedbacks
			this.checkFeedbacks();
			
		} catch (error) {
			this.log('error', `Fehler beim Verarbeiten der Antwort: ${error.toString()}`);
		}
	}
}