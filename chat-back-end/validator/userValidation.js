const validator = require('validator');

const registerValidation = (requestData) => {
    const { name, email, password } = requestData;
    const errors = {};

    if (!email || validator.isEmpty(email)) {
        errors.email = "Email is required";
    } else if (!validator.isEmail(email)) {
        errors.email = "Please provide a valid email address";
    }

    if (!name || validator.isEmpty(name)) {
        errors.name = "Name is required";
    }

    if (!password || validator.isEmpty(password)) {
        errors.password = "Password is required";
    }

    return errors;
};


const loginValidator = (reqData) => {
    const { email, password } = reqData;
    const errors = {};

    if (!email || validator.isEmpty(email)) {
        errors.email = "Email is required";
    }

    if (!password || validator.isEmpty(password)) {
        errors.password = "Password is required";
    }

    return errors;

}

module.exports = { registerValidation, loginValidator };
