const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// FoodType.js - the type of an ingredient - e.g. dairy, nuts, wheat, pork-based, etc

const FoodTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = FoodType = mongoose.model("foodtypes", FoodTypeSchema);