const express = require('express');
const bcrypt = require("bcrypt");
const router = express.Router();
const { User } = require('../models/user');


const authUser = async (req, res) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).send("invalid User or password");

    const validUser = await bcrypt.compare(req.body.password, user.password);

    if (!validUser) return res.status(400).send('Invalid email or password');

    const token = user.generateAuthToken();
    res.send({ token: token, });
};


router.route('/')
    .post(authUser);


module.exports = router;