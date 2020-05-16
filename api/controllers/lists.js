const router = require('express').Router();
const axios = require('axios');

const User = require('../models/User');



// Retrieve the user's shopping lists.
// Unsafe impl
router.get('/lists', (req, res) => {
    const {user_id} = req.query;

    // Find user
    User.findOne({_id: user_id})
    .then(user => {
        if(!user) throw new Error("User not found");

        const lists = user.shopping_lists;
        res.status(200).json({lists: lists})
    })
    .catch(err => {
        console.log(err);
        res.status(400);
    })
});

// Start or add a list
router.post('/list', (req, res) => {
    const {name, user_id} = req.body;
    console.log(`u_id: ${user_id}`)
    User.findOne({_id: user_id})
    .then(user => {
        //console.log(user)
        if(!user) throw new Error("User not found");

        const newList = {
            name: name
        }
        user.shopping_lists.push(newList);
        user.save()
        console.log("post save)")
        res.status(201).json({msg: "Created"})
        console.log("Shouldnt run?")
    })
    .catch(err => {
        console.log(err);
        res.status(400);
    })
});

// Kill a list (without closing it out)
router.delete('/list', (req, res) => {
   const {user_id, list_id} = req.query;
   User.findOne({_id: user_id})
   .then(user => {
        if(!user) throw new Error("User not found");
        const list = user.shopping_lists.id(list_id);
        if(!list) throw new Error("List not existant");
        list.remove();
        user.save()

   })
   .catch(err => {
       console.log(err);
       res.status(400);
   })
});







module.exports = router;