/* global require */

const User = require('../model/User'),
    bcrypt = require('bcrypt')



// eslint-disable-next-line no-undef
exports.user_authorized = function (_user, _passwd, callBack) {
    console.log("Enter user_authorized ....");
    try {
        User.find({
            'loginInfo.user': _user,
        }, (err, data) => {
            if (err) {
                console.log(`UserSchema: Error occured: ${err}`)
                return callBack(err, null)
            }
            if (data.length === 0) {
                return callBack(null, data)
            }
            bcrypt.compare(_passwd, data[0].loginInfo.password, (err, res) => {
                if (err) {
                    console.log(`bcrypt: Error occured: ${err}`)
                    return callBack(err, null)
                }
                callBack(null, res)
            })
        })
    } catch (err) {
        console.log(`Error occured in function user_authorized() : ${err}`)
    }

    console.log('END')
}

// eslint-disable-next-line no-undef
//const writeAndRead = async () => {
exports.user_save = async (newUser, newPasswd) => {
    const duplicateUser = await User.find({ 'loginInfo.user': newUser });

    if (duplicateUser.length) {
        throw new Error('User: already exists');
    }

    const user = new User({
        loginInfo: {
            user: newUser,
            password: newPasswd,
        },
        status: true,
        logHistory: {
            registered: new Date(),
            lastLogin: new Date()
        }
    });
    try {
        const result = await user.save();
        return result;
    } catch (err) {
        console.log(`saving error: ${err}`)
        throw new Error('DB: Error occured in saving data');
    }
}
