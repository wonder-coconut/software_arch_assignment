'use strict'

const controller = require('./controller');

module.exports = function(app) {
    app.route('/inbound/sms').put(controller.sms_inbound);
    app.route('/outbound/sms').put(controller.sms_outbound);
}