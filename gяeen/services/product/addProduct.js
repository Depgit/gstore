import coreHelper from "core/coreHelper";
import singletons from "../../singletons"
import config from "../../config/config";
import cacheProvider  from "../../cache/provider.js"
import httpStatus from 'http-status-codes'
import s3Store from "../../singletons/aws";
import spi from "core/spi";
import { Product } from "../../scripts/product";


async function AddProduct(req,res){
    let form = req.body

    let result = await addProduct(req,form);
    if(result.err != null){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).end()
    }
    if(!result.res.status){
        return res.status(httpStatus.BAD_REQUEST).json(result.res)
    }
    singletons.log.info("[AddProduct]","Product added successfully")
    res.status(httpStatus.ACCEPTED).json(result.res)
    return
}

async function addProduct(req,form){
    try {
        const image_file = req.files.file
        let sd = new spi.fileStore.FileStoreData();
        sd.bodyStream = image_file.product_image
        sd.key = image_file.name
        let output = await s3Store.add(sd,config.Config.FileStore.S3.BucketPublic)
        if(output!= null){
            singletons.log.error("[addProduct]","AWS upload image error")
            return {
                res : coreHelper.response.jsonResponseTemplate(
                    false,null,"AWS upload image error"
                ),
                err : null
            }
        }

        const product = await Product.create({
            title : form.title,
            url: form.url,
            image_url: sd.key,
            description: form.description,
            url : form.url,
            vendor: form.vendor
        })



        return {
            res : coreHelper.response.jsonResponseTemplate(
                true,{
                    Msg : "product added successfuly ",
                    Product: product
                },
                null
            ),
            err : null
        }
    } catch (err) {
        singletons.log.error("[addProduct]",err);
        return {
            res: null,
            err : err
        }
    }
}


export default AddProduct