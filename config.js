module.exports = {

    getProjectorSeries() {
        return [
            // {
            //     "id": "14xx Series (2019)",
            //     "label": "EB/CB/BrightLink 1485Fi/1485Fi+/1480Fi/1480Fi+ [RFHD]"
            // }, {
            //     "id": "L1xxx Series (2019)",
            //     "label": "L1070U/L1075U/L1060U/L1065U/L1050U [WUXGA] L1070W/L1060W [WXGA] 1070 [XGA]"
            // }, 
            {
                "id": "L1xxx Series (2017)",
                "label": "EB/Pro L1750U/L1755U/L1500UH/1505UH [WUXGA] EB/Pro L1710S/1715S/L1510S/1515S [SXGA+]"
            }
        ]
    },

    getConfigFields(self) {
        return [
            {
                type: 'text',
                id: 'info',
                width: 12,
                label: 'Information',
                value: 'This module is for Epson Business projectors'
            }, {
                type: 'dropdown',
                label: 'Projector Series',
                id: 'projectorSeries',
                default: 'L1xxx Series (2017)',
                width: 12,
                choices: this.getProjectorSeries()
            }, {
                type: 'textinput',
                id: 'url',
                label: 'Projector URL',
                width: 10,
                regex: self.REGEX_IP
            }, {
                type: 'checkbox',
                label: 'HTTPS Connection',
                id: 'https',
                default: false
            }
        ]
    }
}