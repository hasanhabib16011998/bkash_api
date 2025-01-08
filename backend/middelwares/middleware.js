const axios = require('axios');
const { getValue, setValue,unsetValue } = require("node-global-storage");
class Middleware {
    async bkash_auth(req, res, next){
        unsetValue("id_token");
        try{
            const{data}=await axios.post(process.env.BKASH_GRANT_TOKEN_URL,{
                "app_key":process.env.BKASH_APP_KEY,
                "app_secret":process.env.BKASH_APP_SECRET,
            },
        {
            headers: {
                "Content-Type":"application/json",
                "Accept": "application/json",
                "username": process.env.BKASH_USERNAME,
                "password": process.env.BKASH_PASSWORD,
            }
        })
        setValue("id_token", data.id_token,{ protected: true });

        console.log(data);
        console.log(getValue('id_token'));
        next();

        }
        catch(error){
            return res.status(401).json({error: error.message});
        }
    }
}

module.exports = new Middleware();