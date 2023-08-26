import coreHelper from "core/coreHelper";
import singletons from "../../singletons"
import cacheProvider  from "../../cache/provider.js"
import httpStatus from 'http-status-codes'
import { User } from "../../scripts/user";
import config from "../../config/config";
import crypto from 'crypto'
import cacheModels from "../../cache/cacheModels";

async function ValidateOtp(req,res){
    let form = req.body
    
    const token = crypto.randomUUID()
    let result = await validateOtp(req,form,token);
    if(result.err != null){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).end()
    }
    if(!result.res.status){
        return res.status(httpStatus.BAD_REQUEST).json(result.res)
    }

    
    res.cookie(config.Config.Cookie.Name, token, {
        expires: new Date(Date.now() + config.Config.Cookie.Expiry),
        path: '/',
        secure: config.Config.Cookie.Secure,
        httpOnly: true,
        sameSite: config.Config.Cookie.SameSite 
      }).status(httpStatus.ACCEPTED).json(result.res)

    return 
}

async function validateOtp(req,form,token) {
    try {

        let cacheOtp = await cacheProvider.Client.get(form.OtpId)
        if(cacheOtp===null){
            return {
                res : coreHelper.response.jsonResponseTemplate(
                    false,{
                        Msg : "Otp time expire Login again and verify the email"
                    },
                    null
                ),
                err : null
            }
        }
        cacheOtp = JSON.parse(cacheOtp);
        const user = await User.findById(cacheOtp.user_id);
        
        if(!user){
            return {
                res : coreHelper.response.jsonResponseTemplate(
                    false,{
                        Msg : "User doesn't exist"
                    },
                    null
                ),
                err : null
            }
        }

        if(cacheOtp.otp !== form.otp){
            return {
                res : coreHelper.response.jsonResponseTemplate(
                    false,{
                        Msg : "wrong otp id"
                    },
                    null
                ),
                err : null
            }
        }

        await cacheProvider.Client.delete(form.OtpId);


        user.active=true

        let cacheuser = new cacheModels.CacheUser()
        cacheuser.Id = user._id
        cacheuser.Email = user.email
        cacheuser.Type = user.type
        cacheuser.Name = user.name

        const [savedUser, cacheSetResult] = await Promise.all([
            user.save(),
            cacheProvider.Client.set(token, cacheuser, config.Config.Cookie.Expiry)
        ]);

        return {
            res : coreHelper.response.jsonResponseTemplate(
                true,{
                    Msg : "successfuly validateOtp"
                },
                null
            ),
            err : null
        }
    } catch (err) {
        singletons.log.error("[validateOtp]",err);
        return {
            res: null,
            err : err
        }
    }

}

export default ValidateOtp