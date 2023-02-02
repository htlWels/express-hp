var express = require('express');
var router = express.Router();
const utils = require("../utils/routerUtils")
//const users = require('../utils/userPassword.js');
const userManagement = require('../persistence/controller/UserlController')

/*   Used HTTP Error Codes
400: client side error (wrong/missing fieldnames:  username,password)
435: User not found in D B
436: Wrong password
437: User already exist

500: Server Side Error

*/



/* GET home page. */
/* router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
}); */
/* ************************************** **************************** ****************** */

router.post('/register', async (req, res) => {
  if (!req.session.loggedIn) 
    return res.status(401).end(utils.createError("You are already logged in!"))

  try {
    const { username, password, role } = req.body;
    if (username && password) {
      console.log("Username: " + username)
      await userManagement.user_save(
        username,
        password,
        role == null ? 'user' : role
      );
      res.sendStatus(200);
    } else {
      console.log("Required parameters: username, password not provided")
      res.sendStatus(400)
    }
  } catch (err) {
    console.log(err)
    if (err.message.startsWith("User"))
      res.sendStatus(437) // user already exists
    else
      res.status(500)  // unexpected error
  }
});




router.post('/login', async (request, response, next) => {
  // Capture the input fields
  const { username, password } = request.body;

  // Ensure the input fields exists and are not empty
  if (username && password) {
    try {
      const { isPasswordMatched, storedUser } = await userManagement.user_authorized(username, password);
      if (isPasswordMatched == false)
        return response.sendStatus(436)
      // store user object in session
      request.session.loggedIn = true;
      request.session.user = storedUser
      console.log(storedUser.username)
      response.sendStatus(200)

    }
    catch (err) {
      if (err.message.startsWith("User"))
        response.sendStatus(435)
      else {
        console.log(err)
        response.sendStatus(500)
      }

    }
  } else {
    response.status(400).send("Params missing  ")
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
})

router.get('/status', (req, res) => {
  if (req.session.loggedIn) {
    const us = req.session.user
    res.send('You are logged in: ' + us.loginInfo.user + ", role: " + us.role);
  } else {
    res.send('You are logged out');
  }
});/* 

router.get("*", (req, res) => {
  utils.handleInvalidRoute(req, res)
});
router.post("*", (req, res) => {
  utils.handleInvalidRoute(req, res)
}); */
module.exports = router;
