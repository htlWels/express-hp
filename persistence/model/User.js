
/* global require */

const mongoose = require('./../db'),
    { Schema, } = mongoose



const UserSchema = new Schema({
    loginInfo: {
        user: String,
        password: String,
    },
    firstName: String,
    lastName: String,
    status: Boolean,
    logHistory: [{
        logon: Date,
    },],

})

class TheUser {

    get fullName() {
        return `${this.firstName} ${this.lastName}`
    }
    set fullName(v) {
        const firstSpace = v.indexOf(' ')
        this.firstName = v.split(' ')[0]
        this.lastName = firstSpace === -1 ? '' : v.substr(firstSpace + 1)
    }
    static authorized(passwd) {
        return this.password === passwd
    }



}


UserSchema.loadClass(TheUser)

//Export model
//MyModel.events.on('error', err => console.log(err.message));
// eslint-disable-next-line no-undef
module.exports = mongoose.model('User', UserSchema)