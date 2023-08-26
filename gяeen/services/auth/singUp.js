import coreHelper from "core/coreHelper";
import singletons from "../../singletons"
import config from "../../config/config";
import cacheModels from "../../cache/cacheModels/index.js";
import { User, UserDetails } from "../../scripts/user.js";
import cacheProvider  from "../../cache/provider.js"
import httpStatus from 'http-status-codes'
import thirdparty from "../../thirdparty";
import crypto from 'crypto'
import emailQueue from "../../task/email";

async function SignUp(req,res){
    let form = req.body

    let result = await signUp(req,form);
    if(result.err != null){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).end()
    }
    if(!result.res.status){
        return res.status(httpStatus.BAD_REQUEST).json(result.res)
    }
    singletons.log.info("[SignUp]","sign up successfully")
    res.status(httpStatus.ACCEPTED).json(result.res)
    return 
}

async function signUp(req,form) {
    try {
        const checkUser = await User.findOne({email:form.email});
        if(checkUser!=null){
            singletons.log.error("[signUp]","user already exists")
            return {
                res : coreHelper.response.jsonResponseTemplate(
                    false,null,"user already exists"
                ),
                err : null
            }
        }
        let password = thirdparty.bcrypt.encrypt(form.password)
        const userDetails = await UserDetails.create({})
        const user = await User.create({
            email: form.email,
            password: password,
            details: userDetails._id
        })
        
        let otpId = coreHelper.crypto.sha256(crypto.randomBytes(2))
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

            // singletons.log.info("[signUp]",result)

            emailQueue.add({
                to: form.email,
                subject : '[Green Pellar] Email Varify',
                text : 'otp for verify the email : ' + otp
            })

        }

        return {
            res : coreHelper.response.jsonResponseTemplate(
                true,{
                    Msg : "successfuly sent otp",
                    OtpId: otpId
                },
                null
            ),
            err : null
        }
    } catch (err) {
        singletons.log.error("[signUp]",err);
        return {
            res: null,
            err : err
        }
    }

}

export default SignUp