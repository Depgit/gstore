import coreHelper from "core/coreHelper";
import singletons from "../../singletons"
import config from "../../config/config";
import cacheModels from "../../cache/cacheModels/index.js";
import { User } from "../../scripts/user.js";
import cacheProvider  from "../../cache/provider.js"
import httpStatus from 'http-status-codes'


async function SignUp(req,res){
    let form = req.body
    
    singletons.log.info("[SignUp]",form)

    let result = await signUp(req,form);
    singletons.log.info(result);
    if(result.err != null){
        return res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).end()
    }
    if(!result.res.status){
        return res.status(httpStatus.StatusCodes.BAD_REQUEST).json(result.res)
    }

    res.status(httpStatus.StatusCodes.OK).json(result.res)
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
        const user = await User.create({
            email: form.email,
            password: form.password
        })
        
        let otpId = coreHelper.crypto.sha256(Buffer.alloc(4))
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
        singletons.log.info(value);

        let cache = cacheProvider.Client.set(otpId,value,config.Config.Core.Otp.OtpExpiryDuration)
        singletons.log.info(cache);

        await user.save()

        return {
            res: user,
            err: null
        }
    } catch (err) {
        singletons.log.info("[signUp]",err);
        return {
            res: null,
            err : err
        }
    }

}

export default SignUp