
/* global require */

const mongoose = require('./../db'),
    { Schema } = mongoose



const UserSchema = new Schema({
    loginInfo: {
        user: { type: String, 
            required: true,
            index: true,
            unique: true  },
        password: { type: String, required: true }
    },
    status: Boolean,  // logged on ?
    logHistory: [{
        registered:Date,
        lastLogin: Date,
    },],

})

class TheUser {

    get userName() {
        return `${this.user}`
    }
   
    static authorized(passwd) {
        return this.password === passwd
    }



}


UserSchema.loadClass(TheUser)


module.exports = mongoose.model('TheUsers', UserSchema)