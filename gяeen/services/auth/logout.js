import coreHelper from "core/coreHelper";
import singletons from "../../singletons"
import config from "../../config/config";
import cacheProvider  from "../../cache/provider.js"
import httpStatus from 'http-status-codes'


async function Logout(req,res){
    const token = req.cookies.utoken;
    
    if(!token || token === ''){
        singletons.log.error("[Logout]","token not found")
        return res.status(httpStatus.CONFLICT).end()
    }

    await cacheProvider.Client.delete(token)

    res.cookie(config.Config.Cookie.Name, token, {
        expires: new Date(0),
        path: '/',
        secure: config.Config.Cookie.Secure,
        httpOnly: true,
        sameSite: config.Config.Cookie.SameSite 
      }).status(httpStatus.ACCEPTED).json(coreHelper.response.jsonResponseTemplate(
        true,"Successfully logout",null
      ))
    return 
}


export default Logout