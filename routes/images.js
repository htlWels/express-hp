var express = require('express');
var router = express.Router();

const {imageController,upload} = require("../persistence/controller/ImageController")

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


// Route for uploading an image using Multer
router.post('/upload', upload.single('image'), (req, res, next) => {
    try {
         imageController.image_upload(req,res,next)
         res.status(200)
         .json({
           success: true,
         });
    }
    catch (e) {
        res
        .status(500)  // unexpected error
        .json({
          error: "Error on server side"
        })
    }
   
});


module.exports = router;
