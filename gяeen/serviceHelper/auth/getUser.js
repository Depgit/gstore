import coreHelper from "core/coreHelper";
import singletons from "../../singletons"
import cacheProvider  from "../../cache/provider.js"
import httpStatus from 'http-status-codes'


async function GetUser(req,res){
    let token = req.cookies.utoken || req.cookies['uToken'];
    if(!token || token === ''){
        singletons.log.error("[GetUser]","user token not found")
        return res.status(httpStatus.CONFLICT).end()
    }
    let user = await cacheProvider.Client.get(token)

    if(!user || user === null){
        singletons.log.error("[GetUser]","user not found")
        return res.status(httpStatus.BAD_REQUEST).end()
    }
    user = JSON.parse(user)
    return user 
}


export default GetUser