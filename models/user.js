const jwt = require('jsonwebtoken');
const { Schema, model } = require('mongoose');


const userSchema = Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 15,
    },
    email: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    }
});

//jwt token method
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_KEY);
    return token;
};

const User = model('User', userSchema);

exports.User = User;