import coreHelper from "core/coreHelper";
import singletons from "../../singletons"
import cacheProvider  from "../../cache/provider.js"
import httpStatus from 'http-status-codes'


async function GetUser(req,res){
    const token = req.cookies.utoken;
    
    if(!token || token === ''){
        singletons.log.error("[GetUser]","user token not found")
        return res.status(httpStatus.CONFLICT).end()
    }

    let user = await cacheProvider.Client.get(token)

    res.status(httpStatus.ACCEPTED).json(coreHelper.response.jsonResponseTemplate(
                true,user,null
            ))
    return 
}


export default GetUser