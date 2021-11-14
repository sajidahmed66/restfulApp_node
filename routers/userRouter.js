const express = require('express');
const bcrypt = require("bcrypt");
const router = express.Router();
const { User } = require('../models/user');

//creating a new user
const newUser = async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already exists');

    const { name, email, password } = req.body;


    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    //hashing password with bcrypt
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    try {
        const result = await user.save();
        // generate token and send as response
        const token = user.generateAuthToken();
        res.send({
            token: token,
            data: {
                name: user.name,
                email: user.email
            }
        })
    } catch ({ errors }) {
        const errorMesg = [];
        for (field in errors) {
            errorMesg.push(errors[field].message);
        }
        return res.status(400).send(errorMesg);
    }

};

router.route('/')
    .post(newUser);

module.exports = router;