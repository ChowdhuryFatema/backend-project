import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import { resolve } from 'path';


// Configuration
cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
});

export const sendImageToCloudinary = (imageName: string, path: string) => {

    return new Promise((resolve, reject) => {

        // Upload an image
        const uploadResult = cloudinary.uploader
            .upload(
                path, {
                public_id: imageName,
            },
                function (error, result) {
                    if (error) {
                        reject(error);
                    }
                    resolve(result)
                }
            )


        console.log(uploadResult);

    })


}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

export const upload = multer({ storage: storage })