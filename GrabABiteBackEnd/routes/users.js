const {User, validateUser} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require("bcrypt");


// get all registered user details
router.get('/getDetails', async (req, res) => {
    const users = await User.find().sort('firstName');
    res.send(users);
});


// get single user details based on email
router.get('/getDetails/:email', async (req, res) => {
    const valEmail = await validateEmail(req.params.email);
    if(!valEmail) return res.status(400).send("Kindly provide valid email id");

    const users = await User.find({email: req.params.email});
    if (users.length == 0) return res.status(401).send("User with the given email id is not present in the system");
    if (users.length>1) return res.status(401).send("Multiple users are present with the given email id in the system");
    const user = await User.findById(users[0].id)

    res.send(user);
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

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  
    try {
        user = await user.save();
        res.send(user);  
        // res.send("User created successfully");    
  
    } catch (error) {
        res.status(400).send(error);
    }
});

// update user details
router.put('/profile/:userId', async (req, res) => {

    const user = await User.findByIdAndUpdate(req.params.userId, {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone:  req.body.phone,
            email: req.body.email,
        }
    }, {
        new: true,
        useFindAndModify: false
    });

    if (!user) return res.status(401).send('User not found');

    // return res.status(204).send('The product updated successfully');
    return res.send(user);

});


// validate user login
router.post('/login', async (req, res) => {

    const valEmail = await validateEmail(req.body.email);
    if(!valEmail) return res.status(400).send("Kindly provide valid email id");
    const users = await User.find({email: req.body.email});
    if (users.length == 0) return res.status(401).send("User with the given email id is not present in the system");
    if (users.length>1) return res.status(401).send("Multiple users are present with the given email id in the system");
    const user = await User.findById(users[0].id);

    const isPasswordValid =
    (await bcrypt.compare(req.body.password, user.password)) ||
    req.body.password == user.password;
    
    //send user details
    
    if (!isPasswordValid) return res.status(400).send("Login failed. Provided email and password do not match.");
   
    else return res.send(user);
});

function validateEmail(paramEmail) {
    const schema = Joi.object().keys({
        email: Joi.string().min(5).email().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).required()
    });

    return schema.validate( { email: paramEmail }, function(err, result) {
        if(err) return null;
        else return paramEmail;
    });

}

module.exports = router;