# Demo E-commerce microservice api

A testing build e-commerce microservice based api which accomplishes the following :
1.  Get list of available products
2.  Get products in a users cart
3.  Put products in a users cart

### Pre-requisites
> System packages : nodejs npm
> npm packages : express request body-parser

## Installation :

1.  Clone into the working repository
    > git clone https://github.com/wonder-coconut/software_arch_assignment.git ass2/commerce_api
    
    or if you're using SSH
    
    > git clone git@github.com:wonder-coconut/software_arch_assignment.git ass2/commerce_api

2.  Install the necessary npm packages and dependencies
    > npm install

## Running the build :

1.  To start the server run :
    > npm start

2.  On the client side you can choose out of three possible test cases:
    -   Product Microservice :
        1.  Retrieve product list:
        > http://localhost:42069/rest/v1/products

    -   User Cart Microservice :
        1.  Add/update cart items :
        > PUT /rest/v1/users/\<uuid\>/cart  
        Host: http://localhost:42069  
        Content-type: application/json  
        {  
            "productId":"\<product id number\>",  
            "quantity":"\<number of items\>"  
        }  
        
        For curl users:
        > curl -X PUT http://localhost:42069/rest/v1/users/\<uuid\>/cart -H "Content-type: application/json" -d '{"productId":"\<product id number\>","quantity":"\<number of items\>"}'

        2. Get cart items :
        > http://localhost:42069/rest/v1/users/\<uuid\>/cart