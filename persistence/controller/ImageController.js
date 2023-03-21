const Image = require("../model/Img")

const Grid = require('gridfs-stream');
const Minio = require('minio');
const multer = require('multer');


 
// Instantiate a Minio client with the endpoint, access key and secret key
const minioClient = new Minio.Client({
    endPoint: 'docker.htl-wels.at',
    port: 9020,
    accessKey: process.env.MINIO_CLIENT_ID,
    secretKey: process.env.MINIO_CLIENT_SECRET,
    useSSL: false // change to true if using SSL/TLS
});

// Define a storage engine for Multer that uploads files to Minio
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'temp/'),
    filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage });


// Define a function for uploading an image to Minio and saving its metadata in MongoDB
function uploadImage(file, callback) {
    // Create a new Minio bucket for storing images if it doesn't exist
    const bucketName = 'images';
    /*  minioClient.makeBucket(bucketName, 'us-east-1', function (err) {
         if (err) {
             return callback(err);
         } */
    // Upload the file to Minio
    const objectName = file.originalname;
    const filePath = file.path;
    minioClient.fPutObject(bucketName, objectName, filePath, function (err, etag) {
        if (err) {
            return callback(err);
        }
        // Save the image metadata in MongoDB
        const image = new Image({
            name: file.originalname,
            contentType: file.mimetype,
            size: file.size,
            minioObject: {
                bucketName: bucketName,
                objectName: objectName
            }
        });
        image.save(callback);
    });
    //});
}



image_upload = (req, res, next) => {
    uploadImage(req.file, (err) => {
        if (err) {
            console.log("image_upload - error occured: "  + err)
            throw new Error(`Cloud/Storage: Error ${err} occured in saving data`);
        }
        console.log("Succeeded in storing image")
        return
    });
}

module.exports = {
    image_upload,
    upload
}