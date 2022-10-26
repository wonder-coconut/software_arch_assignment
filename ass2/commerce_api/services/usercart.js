var carts = require('../db/usercarts.json');
var request = require('request');
const FileSystem = require('fs');
const url = "http://localhost:42069/rest/v1";

var usercart = {
    getitems : function(req,res,user_uuid) {
        var flag = 0;
        for (let i = 0; i < carts.usercarts.length; i++) {

            if(carts.usercarts[i].uuid == user_uuid)
            {
                flag = 1;
                var cart = carts.usercarts[i].cart;
                res.json(cart);
                break;
            }
        }
        if(flag == 0)
            res.send("uuid " + user_uuid + " not found");
    },
    putitems : function(req,res,user_uuid,put_cart_item) {

        var products;
        request(url + "/products", function(error, response, body) {
            products = JSON.parse(body);
            var userindex,productindex,cartitemindex;
            userindex = carts.usercarts.length;
            productindex = products.productlist.length;//todo clean up

            for (let i = 0; i < carts.usercarts.length; i++) {
                if(carts.usercarts[i].uuid == user_uuid)
                {
                    userindex = i;
                    break;
                }
            }

            for (let i = 0; i < products.productlist.length; i++) {
                if(products.productlist[i].productId == put_cart_item.productId)
                {
                    productindex = i;
                    break;
                }      
            }

            if(productindex == products.productlist.length)//product not found
                res.send("product id not found");
            
            else if(userindex == carts.usercarts.length)//user not found
                res.send("user not found");

            else if(put_cart_item.quantity > products.productlist[productindex].availableQuantity)//too much quantiy
                res.send("not enough product stock");
            else
            {

                cartitemindex = carts.usercarts[userindex].cart.length;//todo clean up
                for (let i = 0; i < carts.usercarts[userindex].cart.length; i++) {
                    if(carts.usercarts[userindex].cart[i].productId == put_cart_item.productId)
                    {
                        cartitemindex = i;
                        break;
                    }
                }

                if(cartitemindex == carts.usercarts[userindex].cart.length) //cart item not found
                {
                    var cartItem = {
                        productId : put_cart_item.productId,
                        productName : products.productlist[productindex].productName,
                        price : products.productlist[productindex].price,
                        quantity : put_cart_item.quantity
                    }
                    carts.usercarts[userindex].cart.push(cartItem);
                    products.productlist[productindex].availableQuantity -= put_cart_item.quantity

                    console.log(products.productlist[productindex].availableQuantity);

                    FileSystem.writeFile('/home/wonder_coconut/personal/college/sem 7/soft arch/assignments/ass2/commerce_api/db/usercarts.json', JSON.stringify(carts), (err) => {
                        if(err) throw err;
                    });//figure out relative fs path

                    FileSystem.writeFile('/home/wonder_coconut/personal/college/sem 7/soft arch/assignments/ass2/commerce_api/db/products.json', JSON.stringify(products), (err) => {
                        if(err) throw err;
                    });

                    res.json(cartItem);
                }
                else //cart item exists in cart
                {
                    var cartItem = carts.usercarts[userindex].cart[cartitemindex];
                    cartItem.quantity += put_cart_item.quantity;
                    carts.usercarts[userindex].cart[cartitemindex] = cartItem;
                    products.productlist[productindex].availableQuantity -= put_cart_item.quantity;
                    console.log(products.productlist[productindex].availableQuantity);

                    FileSystem.writeFile('/home/wonder_coconut/personal/college/sem 7/soft arch/assignments/ass2/commerce_api/db/usercarts.json', JSON.stringify(carts), (err) => {
                        if(err) throw err;
                    });//figure out relative fs path

                    FileSystem.writeFile('/home/wonder_coconut/personal/college/sem 7/soft arch/assignments/ass2/commerce_api/db/products.json', JSON.stringify(products), (err) => {
                        if(err) throw err;
                    });//figure out relative fs path
                    
                    res.json(cartItem);
                }
            }
        });
    }
}

module.exports = usercart;