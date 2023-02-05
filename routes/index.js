var express = require('express');
var router = express.Router();

const jwt = require("jsonwebtoken");
const utils = require("../utils/routerUtils")
//const users = require('../utils/userPassword.js');
const userManagement = require('../persistence/controller/UserlController')

/*   Used HTTP Error Codes
400: client side error (wrong/missing fieldnames:  username,password)
409: jwt token: cannot create token
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

function jwt_createToken(newUser) {
  try {
    //Creating jwt token
    token = jwt.sign(
      { userId: newUser._id, user: newUser.user },
      process.env.JWT_TOKEN,
      { expiresIn: "1h" }
    );
    return token
  } catch (err) {
    console.log("Error in creating token: " + err)
    throw new Error("Error in creating token: " + err);
  }

}

router.post('/register', async (req, res) => {
  /*   if (req.session.loggedIn) 
      return res.status(401).end(utils.createError("You are already logged in!"))
   */
  try {
    const { username, password, role } = req.body;
    if (username && password) {
      console.log("Username: " + username)
      let newUser = await userManagement.user_save(
        username,
        password,
        role == null ? 'user' : role
      );
      try {
        //Creating jwt token
        token = jwt_createToken(newUser)
        res.status(200)
          .json({
            success: true,
            data: {
              userId: newUser.id,
              user: username, token: token
            },
          });
      } catch (err) {
        res
        .status(409)
        .json({
          error: "Error creating JWT"
        })

      }

    } else {
      console.log("Required parameters: username, password not provided")
      res
      .status(400)
      .json({
        error: "Required parameters: username, password not provided"
      })
    }
  } catch (err) {
    console.log(err)
    if (err.message.startsWith("User"))
      res
      .status(437) // user already exists
      .json({
        error:"User already exists"
      })
    else
      res
      .status(500)  // unexpected error
      .json({
        error:"Error on server side"
      })
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
      try {
        //Creating jwt token
        token = jwt_createToken(storedUser)
        response.status(200)
          .json({
            success: true,
            data: {
              userId: storedUser.id,
              user: storedUser.user, token: token
            },
          });
      } catch (err) {
        res
        .status(409)
        .json({
          error:"Error creating JWT"
        })
      }

    }
    catch (err) {
      if (err.message.startsWith("User"))
        response
        .status(435)
        .json({
          error:"User does not exist"
        })
      else {
        console.log(err)
        response
        .status(500)
        .json({
          error:"Error on server side"
        })
      }

    }
  } else {
    response
    .status(400)
    .json({
      error:"Missing parameters"
    })
  }
});

router.get('/logout', utils.checkToken,(req, res) => {
 // req.session.destroy();
  //res.redirect('/');
  console.log("Log out")
})

router.get('/status', utils.checkToken,(req, res) => {
 
    const us = req.session.user
    res.send('You are logged in: ' + us.loginInfo.user + ", role: " + us.role);
 
});

module.exports = router;
