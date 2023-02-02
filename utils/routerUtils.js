var express = require('express');
var router = express.Router();



const utils = {

    handleInvalidRoute: function (req, res) {
        const err = req.originalUrl
        res.status(404).end(`The requested endpoint ${err} does not exist.`);
    },

    createError: function(errorMessage) {
        return JSON.stringify({ error: errorMessage })
    }



}

module.exports = utils