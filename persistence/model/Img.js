const mongoose = require('./../db'),
    { Schema } = mongoose


const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true

    },
    contentType: {
        type: String,
        required:true
    },
    size: {
        type: Number,
        required:true
    },
    minioObject: {
        bucketName: {
            type: String,
            required:true,
        },
        objectName: {
            type: String,
            required:true
        }
    }
});

module.exports = mongoose.model('Image', imageSchema);
    