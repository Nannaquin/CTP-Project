const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// User.js - The user schema for mongoose. 

const HeldItemSchema = new Schema({
    api_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    units: {
        type: String,
        required: true
    },
    date_added: {
        type: Date,
        default: Date.now
    },
    expr_date: {
        type: Date,
        required: true
    }
})


// Shmake Schemo
const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "You need to put a user name, between 6 and 20 characters."],
        minlength: [6, "At least 6 characters, please."],
        maxlength: [20, "At most 20 characters, if you need that much even."]
    },
    password: {
        type: String,
        required: true
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    auth_token: {
        type: String,
        required: true
    },
    inventory: [ ]
    
});

// Works. NEVER use arrow notation for Middleware Hooks. It doesn't work for some reason
UserSchema.pre('save', function(next) {
    if(this.isNew && this.password) {
        this.password = bcrypt.hashSync(this.password, 10);
    }
    next();
});
module.exports = User = mongoose.model("users", UserSchema);
