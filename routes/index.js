var express = require('express');
var router = express.Router();
const users = require('../utils/userPassword.js');

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
        password
      });
      res.status(200).send('User created successfully.');
    } else {
      res.status(400).send("Required parameters: username,password not provided");
    }
  } catch (err) {
    console.error("Error occured in creating user! " + err);
    res.status(400).send("Error occured in creating user! ");
  }
});



router.post('/auth', async (request, response) => {
  // Capture the input fields
  let username = request.body.username;
  let password = request.body.password;
  // Ensure the input fields exists and are not empty

  if (username && password) //xists and are not empty
  {
    try {
      const user = await users.searchAndCompare(username, password);
      res.send('Logged in successfully.');
    }
    catch (err) {
      console.log(err)
      response.send('Incorrect Username and/or Password!');
    }
  } else {

    response.send('Please enter Username and Password!');
    response.end();
  }
});

module.exports = router;
