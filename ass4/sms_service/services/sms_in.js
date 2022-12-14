var sms_in = {
    parseSMS : function(req, res, input_sms, myCache) {
        try
        {
            var responseJSON = {
                message : "",
                error : "",
            };

            var valid = false;

            if(!input_sms.from)
                responseJSON.error = "from is missing";
            else if(!input_sms.to)
                responseJSON.error = "to is missing";
            else if(!input_sms.text)
                responseJSON.error = "text is missing";
            else
            {
                if(input_sms.from.length < 6 || input_sms.from.length > 16)
                    responseJSON.error = "from is invalid";
                else if(input_sms.to.length < 6 || input_sms.to.length > 16)
                    responseJSON.error = "to is invalid";
                else if(input_sms.text.length < 1 || input_sms.text.length > 120)
                    responseJSON.error = " is invalid";
                else
                {
                    responseJSON.message = "inbound sms is ok";
                    valid = true;
                }
            }

            if(valid)
            {
                if(input_sms.text.includes("STOP"))
                {
                    var cachedObj = {
                        from : input_sms.from,
                        to : input_sms.to
                    }
                    var id = 0;
                    while(true)
                    {
                        id++;
                        if(myCache.has(id.toString()))
                            continue;
                        myCache.set(id.toString(), cachedObj, 14400);
                        break;
                    }

                    console.log("testing cache at id " + id);
                    console.log(myCache.get(id.toString()));
                }
            }

            res.json(responseJSON);
        }
        catch (err)
        {
            responseJSON.error = "unknown failure";
        }
    }
}

module.exports = sms_in;