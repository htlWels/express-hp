/* global require */

const User = require('../model/User'),
    bcrypt = require('bcrypt')



// eslint-disable-next-line no-undef
exports.user_authorized = function (_user, _passwd, callBack) {
    console.log("Enter user_authorized ....");

    /*(async () => {
    console.log("Enter async ....");
    try {
        console.log("enter try/catch");
        const results = await User.find({})
        console.log(results)
    } catch (err) {
        console.log(`Error in quering db: ${err}`);
    }
    })*/
    /*
    try {
        console.log("enter try/catch");
        User.find({}, function (err, data) {
            if (err)
                console.log(`Error detected: ${err}`)
            console.log("Find results ...")
        })

    } catch (err) {
        console.log(`Error in quering db: ${err}`);
    }
*/

    console.log('next step')
    try {
        User.find({
            'loginInfo.user': _user,
        }, function (err, data) {
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
exports.user_save = function (_user, _passwd) {
    let user = new User({
        loginInfo: {
            user: _user,
            password: _passwd,
        },
        firstName: 'not Known',
        lastName: 'not Known',
        status: false,


    })
    try {
        user.save((err, result) => {
            if (err) {
                console.log(`Error occured in storing: ${err}`)
                return false
            }
            console.log(`Storing, ObjId: ${result._id}`)
            return true
        })
    } catch (err) { console.log(`saving error: ${err}`) }
}

