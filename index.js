var instance_skel = require('../../instance_skel');
var actions       = require('./actions');
var config      = require('./config')
var debug;

function instance(system, id, config) {
	var self = this;

	// super-constructor
	instance_skel.apply(this, arguments);

	self.actions(); // export actions

	return self;
}

instance.prototype.updateConfig = function (config) {
	var self = this;
	self.config = config;
	self.actions();
}

instance.prototype.init = function () {
	var self = this;
	self.status(self.STATE_OK);
	debug = self.debug;
	log = self.log;
}

// Return config fields for web config
instance.prototype.config_fields = function () {
	var self = this;
	return config.getConfigFields(self)
}

// When module gets deleted
instance.prototype.destroy = function () {
	debug("destroy");
}

instance.prototype.actions = function (system) {
	var self     = this;
	const series = self.config.projectorSeries;
	self.setActions(actions.getActions(series));
}

instance.prototype.action = function (action) {
	var self        = this
	var path        = ""
	var cmd         = ""
	const https     = self.config.https
	const url       = "http" + (https ? "s" : "") + "://" + self.config.url
	const timestamp = new Date().getTime()

	var headers = {
		'Connection': 'keep-alive',
		'Accept': 'text/plain, */*; q=0.01',
		'X-Requested-With': 'XMLHttpRequest',
		'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
		'Sec-Fetch-Site': 'same-origin',
		'Sec-Fetch-Mode': 'cors',
		'Referer': url + '/cgi-bin/WebControl/Lens_Control',
		'Accept-Encoding': 'gzip, deflate, br',
		'Accept-Language': 'de,en;q=0.9'
	};

	path = actions.getAction(action)
	cmd = url + "/cgi-bin/directsend?" + path + "&_=" + timestamp;

	system.emit('log', 'Epson PJ', 'debug', 'Action: ' + action.action);
	system.emit('log', 'Epson PJ', 'debug', 'Requesting: ' + cmd);

	self.system.emit('rest_get', cmd, function (err, result) {
		if (err !== null) {
			self.log('error', 'HTTP GET Request failed (' + result.error.code + ')');
			self.status(self.STATUS_ERROR, result.error.code);
		}
		else {
			self.status(self.STATUS_OK);
		}
	}, headers);
}

instance_skel.extendedBy(instance);
exports = module.exports = instance;