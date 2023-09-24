import multerS3 from "multer-s3"
import multer from "multer"
import {s3} from "../utils/s3config.js"
require("aws-sdk/lib/maintenance_mode_message").suppress = true;

export function uploadToS3Bucket(folderName){
    const upload = multer({
        storage: multerS3({
            s3,
            bucket:process.env.AWS_BUCKET,
            metadata: function(req,file, cb){
                cb(null, {fieldName:file.fieldname})
            },
            key:function(req,file,cb){
                const fileName = Date.now().toString()+"."+file.originalname;
                cb(null,`${folderName}/${fileName}`)
            },
        }),
    });
    return upload.array("files")
}