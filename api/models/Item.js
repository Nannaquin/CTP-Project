const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FoodType = require('./FoodType');

// Item.js - Schema for item database
// MUST link the food type thing

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    units: {
        type: String,
        enum: ['kg', 'g', 'lb', 'oz', 'L', "QT", "FL OZ"],
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    types: [ Schema.Types.ObjectId ]
});

module.exports = Item = mongoose.model("items", ItemSchema);