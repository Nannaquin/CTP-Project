const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FoodType = require('./FoodType');

// DietaryRestriction.js - The types of dietary restrictions that exist in the world
// Such as Kosher (or !Kosher in this case), Halal (or !halal), lactose-intolerant, nut-allergy, and so forth.
// Some will easily map to a single kind of item, like Lactose-Intolerant will most likely just map to Dairy products
// !Halal might map to pork AND alcohol.
// Vegetarians will just straight exclude all meat.
// Shellfish allergy excluding various shellfish and what not.

const DietaryRestrictionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    types: [ FoodType ]

});

module.exports = DietaryRestriction = mongoose.model("dietaryrestrictions", DietaryRestrictionSchema);