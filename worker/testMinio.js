const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const Minio = require('minio');
const multer = require('multer');
var express = require('express');

var app = express();

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://refr:47rf-winnt75@cluster0.gyig1.mongodb.net/authorization?retryWrites=true');

// Create a GridFS stream for storing and retrieving files from MongoDB
let gfs;
mongoose.connection.once('open', () => {
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
});
 
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

// Define a schema for storing image metadata in MongoDB
const imageSchema = new mongoose.Schema({
    name: String,
    contentType: String,
    size: Number,
    minioObject: {
        bucketName: String,
        objectName: String
    }
});

// Create a model for the image schema
const Image = mongoose.model('Image', imageSchema);

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

// Route for uploading an image using Multer
app.post('/upload', upload.single('image'), (req, res, next) => {
    uploadImage(req.file, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send('Image uploaded successfully.');
    });
});

app.listen(3010, () => {
    console.log('Server running on port 3010');
  });