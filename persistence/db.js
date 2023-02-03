/* eslint-disable no-undef */
// grab the things we need

/* global require */
const mongoose = require('mongoose');


//const uri = 'mongodb+srv://refr:<password>@cluster0.gyig1.mongodb.net/admin?retryWrites=true';
const uri = process.env.MONGO_CONNECT
// uri = 'mongodb://localhost/ahit5?retryWrites=true'

// uri = "mongodb+srv://horus:47oldEgyptKing47@risingsun-4o7zv.gcp.mongodb.net/wawi?retryWrites=true?ssl=true"

const options = {
    useNewUrlParser: true,
    autoIndex: true, 
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};

mongoose.Promise = global.Promise;
try {
    mongoose.set('strictQuery', false)

    mongoose
        .connect(uri, options)
        .then(() => console.log('MongoDB is now connected'), err => console.log(err, options))
        .catch(er => console.log(`Error in opening connection ... ${er}`));

    mongoose.connection.on('connected', () => {
        console.log('INFO: Mongoose default connection opened');
    });

    mongoose.connection.on('error', (err) => {
        // logger.log('error',  'Couldn't able to connect to MongoDB', err);
        // Blow system on db error
        console.log(`INFO: Mongoose connection did not succeed due to error: ${err} `);
        throw err;
    });

    mongoose.connection.on('reconnected', () => {
        console.log('INFO: Mongo connection is now reconnected', arguments);
    });

    mongoose.connection.on('disconnecting', () => {
        console.log('Info: Mongoose connection is going to be disconnected', arguments);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Info: Mongoose connection is now disconnected', arguments);
    });
} catch (e) {
    console.log('Error: Couldn\'t connect to mongo:', e);
}

module.exports = mongoose;
