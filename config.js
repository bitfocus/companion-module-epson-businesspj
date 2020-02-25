module.exports = {

    getConfigFields(self) {
        return [
            {
                type: 'text',
                id: 'info',
                width: 12,
                label: 'Information',
                value: 'This module is for Epson Business projectors'
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