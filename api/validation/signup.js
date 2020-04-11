const Validator = require("validator");
const isEmpty = require("is-empty");

const hasLowerCase = new RegExp("(?=.*[a-z])")
const hasUpperCase = new RegExp("(?=.*[A-Z])")
const hasNumber = new RegExp("(?=.*[0-9])") // double check to ensure thats right

module.exports = function validateSignupInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    data.phonenumber= !isEmpty(data.phonenumber) ? data.phonenumber: "";

    // Name checks
    if (Validator.isEmpty(data.username)) {
        errors.username = "Username field is required. ";
    } else if (!Validator.isLength(data.username, {min: 6, max: 20})) {
        errors.username = "Username must be between 6 and 20 characters. "
    }

    // Email Checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required. ";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid. ";
    }

    // Password Checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required. ";
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required. ";
    }
    if (!Validator.isLength(data.password, {min: 8, max: 30})) {
        errors.password = " Password must be between 8 and 30 characters.";
    }
    if(!hasLowerCase.test(data.password)) {
        const msg = "Must contain a single lowercase character."
        errors.password = errors.password == undefined ? msg : errors.password += " " + msg;
    }
    if(!hasUpperCase.test(data.password)) {
        const msg = "Must contain a single Uppercase character."
        errors.password = errors.password == undefined ? msg : errors.password += " " + msg;
    }
    if(!hasNumber.test(data.password)) {
        const msg = "Must contain a single Numeric character."
        errors.password = errors.password == undefined ? msg : errors.password += " " + msg;
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }

    // Phonenumber Check
    if (Validator.isEmpty(data.phonenumber)) {
        errors.phonenumber = "Must provide phonenumber."
    } else if (!Validator.isMobilePhone(data.phonenumber)) {
        errors.phonenumber = "Must be a valid phonenumber"
    }
    

    if(!isEmpty(errors)) {
        console.log("One or more problems present with input.")
        console.log(errors)
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};