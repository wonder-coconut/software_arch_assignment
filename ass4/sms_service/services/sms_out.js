var sms_out = {
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
                    responseJSON.message = "outbound sms is ok";
                    valid = true;
                }
            }

            if(valid)
            {
                var id = 0;
                while(true)
                {
                    id++;
                    obj = myCache.get(id.toString());
                    if(obj)
                    {
                        if((obj.from === input_sms.from) && (obj.to === input_sms.to))
                        {
                            responseJSON.message = "";
                            responseJSON.error = "sms from " + input_sms.from + " and to " + input_sms.to + " blocked by STOP request";
                            break;
                        }
                        else
                            continue;
                    }
                    else if(myCache.has(id.toString()))
                        break;
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

module.exports = sms_out;