/* global require */

const User = require('../model/User')



// eslint-disable-next-line no-undef
exports.user_authorized = async function (_user, _passwd, callBack) {
    console.log("Enter user_authorized ....");
    const storedUser = await User.find({ 'loginInfo.user': _user });
    if (!storedUser.length) {
        console.log(`User: ${_user} not found.`);
        throw new Error(`User: ${_user} not found.`);
    }
    storedUser.isAuthorized(_passwd, (err, result) => {
        return err, result, storedUser
    })

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
