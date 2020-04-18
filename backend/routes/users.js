const {User, validateUser} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

// get all registered user details
router.get('/getDetails', async (req, res) => {
    const users = await User.find().sort('firstName');
    res.send(users);
});


// get single user details based on email
router.get('/getDetails/:email', async (req, res) => {
    validateEmail(req.params.email, res);

    const users = await User.find({email: req.params.email});
    if (users.length == 0) return res.status(401).send("User with the given email id is not present in the system");
    if (users.length>1) return res.status(401).send("Multiple users are present with the given email id in the system");
    const user = await User.findById(users[0].id)

    res.send(users);
});

// save the user details in db
router.post('/register', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let existingUser = await User.findOne({email: req.body.email});
    if(existingUser) return res.status(401)
                    .send('An existing user is already present with the ' + 
                        'given email id. Kindly provide different email.');
    
    existingUser = await User.findOne({phone: req.body.phone});
    if(existingUser) return res.status(401)
                    .send('An existing user is already present with the ' + 
                        'given phone number. Kindly provide different phone number.');
                        
    let user = new User ({ 
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone:  req.body.phone,
        email: req.body.email,
        password: req.body.password,
    });
    user = await user.save();
    // res.send("User created successfully");
    res.send(user);
});

function validateEmail(paramEmail, res) {
    const schema = Joi.object().keys({
        email: Joi.string().min(5).email().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).required()
    });

    schema.validate( { email: paramEmail }, function(err, result) {
        if(err) return res.status(400).send("Kindly provide valid email id");
    });
}

module.exports = router;