const router = require('express').Router();
const User = require('../models/User');
const validateSignupInput = require("../validation/signup");
const passport = require('../middlewares/authentication');



router.post('/signup', (req, res) => {

  try {
    console.log("Pre validation")
    console.log(req.body)
    const { isValid, errors } = validateSignupInput(req.body)

    if(!isValid) {
      console.log("Errors present in input")
      throw(errors)
    }
//  if(req.body.password == req.body.password2) {
    console.log("Passed validations")
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      phone_number: req.body.phonenumber,
      auth_token: req.body.email // do something about this
    })
      .then((user) => {
        console.log("Signup Create Then")
        req.login(user, () => res.status(201).json(user));
      })
      .catch((err) => {
        console.log("In the catch")
        //const message = err["errors"][0]["message"]
        console.log(err)

    
        
        res.status(400).json({ msg: err  });
      });
//  }
    }
    catch(err) {
      res.status(400).json({msg: err})
    }
});


router.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    console.log("Begin?")
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.json(req.user);
  });

router.post('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logout successful' });
})

module.exports = router;

