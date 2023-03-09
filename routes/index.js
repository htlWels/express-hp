var express = require('express');
var router = express.Router();


const jwt = require("jsonwebtoken");
const utils = require("../utils/routerUtils")
//const users = require('../utils/userPassword.js');
const userManagement = require('../persistence/controller/UserlController')
const passport = require('../utils/authori');


/*   Used HTTP Error Codes
400: client side error (wrong/missing fieldnames:  username,password)
409: jwt token: cannot create token
435: User not found in D B
436: Wrong password
437: User already exist

500: Server Side Error

*/

function isLoggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res
      .status(500)  // unexpected error
      .json({
        error: "Error on server side"
      })
  }
};

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
    return null
  }

}

router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (username && password) {
      console.log("Username: " + username)
      let newUser = await userManagement.user_save(
        username,
        password,
        role == null ? 'user' : role
      );

      //Creating jwt token
      token = jwt_createToken(newUser)
      if (token) {
        res.status(200)
          .json({
            success: true,
            data: {
              userId: newUser.id,
              user: username, token: token
            },
          });
      }
      else {
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
          error: "User already exists"
        })
    else
      res
        .status(500)  // unexpected error
        .json({
          error: "Error on server side"
        })
  }
});


// local 

router.post('/login', async (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    try {
      if (err) {
        console.log("Error occured in authenicating local: " + err)
        return next(err);
      }
      if (!user) {
        return res
          .status(435)
          .json({ success: true, user: 0, passwordCheck: false });
      }
      req.logIn(user, (err) => {
        if (err) { return next(err); }
        return res.json({ success: true, user: user._id, passwordCheck: true, role: user.role });
      });
    } catch (err) {
      return next(err);
    }
  })(req, res, next);
})


/*

The GET /auth/github route initiates the Github authentication process 
using the passport.authenticate middleware with the github strategy. 
Once the authentication is completed, the user object is sent back in 
the response in the GET /auth/github/callback route.
 Here, the passport.authenticate middleware with the 
 github strategy is called again to complete the authentication process.
  If the authentication succeeds, the user object is sent back in the 
  response. If it fails, a 401 unauthorized status is sent back.

*/

router.get('/auth/error', (req, res) => {
  return res
    .status(500)
    .json({ success: false, error: "Error in OAuth2-Service" })
})

router.get("/auth/success", (req, res) => {
  console.log("Success : " + req.user)
  token = jwt_createToken(newUser)
  if (token) {
    res.status(200)
      .json({
        success: true,
        userId: newUser.id,
        user: req.user,
        token: token
      });
  }
  else {
    res
      .status(409)
      .json({
        error: "Error creating JWT"
      })

  }


})

/////////////   GITHUB

router.get('/auth/github', passport.authenticate('github',
  passport.authenticate('google', {
    scope: ['email', 'profile']
  })))

router.get('/auth/github/callback', passport.authenticate('github',
  {
    successRedirect: "/auth/success",
    failureRedirect: "/auth/failure",
  }))


/////////////   GOOGLE


router.get('/auth/google',
  passport.authenticate('google', {
    scope: ['email', 'profile']
  }));
router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/auth/success',
  failureRedirect: '/auth/failure'
}));

router.get('/logout', utils.checkToken, (req, res) => {
  //res.redirect('/');
  req.status(200)
    .json({
      success: true
    });
  console.log("Log out")

})

router.get('/status', utils.checkToken, (req, res) => {
  const us = req.session.user

  req.status(200)
    .json({
      success: true,
      data: {
        user: us.loginInfo.user,
        role: us.role
      },
    });

  //    res.send('You are logged in: ' + us.loginInfo.user + ", role: " + us.role);

});

router.get("/logout", (req, res) => {
  req.session = null; // destroy session
  req.logout(); //logout from passport
  res.redirect("/login"); //redirect to home.
});

module.exports = router;
