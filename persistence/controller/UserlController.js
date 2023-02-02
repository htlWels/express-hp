/* global require */

const User = require('../model/User')



// eslint-disable-next-line no-undef
exports.user_authorized = async function (_user, _passwd) {
    const storedUser = await User.findOne({ 'loginInfo.user': _user });
    if (!storedUser) {
        console.log(`User: ${_user} not found.`);
        throw new Error(`User: ${_user} not found.`);
    }
    //const user = storedUser[0];
    const isPasswordMatched= await storedUser.comparePassword(_passwd);
    return isPasswordMatched
}

// eslint-disable-next-line no-undef
//const writeAndRead = async () => {
exports.user_save = async (newUser, newPasswd, theRole) => {
    const duplicateUser = await User.find({ 'loginInfo.user': newUser });

    if (duplicateUser.length) {
        throw new Error('User: already exists');
    }

    const user = new User({
        loginInfo: {
            user: newUser,
            password: newPasswd
        },
        status: true,
        role:theRole
    });
    try {
        const result = await user.save();
        return result;
    } catch (err) {
        console.log(`saving error: ${err}`)
        throw new Error(`DB: Error ${err} occured in saving data`);
    }
}
