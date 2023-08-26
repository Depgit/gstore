import coreHelper from "core/coreHelper";
import singletons from "../../singletons"
import config from "../../config/config";
import cacheModels from "../../cache/cacheModels/index.js";
import { User,UserDetails } from "../../scripts/user.js";
import cacheProvider  from "../../cache/provider.js"
import httpStatus from 'http-status-codes'
import thirdparty from "../../thirdparty";
import crypto from 'crypto'
import emailQueue from "../../task/email";

async function Login(req,res){
    let form = req.body
    const token = crypto.randomUUID()
    let result = await login(req,form,token);
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

async function login(req,form,token) {
    try {
        const user = await User.findOne({email:form.email}).populate('details')
        if(user==null){
            singletons.log.error("[login]","user does not exists")
            return {
                res : coreHelper.response.jsonResponseTemplate(
                    false,null,"user does not exists"
                    ),
                err : null
            }
        }
        
        let passwordCheck = thirdparty.bcrypt.decrypt(form.password,user.password)
        
        if(!passwordCheck){
            singletons.log.error("[login]","wrong email or password")
            return {
                res : coreHelper.response.jsonResponseTemplate(
                    false,null,"wrong email or password"
                ),
                err : null
            }
        }

        if(!user.active){
            let otpId = coreHelper.crypto.sha256(crypto.randomBytes(2));
            let otp;
            if(config.Config.Core.Otp.Proxy){
                otp = config.Config.Core.Otp.Otp
            } else {
                otp = coreHelper.otpGenerate.generateOtp(6)
            }
    
            let cacheOtp = new cacheModels.CacheOtp();
            cacheOtp.UserId= user._id
            cacheOtp.Otp = otp
    
            let value = cacheOtp.toString();
    
            await cacheProvider.Client.set(otpId,value,config.Config.Core.Otp.OtpExpiryDuration)

            if(!config.Config.Core.Otp.Proxy){
                // const from = config.Config.Email.SendInBlue.Host
                // const to = form.email
                // const subject = '[Green Pellar] Email Varify'
                // const text = 'otp for verify the email : ' + otp
                // const mailObj = {
                //     from,to,subject,text
                // }
                // const result = await thirdparty.sendEmail(mailObj);
                
                emailQueue.add({
                    to: form.email,
                    subject : '[Green Pellar] Email Varify',
                    text : 'otp for verify the email : ' + otp
                })
            }

            return {
                res : coreHelper.response.jsonResponseTemplate(
                    true,{
                        Msg : "please verify otp",
                        OtpId: otpId
                    },
                    null
                ),
                err : null
            }
        }

        let cacheuser = new cacheModels.CacheUser()
        cacheuser.Id = user._id
        cacheuser.Email = user.email
        cacheuser.Type = user.type
        cacheuser.Name = user.name
        cacheuser.phone = user.details.phone

        await cacheProvider.Client.set(token,cacheuser,config.Config.Cookie.Expiry)
        
        return {
            res : coreHelper.response.jsonResponseTemplate(
                true,{
                    Msg : "successfuly login",
                    User: user
                },
                null
            ),
            err : null
        }
    } catch (err) {
        singletons.log.error("[login]",err);
        return {
            res: null,
            err : err
        }
    }

}


export default Login