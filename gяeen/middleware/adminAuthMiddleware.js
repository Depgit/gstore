import coreHelper from "core/coreHelper/index.js";
import GetUser from "../serviceHelper/auth/index.js";
import singletons from "../singletons/index.js";
import httpStatus from 'http-status-codes'

async function AdminAuthMiddleware(req,res){
    let user = await GetUser.GetUser(req,res);
    if(user === null){
        singletons.log.error("[AuthModdleware]","user not found");
        return res.status(httpStatus.UNAUTHORIZED).json(coreHelper.response.jsonResponseTemplate(
            false,"Inavalid Token",null
        ))
    }
    if(user.type===""){
        singletons.log.error("[AuthModdleware]","Not Authorise ");
        return res.status(httpStatus.UNAUTHORIZED).json(coreHelper.response.jsonResponseTemplate(
            false,"Not Authorise",null
        ))
    }
    return
}

export default AdminAuthMiddleware
