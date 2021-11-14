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

const User = model('User', userSchema);

exports.User = User;