var instance_skel = require('../../instance_skel');
var debug;
var log;

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
	return [
		{
			type: 'text',
			id: 'info',
			width: 12,
            label: 'Information',
            value: "TODO!"
		},
		{
			type: 'textinput',
			id: 'prefix',
			label: 'Projector URL',
			width: 12,
            regex: self.REGEX_IP          
		},{
            type: 'textinput',
            id: 'username',
            default: 'EPSONREMOTE',
            label: 'WebControl User Name',
            width: 6,
        },{
            type: 'textinput',
            id: 'password',
            default: 'guest',
            label: 'WebControl Password',
            width: 6,
        }
	]
}

// When module gets deleted
instance.prototype.destroy = function () {
	var self = this;
	debug("destroy");
}

instance.prototype.actions = function (system) {
    var self = this;
    
	self.setActions({
		'loadLensPosition': {
			label: 'Load Lens Position',
			options: [
				{
                    type: 'dropdown',
                    label: 'slot',
                    id: 'loadSlot',
                    default: '0',
                    choices: [
                      { id: '0', label: '1' },
                      { id: '1', label: '2' },
                      { id: '2', label: '3' },
                      { id: '3', label: '4' },
                      { id: '4', label: '5' },
                      { id: '5', label: '6' },
                      { id: '6', label: '7' },
                      { id: '7', label: '8' },
                      { id: '8', label: '9' },
                      { id: '9', label: '10' }
                    ]
                  }
			]
        },
        'saveLensPosition': {
			label: 'Save Lens Position',
			options: [
				{
                    type: 'dropdown',
                    label: 'slot',
                    id: 'saveSlot',
                    default: '0',
                    choices: [
                      { id: '0', label: '1' },
                      { id: '1', label: '2' },
                      { id: '2', label: '3' },
                      { id: '3', label: '4' },
                      { id: '4', label: '5' },
                      { id: '5', label: '6' },
                      { id: '6', label: '7' },
                      { id: '7', label: '8' },
                      { id: '8', label: '9' },
                      { id: '9', label: '10' }
                    ]
                  }
			]
        },
        'testPattern': {
			label: 'Show Test Pattern',
			options: [
				{
                    type: 'dropdown',
                    label: 'test pattern',
                    id: 'patternId',
                    default: '0',
                    choices: [
                      { id: '0', label: 'Standard' },
                      { id: '1', label: 'Cross-hatching' },
                      { id: '2', label: 'Cross-hatching R' },
                      { id: '3', label: 'Cross-hatching G' },
                      { id: '4', label: 'Cross-hatching B' },
                      { id: '5', label: 'Color Bars V' },
                      { id: '6', label: 'Color Bars H' },
                      { id: '7', label: 'Grayscale' },
                      { id: '8', label: 'Gray Bars V' },
                      { id: '9', label: 'Gray Bars H' },
                      { id: '10', label: 'Checkerboard 1' },
                      { id: '11', label: 'Checkerboard 2' },
                      { id: '12', label: 'White' },
                      { id: '13', label: 'Black' },
                      { id: '14', label: '16:10 Aspect Frame' },
                      { id: '15', label: '16:9 Aspect Frame' },
                      { id: '16', label: '4:3 Aspect Frame' }
                    ]
                  }
			]
        },
        'hideTestPattern': {
			label: 'Hide Test Pattern'
        },
        'focusAction': {
			label: 'Perform a Lens Focus Action',
			options: [
				{
                    type: 'dropdown',
                    label: 'focus',
                    id: 'focusAction',
                    default: '0',
                    choices: [
                      { id: '0', label: 'Near - Minus' },
                      { id: '1', label: 'Far - Plus' },
                    ]
                  }
			]
        },
        'zoomAction': {
			label: 'Perform a Lens Zoom Action',
			options: [
				{
                    type: 'dropdown',
                    label: 'zoom',
                    id: 'zoomAction',
                    default: '1',
                    choices: [
                      { id: '1', label: 'Zoom in' },
                      { id: '0', label: 'Zoom out' },
                    ]
                  }
			]
        },
        'shiftAction': {
			label: 'Perform a Lens Shift Action',
			options: [
				{
                    type: 'dropdown',
                    label: 'shift',
                    id: 'shiftAction',
                    default: '0',
                    choices: [
                      { id: '0', label: 'Up' },
                      { id: '1', label: 'Down' },
                      { id: '2', label: 'Left' },
                      { id: '3', label: 'Right' },
                    ]
                  }
			]
        },
        'focusValue': {
			label: 'Focus the Lens to a specific Value',
			options: [
				{
                    type: 'number',
                    label: 'focus',
                    id: 'focusValue',
                    min: 1,
                    max: 100,
                    default: 50,
                    required: true
                  }
			]
        },
        'zoomValue': {
			label: 'Zoom the Lens to a specific Value',
			options: [
				{
                    type: 'number',
                    label: 'zoom',
                    id: 'zoomValue',
                    min: 1,
                    max: 100,
                    default: 50,
                    required: true
                  }
			]
        },
        'shiftValue': {
			label: 'Shift the Lens to a specific Value',
			options: [
				{
                    type: 'number',
                    label: 'shift vertically',
                    id: 'shiftValueV',
                    min: 1,
                    max: 100,
                    required: false
                  },
                  {
                    type: 'number',
                    label: 'shift horizontally',
                    id: 'shiftValueH',
                    min: 1,
                    max: 100,
                    required: false
                  }
			]
        },
        'shutterOption': {
			label: 'Shutter Option',
			options: [
				{
                    type: 'dropdown',
                    label: 'open/close',
                    id: 'shutterOption',
                    default: '0',
                    choices: [
                      { id: '0', label: 'shutter open' },
                      { id: '1', label: 'shutter close' }
                    ]
                  }                  
			]
		},
	});
}

