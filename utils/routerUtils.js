var express = require('express');
//var router = express.Router();
const jwt = require("jsonwebtoken");


const utils = {

    handleInvalidRoute: function (req, res) {
        const err = req.originalUrl
        res.status(404).end(`The requested endpoint ${err} does not exist.`);
    },

    createError: function (errorMessage) {
        return JSON.stringify({ error: errorMessage })
    },
    // middleware function to check JWT token
    checkToken: function (req, res, next) {
        // get the token from the request header
        const token = req.headers["x-access-token"] || req.headers["authorization"];

        if (!token) {
            return res.status(401).json({
                error: "Access denied. No token provided."
            });
        }
        try {
            // verify the token using the secret key
            const decoded = jwt.verify(token, process.env.JWT_TOKEN);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({
                error: "Only logged in users can use this service"
            });
        }
    }
}



module.exports = utils