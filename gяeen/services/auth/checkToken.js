import coreHelper from "core/coreHelper";
import singletons from "../../singletons"
import httpStatus from 'http-status-codes'
import cacheProvider from "../../cache/provider";

async function CheckToken(req,res){
    const token = req.cookies.utoken;
    if(!token || token === ''){
        singletons.log.error("[CheckToken]","User  not found")
        return 
    }

    let user = await cacheProvider.Client.get(token)
    user = JSON.parse(user)

    res.status(httpStatus.ACCEPTED).json(coreHelper.response.jsonResponseTemplate(
        true,
        {
            user: user
        },
        null
      ))
    return 
}


export default CheckToken