instance.prototype.action = function (action) {
	var self = this;
	var cmd;

	if (self.config.prefix !== undefined && action.options.url.substring(0, 4) != 'http') {
		if (self.config.prefix.length > 0) {
			cmd = self.config.prefix + action.options.url;
		}
		else {
			cmd = action.options.url;
		}
	}
	else {
		cmd = action.options.url;
	}

	if (action.action == 'post') {
		var body, header;
		try {
			body = JSON.parse(action.options.body);
			header = JSON.parse(action.options.header);
		} catch (e) {
			self.log('error', 'HTTP POST Request aborted: Malformed JSON Body or JSON Header (' + e.message + ')');
			self.status(self.STATUS_ERROR, e.message);
			return
		}
		self.system.emit('rest', cmd, body, function (err, result) {
			if (err !== null) {
				self.log('error', 'HTTP POST Request failed (' + result.error.code + ')');
				self.status(self.STATUS_ERROR, result.error.code);
			}
			else {
				self.status(self.STATUS_OK);
			}
		}, header);
	}
	else if (action.action == 'get') {
		var header;
		try {
			header = JSON.parse(action.options.header);
		} catch (e) {
			self.log('error', 'HTTP GET Request aborted: Malformed JSON Header (' + e.message + ')');
			self.status(self.STATUS_ERROR, e.message);
			return
		}
		self.system.emit('rest_get', cmd, function (err, result) {
			if (err !== null) {
				self.log('error', 'HTTP GET Request failed (' + result.error.code + ')');
				self.status(self.STATUS_ERROR, result.error.code);
			}
			else {
				self.status(self.STATUS_OK);
			}
		}, header);
	}
	else if (action.action == 'put') {
		var body, header;
		try {
			body = JSON.parse(action.options.body);
			header = JSON.parse(action.options.header);
		} catch (e) {
			self.log('error', 'HTTP PUT Request aborted: Malformed JSON Body or JSON Header (' + e.message + ')');
			self.status(self.STATUS_ERROR, e.message);
			return
		}
		self.system.emit('rest_put', cmd, body, function (err, result) {
			if (err !== null) {
				self.log('error', 'HTTP PUT Request failed (' + result.error.code + ')');
				self.status(self.STATUS_ERROR, result.error.code);
			}
			else {
				self.status(self.STATUS_OK);
			}
		});
	}
}

instance_skel.extendedBy(instance);
exports = module.exports = instance;
