const {Restaurant, validateRestaurant} = require('../models/restaurant');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

// get all restaurants details
router.get('/getDetails', async (req, res) => {
    const restaurants = await Restaurant.find().sort('resName');
    res.send(restaurants);
});

// get all restaurants details by city
router.get('/getDetails/:city', async (req, res) => {

    let citName = req.params.city;
    let cityNameArr = citName.split(" ");
    let cityPartA;
    let cityPartB;
    let finalCityName;

    if(cityNameArr.length>1){
        cityPartA = camelSentence(cityNameArr[0]);
        cityPartB = camelSentence(cityNameArr[1]);
        finalCityName = cityPartA + " " + cityPartB;    
    }
    else{
        finalCityName = camelSentence(cityNameArr[0]);
    }
 
    function camelSentence(str) {
        return  (" " + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function(match, chr)
        {
            return chr.toUpperCase();
        });
    }   

    const restaurants = await Restaurant.find({"resAddress.city": finalCityName})
                                        .sort('resName');
    res.send(restaurants);
});

//get restaurant menu
router.get('/getDetails/:resName/menu', async (req, res) => {
    const restaurants = await Restaurant.findOne({resName: req.params.resName});
    res.send(restaurants.resMenu);
});

//get restaurant images
router.get('/getDetails/:resName/images', async (req, res) => {
    const restaurants = await Restaurant.findOne({resName: req.params.resName});
    res.send(restaurants.resPics);
});


// save the user details in db
router.post('/register', async (req, res) => {
    const { error } = validateRestaurant(req.body);
    if (error) return res.status(400).send(error.details[0].message);
                        
    let restaurant = new Restaurant ({ 
        resName: req.body.resName,
        resAddress:{
            street: req.body.resAddress.street,
            city: req.body.resAddress.city,
            state: req.body.resAddress.state,
            zip: req.body.resAddress.zip,
            country: req.body.resAddress.country
        }, 
        resContact:{
            phone:  req.body.resContact.phone,
            email: req.body.resContact.email    
        },
        resType: req.body.resType,
        resCusine: req.body.resCusine,
        resAvgPrice: req.body.resAvgPrice,
        resRatings: req.body.resRatings,
        resFeatures: req.body.resFeatures,
        resTimings:{
            open: req.body.resTimings.open,
            close: req.body.resTimings.close,
        },
        resMenu: req.body.resMenu,
        resPics: req.body.resPics
    });

    try{
        restaurant = await restaurant.save();
        res.send(restaurant);
        // res.send("Restaurant created successfully");
    } catch(err){
        res.send(err.message);
    }
});

module.exports = router;