const router = require('express').Router();
const User = require('../models/User');
const validateSignupInput = require("../validation/signup");
const passport = require('../middlewares/authentication');



router.post('/signup', (req, res) => {

  try {
    const { isValid, errors } = validateSignupInput(req.body)

    if(!isValid) {
      throw(errors)
    }

    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      phone_number: req.body.phonenumber
    })
      .then((user) => {

        // Shouldn't return the whole damn user!
        req.login(user, () => res.status(201).json(user));
      })
      .catch((err) => {
        const message = err["errors"][0]["message"]

        let errmsg = "Signup Error" 
        if(message == "email must be unique") {
          console.log("Email not Unique")
          errmsg = "Email already in use"
        } else if(message == "username must be unique") {
          console.log("Username not Unique")
          errmsg = "Username already in use"
        } else if(message == "phonenumber must be unique") {
          console.log("Phonenumber not Unique")
          errmsg = "Phone number already in use"
        } else if(message == "Validation len on password failed") {
          console.log("PW Too Short")
          errmsg = "Password too short."
        }      
        res.status(400).json({ msg: errmsg });
      });
    }
    catch(err) {
      console.log(err)
      res.status(400).json({msg: "Signup Error"})
    }
});


router.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    console.log("Begin?")
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
   // console.log(req.user)
    res.json(req.user);
  });

router.post('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logout successful' });
})

module.exports = router;

