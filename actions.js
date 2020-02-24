module.exports = {

	/**
	* Get the available actions.
	*
	* @returns {Object[]} the available actions
	* @access public
    */

  getActions(series) {
    var actions;

    switch (series) {
      case 'L1xxx Series (2017)':
        actions = {
          'loadLensPosition': {
            label: 'Load Lens Position',
            options: [
              {
                type: 'dropdown',
                label: 'slot',
                id: 'loadSlot',
                default: '01',
                choices: [
                  { id: '01', label: '1' },
                  { id: '02', label: '2' },
                  { id: '03', label: '3' },
                  { id: '04', label: '4' },
                  { id: '05', label: '5' },
                  { id: '06', label: '6' },
                  { id: '07', label: '7' },
                  { id: '08', label: '8' },
                  { id: '09', label: '9' },
                  { id: '0A', label: '10' }
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
                default: '01',
                choices: [
                  { id: '01', label: '1' },
                  { id: '02', label: '2' },
                  { id: '03', label: '3' },
                  { id: '04', label: '4' },
                  { id: '05', label: '5' },
                  { id: '06', label: '6' },
                  { id: '07', label: '7' },
                  { id: '08', label: '8' },
                  { id: '09', label: '9' },
                  { id: '0A', label: '10' }
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
                default: '2002',
                choices: [
                  { id: '2002', label: 'Standard' },
                  { id: '2003', label: 'Cross-hatching' },
                  { id: '200D', label: 'Cross-hatching R' },
                  { id: '200E', label: 'Cross-hatching G' },
                  { id: '200F', label: 'Cross-hatching B' },
                  { id: '2004', label: 'Color Bars V' },
                  { id: '2010', label: 'Color Bars H' },
                  { id: '2005', label: 'Grayscale' },
                  { id: '2012', label: 'Gray Bars V' },
                  { id: '2013', label: 'Gray Bars H' },
                  { id: '200B', label: 'Checkerboard 1' },
                  { id: '200C', label: 'Checkerboard 2' },
                  { id: '2006', label: 'White' },
                  { id: '2011', label: 'Black' },
                  { id: '2014', label: 'Aspect Frame' },
                ]
              }
            ]
          },
          'source': {
            label: 'Source Select',
            options: [
              {
                type: 'dropdown',
                label: 'source',
                id: 'sourceId',
                default: '2001',
                choices: [
                  { id: '30', label: 'HDMI' },
                  { id: '80', label: 'HDBaseT' },
                  { id: 'A0', label: 'DVI-D' },
                  { id: '60', label: 'SDI' },
                  { id: '10', label: 'VGA' },
                  { id: 'B0', label: 'BNC' },
                  { id: '53', label: 'Wireless' }
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
                default: 'DEC',
                choices: [
                  { id: 'DEC', label: 'Near - Minus' },
                  { id: 'INC', label: 'Far - Plus' },
                ]
              }
            ]
          },
          'zoomAction': {
            label: 'Perform a Lens Zoom Action (not working yet)',
            options: [
              {
                type: 'dropdown',
                label: 'zoom',
                id: 'zoomAction',
                default: 'INC',
                choices: [
                  { id: 'INC', label: 'Zoom in' },
                  { id: 'DEC', label: 'Zoom out' },
                ]
              }
            ]
          },
          'shiftAction': {
            label: 'Perform a Lens Shift Action (not working yet)',
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
            label: 'Focus the Lens to a specific Value (not working yet)',
            options: [
              {
                type: 'number',
                label: 'focus',
                id: 'focusValue (1-1023)',
                min: 1,
                max: 1023,
                default: 1,
                required: true
              }
            ]
          },
          'zoomValue': {
            label: 'Zoom the Lens to a specific Value (not working yet)',
            options: [
              {
                type: 'number',
                label: 'zoom',
                id: 'zoomValue (0-255)',
                min: 0,
                max: 255,
                default: 50,
                required: true
              }
            ]
          },
          'shiftValue': {
            label: 'Shift the Lens to a specific Value (not working yet)',
            options: [
              {
                type: 'number',
                label: 'shift vertically (1-65535)',
                id: 'shiftValueV',
                min: 1,
                max: 65535,
                required: false
              },
              {
                type: 'number',
                label: 'shift horizontally (1-65535)',
                id: 'shiftValueH',
                min: 1,
                max: 65535,
                required: false
              }
            ]
          },
          'audioVideoMute': {
            label: 'Audio/Video Mute (Shutter)',
            options: [
              {
                type: 'dropdown',
                label: 'av mute',
                id: 'avMuteAction',
                default: 'ON',
                choices: [
                  { id: 'ON', label: 'Execute A/V Mute' },
                  { id: 'OFF', label: 'Cancel A/V Mute' },
                ]
              }
            ]
          },
          'freeze': {
            label: 'Freeze',
            options: [
              {
                type: 'dropdown',
                label: 'freeze',
                id: 'freezeAction',
                default: 'ON',
                choices: [
                  { id: 'ON', label: 'Execute Freeze' },
                  { id: 'OFF', label: 'Cancel Freeze' },
                ]
              }
            ]
          },
          'brightness': {
            label: 'Set the brightness level',
            options: [{
              type: 'number',
              label: 'brightness (30-100)',
              id: 'brightness',
              min: 30,
              max: 100,
              required: true
            }]
          },
          'power': {
            label: 'Power',
            options: [
              {
                type: 'dropdown',
                label: 'state',
                id: 'powerAction',
                default: 'ON',
                choices: [
                  { id: 'ON', label: 'Power On' },
                  { id: 'OFF', label: 'Power Off' },
                ]
              }
            ]
          },
          'fadeTime': {
            label: 'Fade Time for A/V Mute',
            options: [{
              type: 'number',
              label: 'fade in time (0-10s)',
              id: 'fadeIn',
              min: 0,
              max: 10,
              required: false
            },{
              type: 'number',
              label: 'fade out time (0-10s)',
              id: 'fadeOut',
              min: 0,
              max: 10,
              required: false
            }]
          }
        };
    }

    return actions
  },

  getAction(action) {
    var id = action.action
    var paramForAction = action.options?Object.keys(action.options):null

    switch (id) {
      case 'loadLensPosition':
        return "POPLP=" + action.options[paramForAction[0]]

      case 'saveLensPosition':
        return "PUSHLP=" + action.options[paramForAction[0]]

      case 'focusAction':
        return "FOCUS=" + action.options[paramForAction[0]]
      case 'zoomAction':
        return "ZOOM=" + action.options[paramForAction[0]]
      case 'shiftAction':
        const shiftAction = action.options[paramForAction[0]]
        switch (shiftAction) {
          case '0':
            return "LENS=INC"
          case '1':
            return "LENS=DEC"
          case '2':
            return "HLENS=DEC"
          case '3':
            return "HLENS=INC"
        }
        break;

      case 'focusValue':
        return "FOCUS=" + action.options[paramForAction[0]]
      case 'zoomValue':
        return "ZOOM=" + action.options[paramForAction[0]]
      case 'shiftValue':
        const shiftValueV = action.options[paramForAction[0]]
        const shiftValueH = action.options[paramForAction[1]]
        if (shiftValueV) {
          return "LENS=" + shiftValueV + (shiftValueH ? ("&HLENS=" + shiftValueH) : "")
        } else if (shiftValueH) {
          return "HLENS=" + shiftValueH
        } else {
          // When both Values are empty than do nothing
          // Any more-foolprof way?
          return;
        }

      case 'audioVideoMute':
        return "MUTE=" + action.options[paramForAction[0]]
        // path = "KEY=3E"
      case 'freeze':
        return "FREEZE=" + action.options[paramForAction[0]]

      case 'brightness':
        return "_OSD_IMLUMLEVEL=" + action.options[paramForAction[0]]

      case 'power':
        if (action.options[paramForAction[0]] == "ON"){
          return "IMPWR=ON"
        } else {
          return "KEY=6C"
        }

      case 'fadeTime':
        const fadeInTime = action.options[paramForAction[0]]*20
        const fadeOutTime = action.options[paramForAction[1]]*20

        if(fadeInTime){
          return "FADEIN="+fadeInTime + (fadeOutTime? ("&FADEOUT=" + fadeOutTime): "")
        } else if (fadeOutTime){
          return "FADEOUT="+fadeOutTime
        }

      case 'source':
        return "SOURCE=" + action.options[paramForAction[0]]
        
      case 'testPattern':
        return "TESTPATTERN=01%" + action.options[paramForAction[0]]
      case 'hideTestPattern':
        return "TESTPATTERN=00"
    }
  }
}
