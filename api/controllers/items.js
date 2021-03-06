const router = require('express').Router();
const User = require('../models/User');


router.get('/test', (req, res) => {
    console.log("Tester hit!")
    res.send("Hit!");
});

router.post('/from-list', (req, res) => {
    const {user_id, list_id} = req.body;
    User.findOne({_id: user_id}).then(user => {
        if (!user) throw new Error("No user.")

        let list = user.shopping_lists.id(list_id);
        if (!list) throw new Error("No list");
        let listItems = list.items;

        const demoDate = new Date();
        demoDate.setDate(demoDate.getDate() + 6);
        for(let item of listItems) {

            const newItem = {
                "api_id": item.api_id,
                "name": item.name,
                "amount": item.amount,
                "units": item.units,
                "expr_date": demoDate
            };

            user.inventory.push(newItem);
        }
        list.remove();
        user.save();
        res.status(200).json({"msg": "Done"});

    })
    .catch(err => {
        console.log(err);
        res.status(400);
    });
})

// Words
// @route POST
// @body {
//     user_id: {Type: String}
//     api_id: {Type: Number},
//     name: {Type: String },
//     amount: {Type: Number},
//     units: {Type: String},
//     expr_date: {Type: Date}
// }
// @desc  Creates a UserItem based upon supplied info
router.post('/items', (req, res) => {
  
    console.log("Item POST: " + req.body)
    const {api_id, name, amount, units, expr_date} = req.body;

    // Ensure User Exists
    User.findOne({_id: req.body.user_id})
    .then(user => {
      
        // Format data
        // Insert into inventory
        user.inventory.push({
            api_id: api_id,
            name: name,
            amount: amount,
            units: units,
            expr_date: expr_date 
        })
        user.save()
    })
    .then(r => {
        res.status(201).json({msg: "Item successfully added"})
    })
    .catch(err => {
        console.log(err)
        res.status(400).json({msg: "Insert Item Error"})
    });

   // CONSIDER RETURNING ALL OF THE USER'S ITEMS
 
});


// @route GET
// @body {
//     user_id: {Type: Integer},
// }
// @desc  Pulls all of a user's items
router.get('/items', (req, res) => {

    
    console.log("Item GET")
    const { user_id } = req.query;
    // get all items belonging to a certain user id
    User.findOne({_id: user_id})
    .then(user => {
        const inventory = user.inventory;

        res.status(200).json({items: inventory})
    })
    .catch(err => {
        // If it fails, hopefully at worst it will just return an empty array or something of the sort
        console.log(err)
        res.status(400).json({err: err})
    });
});



// @route PATCH
// @body {
//     user_id: {Type: Integer} The user_id,
//     item_id: {Type: ObjectId}
//     amount: {Type: Number},
//     units: {Type: String}
//     expr_date: {Type: Date}
// }
// @desc  Updates an existing user item based upon changed values
// Operates on the assumption that the entry already exists.
router.patch('/items', (req, res) => {
    
    console.log("Item PATCH: " + req.query)

    const {user_id, item_id, amount, units, expr_date} = req.query;

    // Note. In this case the item_id, and user ID
    // And that either a qty will be updated (through usage explicitely) or if the user
    // changes the expiration date.
    User.findOne({_id: user_id})
    .then(user => {
        if(user.inventory.length == 0) 
            throw("Inventory Empty, can't scan");
        
        item = user.inventory.id(item_id);
        if(!item) throw("Item not found.")

        item.amount = amount;
        item.units = units;
        item.expr_date = expr_date;
        /*for(item of user.inventory) {
            if(item._id == item_id) {
                // For now, overwrite everything, even if same
                item.amount = amount;
                item.units = units;
                item.expr_date = expr_date;

            }
        } */
        user.save()
    })
    .then(r => {
        res.status(200).json({msg: "Success!", success: true})
    })
    .catch(err => {
        console.log(err)
        res.status(400).json({err: "Some error has occured.", success: false})
    })
});

// @route DELETE
// @body {
//     user_id: {Type: ObjectId},
//     item_id: {Type: ObjectId}
// }
// @desc  Removes a given user item based upon usage (depletion), or expiration
router.delete('/item', (req, res) => {
    
    console.log("Item DELETE")
    const { user_id, item_id } = req.query;

    User.findOne({_id: user_id})
    .then(user => {
        if (!user) throw new Error("No User Found by that Id");
        let item = user.inventory.id(item_id);
        if (!item) throw new Error("Item not in Inventory");
        item.remove();
        user.save();
    })
    .then(r => {
        res.status(204).json({msg: "Item removed."});
    })
    .catch(err => {
        console.log(err)
        res.status(404).json({msg: "Item not found"});
    })
});



module.exports = router; 