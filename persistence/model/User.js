
/* global require */
const bcrypt = require('bcrypt')
const mongoose = require('./../db'),
    { Schema } = mongoose


const UserSchema = new Schema({
    loginInfo: {
        user: {
            type: String,
            required: true,
            index: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: [6,'DB: Password must be a t leeast 8 characters long']
        }
    },
    role: {
        type: String,
        enum: {
            values: ['user', 'developer', 'admin'],
            //message: 'DB: MissPlease select your role'
        },
        default: 'user'
    },
    status: {
        type: Boolean,  // logged on ?
        default:false
    },
    logHistory: {
        registered: {
            type: Date,
            default: Date.now
        },
        lastLogin: {
            type: Date,
            default: Date.now
        },
    },

})


//Encryting Passwords before Saving
UserSchema.pre('save', async function (next) {
    this.loginInfo.password = await bcrypt.hash(this.loginInfo.password, 10);
});

UserSchema.methods.comparePassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword, this.loginInfo.password);
}

//mongodb: name of collection: allUsers 
module.exports = mongoose.model('AllUsers', UserSchema)