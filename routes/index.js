var express = require('express');
var router = express.Router();

const users = require('../utils/userPassword.js');

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
    let username = req.body.username;
    let password = req.body.password;
    if (username && password) {
      await users.addUser({
        username,
        password,
      });
      res.sendStatus(200);
    } else {
      console.log("Required parameters: username, password not provided")
      res.sendStatus(400)
    }
  } catch (err) {
    console.error("Error occured in creating user! " + err);
    if (err.message.startsWith("User"))
      res.sendStatus(437)
    else
      res.sendStatus(500)
  }
});



router.post('/auth', async (request, response, next) => {
  // Capture the input fields
  let username = request.body.username;
  let password = request.body.password;
  // Ensure the input fields exists and are not empty

  if (username && password) //Xsits and are not empty
  {
    try {
      const user = await users.searchAndCompare(username, password);
      response.sendStatus(200)
    }
    catch (err) {
      console.log(err.message)
      if (err.message.startsWith("User"))
        response.sendStatus(435)
      else if (err.message.startsWith("Password"))
        response.sendStatus(436)
      else
        response.sendStatus(500)
    }
  } else {
    response.status(400).send("Params missing  ")
  }
});

module.exports = router;
