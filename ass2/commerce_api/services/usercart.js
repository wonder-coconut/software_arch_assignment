var carts = require('../db/usercarts.json');

var usercart = {
    getitems : function(req,res,user_uuid) {
        for (let i = 0; i < carts.usercarts.length; i++) {

            if(carts.usercarts[i].uuid == user_uuid)
            {
                var cart = carts.usercarts[i].cart;
                res.json(cart);
                break;
            }
        }
    }
}

module.exports = usercart;