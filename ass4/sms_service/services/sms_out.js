const FileSystem = require('fs');
const path = require('path');
const requests = require('../db/requests.json');
const secondsSinceEpoch = Math.round(Date.now() / 1000);
const maxTokens = 50;

var sms_out = {
    parseSMS : function(req, res, input_sms, myCache) {
        try
        {
            var responseJSON = {
                message : "",
                error : "",
            };

            var rateLimit = false;

            if(requests[input_sms.from])
            {
                if(secondsSinceEpoch - requests[input_sms.from].timestamp >= 3600)
                {
                    requests[input_sms.from].timestamp = secondsSinceEpoch;
                    requests[input_sms.from].tokens = maxTokens - 1;
                }
                else if(requests[input_sms.from].tokens > 0)
                    requests[input_sms.from].tokens--;
                else
                {
                    rateLimit = true;
                    responseJSON.error = "limit reached for from " + input_sms.from;
                }
            }
            else
            {
                var requestEntry = {
                        timestamp : secondsSinceEpoch,
                        tokens : maxTokens - 1
                }
                requests[input_sms.from] = requestEntry;
            }

            var valid = false;
            
            if(!rateLimit)
            {
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
                        }
                        else if(!myCache.has(id.toString()))
                            break;
                        continue;
                    }
                }
                else
                {
                    res.status(400);
                }
            }
            else
            {
                res.status(429);
            }

            FileSystem.writeFile(path.resolve(__dirname, "../db/requests.json"), JSON.stringify(requests), (err) => {
                if(err) throw err;
            });
            res.json(responseJSON);
        }
        catch (err)
        {
            responseJSON.error = "unknown failure";
        }
    }
}

module.exports = sms_out;