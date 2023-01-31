var express = require('express');
var router = express.Router();

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
  try {
    const {username, password,role}  = req.body;
    
    if (username && password) {
      console.log("Username: " + username)
      await userManagement.user_save(
        username,
        password,
        role==null? 'user':role
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
      res.status(500).end(err.message)  // unexpected error
  }
});




router.post('/auth', async (request, response, next) => {
  // Capture the input fields
  let username = request.body.username;
  let password = request.body.password;
  // Ensure the input fields exists and are not empty

  if (username && password) {
    try {
      const result= await userManagement.user_authorized(username, password);
      if (result == false)
        return response.sendStatus(436)
      // store user object in session
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

module.exports = router;
