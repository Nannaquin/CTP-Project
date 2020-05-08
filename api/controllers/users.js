const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// This is gonna be some Auth heavy stuff

function passwordsMatch(submittedPassword, storedPasswordHash) {
    return bcrypt.compareSync(submittedPassword, storedPasswordHash);
  }

// @route POST
// @body {
//     username: {Type: String},
//     email: {Type: String},
//     password: {Type: String}
//     phonenumber: {Type: String}
//     
// }
// @desc  Creates a user based on the supplied info
router.post('/users', (req, res) => {
    // Sign up kinda already does this. Including error handing, reporting on validation etc

    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phonenumber: req.body.phonenumber,
      })
      .then(user => {
          res.status(200).json({msg: "This shouldn't be called. But it worked?"})
      })
      .catch(err => {
          res.status(400).json({msg: "Whether or not you connecteded, this sint meant do do anything."})
      })
});

// @route PATCH
// @body {
//     id: {Type: integer},
//     password: {Type: String},
//
//     username: {Type: String},
//     email: {Type: String},
//     new_password: {Type: String}
//     phonenumber: {Type: String}
//     
// }
// @desc  Update one or more part of a user's information
router.patch('/users', (req, res) => {
    
    const {password, username, email, new_password, phone_number}  = req.params;
    // if password matches password
    User.findOne({_id: req.body.id})
    .then(user => {
        if(passwordsMatch(password, user.passwordHash)) {
            if(req.body.username) {
                user.username = username;
            }
            if(req.body.email) {
                user.email = email;
            }
            if(req.body.new_password) {
                user.password = new_password;
            }
            if(req.body.phone_number) {
                user.phone_number = phone_number;
            }
        }
        else {
            throw new error("Wrong Password")
        }

        user.save()
    })
    .then(r => {
        res.status(200).json({msg: "Successful Update"})
    })
    .catch(err => {
        if(err = "Wrong Password")  res.status(401).json({msg: err});
        else  res.status(400).json({msg: err});
        
    })
    
});

// @route GET
// @body {
//     id: {Type: integer},
//     
// }
// @desc  Get a users info
router.get('/users/:id', (req, res) => {

    const { id } = req.params;
    // Use ID to pull
    User.findOne({_id: id}) 
    .then(user => {
        console.log(user)
        // === CONCERN ===
        // Is this some kind of security concern? Just taking
        // the id and giving back all but the user's password?
        // In other words, should there be some o- wait nevermind
        const retUser = {
            "id": user._id,
            "username": user.username,
            "email": user.email,
            "phonenumber": user.phone_number
        };

        res.status(200).json({user: retUser});
    })
    .catch(err => {
        res.status(400).json({err: err, msg: "User Info cannot be retrieved."})
    })
});

// @route DELETE
// @body {
//      id: {Type: Integer}
//      password: {Type: String}
// }
// @desc Delete the user's account.
router.delete('/users', (req, res) => {
    const id = req.params.id;
    User.findOne({_id: id})
    .then(user => {
        if(passwordsMatch(req.params.password, user.passwordHash)) { 
            // do something.
        }
    })
    .catch(err => {
        console.log(err)
        res.status(400).json({msg: "Authentication failure or some other"})
    })
});

//




module.exports = router; 