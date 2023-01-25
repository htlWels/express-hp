var express = require('express');
var router = express.Router();


const openGpt = require("../worker/openGPT.js")


/* GET users listing. */
router.get('/', async function (req, res, next) {
    const msg = await openGpt.runCompletion()
    res.status(200).end(msg)
  });

module.exports = router;