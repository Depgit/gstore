import singletons from "../../singletons"
import httpStatus from 'http-status-codes'
import { Product } from "../../scripts/product";
import coreHelper from "core/coreHelper";

async function GetProductALL(req,res){
    let form = req.body
    let result = await getProductAll(req,form);
    if(result.err != null){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).end()
    }
    if(!result.res.status){
        return res.status(httpStatus.BAD_REQUEST).json(result.res)
    }
    res.status(httpStatus.ACCEPTED).json(result.res)
    return
}

async function getProductAll(req,form) {
    const product = await Product.find({})
    return {
        res : coreHelper.response.jsonResponseTemplate(
            true,{
                Msg : "List all the products ",
                Product: product,
            },
            null
        ),
        err : null
    }
}

export default GetProductALL