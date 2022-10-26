'use strict'

const controller = require('./controller');

module.exports = function(app) {
    app.route('/rest/v1/products').get(controller.products);
    app.route('/rest/v1/users/:uuid/cart').put(controller.putcartitem);
    //app.route('/rest/v1/users/:uuid/cart').get(controller.getcartitems);
}