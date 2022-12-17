# SMS Microservice api

A basic sms api supporting inbound and outbound api.

There are two ways you can execute this application:
## 1. Cloud

Use the following cloud url for your PUT request :

Example :
>   PUT /inbound/sms  
    Host: http://route.srikar.tech/  
    Content-type: application/json  
    {  
        "from" : "\<from\>",  
        "to" : "\<to\>",  
        "text" : "\<text\>"  
    }

## 2. Local Install
### Pre-requisites
> System packages : nodejs npm
> npm packages : express request body-parser node-cache

## Installation :

1. Clone into the working git repository:
    http:
    > git clone https://github.com/wonder-coconut/software_arch_assignment.git
    ssh:
    > git clone git@github.com:wonder-coconut/software_arch_assignment.git

2. Change into the working directory 
    > cd ass4/sms_service
    
3. Install the necessary npm packages and dependencies
    > npm install

## Running the build :

1. To start the server:
    > npm start

2. Api requests:
    - SMS Inbound
    > PUT /inbound/sms  
    Host: http://localhost:42069/  
    Content-type: application/json  
    {  
        "from" : "\<from\>",  
        "to" : "\<to\>",  
        "text" : "\<text\>"  
    }
    - SMS Outbound
    > PUT /outbound/sms  
    Host: http://localhost:42069/  
    Content-type: application/json  
    {  
        "from" : "\<from\>",  
        "to" : "\<to\>",  
        "text" : "\<text\>"  
    }
