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
    User.findOne({_id: user_id})
    .then(user => {
        if(!user) throw new Error("User not found");

        const newList = {
            name: name
        }
        user.shopping_lists.push(newList);
        user.save()
        res.status(201).json({msg: "Created"});
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

        res.status(200).json({msg:"deleted"});

   })
   .catch(err => {
       console.log(err);
       res.status(400);
   })
});

// @route POST
// @body {
//     user_id: {Type: String},
//     list_id: {Type: String}
//     api_id: {Type: Number},
//     name: {Type: String },
//     amount: {Type: Number},
//     units: {Type: String},
// }
// @desc  Creates a list item in the specified list
router.post('/item', (req, res) => {
    const {user_id, list_id, api_id, name, amount, units} = req.body;
    User.findOne({_id: user_id})
    .then(user => {
        if (!user) throw new Error("User Not Found");
        let shoppingList = user.shopping_lists.id(list_id);
        if (!shoppingList) throw new Error ("List Not Found");

        console.log(shoppingList);

        const newListItem = {
            api_id: api_id,
            name: name,
            amount: amount,
            units: units
        };


        shoppingList.items.push(newListItem);

        // shoppingList.save(); // If without doesnt work, uncomment.
        user.save();
        res.status(200).json({msg: "item added"})

        // Make an addition and save it.
    })
    .catch(err => {
        console.log(err);
        res.status(400);
    })

});

// @route DELETE
// @body {
//     user_id: {Type: String},
//     list_id: {Type: String},
//     item_id: {Type: String}
//     
// }
// @desc  Delete an item from a user's shopping list
router.delete('/item', (req, res) => {

    const {user_id, list_id, item_id} = req.query;
    User.findOne({_id: user_id})
    .then(user => {
        if (!user) throw new Error("User Not Found");
        let shoppingList = user.shopping_lists.id(list_id);
        if (!shoppingList) throw new Error ("List Not Found");

        console.log(shoppingList);

        let item = shoppingList.items.id(item_id);
        if (!item) throw new Error ("Item Not Found"); 
        item.remove();


 

        // shoppingList.save(); // If without doesnt work, uncomment.
        user.save();
        res.status(200).json({msg: "item removed"});

    })
    .catch(err => {
        console.log(err);
        res.status(400);
    })
})




module.exports = router;