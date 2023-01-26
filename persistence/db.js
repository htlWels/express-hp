/* eslint-disable no-undef */
// grab the things we need

/*

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.Promise = require ('bluebird');
var dbURI = 'mongodb://localhost:27017/books';

var options = {
  db: { native_parser: true },
  server: { poolSize: 5 },
  replset: { rs_name: 'myReplicaSetName' }mongodb+srv://localhost,
  user: 'myUserName',
  pass: 'myPassword'
}
mongoose.connect(uri, options);

var options = {
    db: {
        native_parser: true
    },
    server: {
        poolSize: 5
    }
}
// http://mongoosejs.com/docs/connections.html

mongoose.connect(dbURI, options);

var db = mongoose.connection;

db.on('error', function() {
   console.log('Error occoured in opening Mongo DB');
});

db.once('open', function() {
  console.log('Mongoose is connected to database. ');
});

db.on('connected', function() {
    console.log('Mongoose default connection open to ' + dbURI);
});
db.on('disconnected', function() {
    console.log('Mongoose connection disconnected.');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose connection disconnected trough app termination.');
    });
});

*/
// import {mongoose, Promise, connect, connection, } from 'mongoose'

/* global require */
const mongoose = require('mongoose');


const uri = 'mongodb+srv://horus:47oldEgyptKing47@risingsun-4o7zv.gcp.mongodb.net/ahit5?retryWrites=true';
// uri = 'mongodb://localhost/ahit5?retryWrites=true'

// uri = "mongodb+srv://horus:47oldEgyptKing47@risingsun-4o7zv.gcp.mongodb.net/wawi?retryWrites=true?ssl=true"

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};

mongoose.Promise = global.Promise;
try {
    console.log('DBURL:', uri);

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
