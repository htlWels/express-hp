/*
created by chatGPT

*/
const fs = require('fs').promises;
const fsS = require('fs')
const bcrypt = require('bcrypt');
const PASSWD_FILE = 'security.json'

let data;


// load the file at the beginning

try {
    if (fsS.existsSync(PASSWD_FILE)) {
        fs.readFile(PASSWD_FILE, 'utf8')
            .then(fileData => {
                data = JSON.parse(fileData);
            })
            .catch(err => {
                console.error(`Error reading security.json: ${err}`);
                throw err;
            });

    }
} catch (err) {
    console.error(err)
}



const users = {
    readDBFile: function () {
        return data;
    },
    writeDBFile: function (newData) {
        data = newData;
        return fs.writeFile(PASSWD_FILE, JSON.stringify(data))
            .catch(err => {
                username
                console.error(`Error writing security.json: ${err}`);
                throw err;
            });
    },
    addUser: function (user) {
        return new Promise((resolve, reject) => {
            const duplicateUser = data.find(u => u.username === user.username);
            if (duplicateUser) {
                reject(new Error('User already exists'));
            }
            bcrypt.hash(user.password, 10)
                .then(hashedPassword => {
                    user.password = hashedPassword;
                    data.push(user);
                    fs.writeFile(PASSWD_FILE, JSON.stringify(data))
                        .catch(err => {
                            username
                            console.error(`Error writing security.json: ${err}`);
                            throw err;
                        })
                    resolve();
                })
                .catch(err => {
                    console.error(`Error hashing password: ${err}`);
                    reject(err);
                });
        });
    },
    searchAndCompare: function (username, password) {
        return new Promise((resolve, reject) => {
            const user = data.find(u => u.username === username);
            if (!user) {
                console.log("User: " + username + " is not known!")
                reject(new Error('User not known'));
                return
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        reject(new Error('Wrong password!'));
                        return
                    }
                    resolve(user);
                })
                .catch(err => {
                    console.error(`Error comparing passwords: ${err}`);
                    reject(err);
                });
        });
    }
};

module.exports = users;