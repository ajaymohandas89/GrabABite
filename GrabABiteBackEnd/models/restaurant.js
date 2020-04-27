const mongoose = require('mongoose');
const Joi = require('joi');

const Restaurant = mongoose.model('Restaurant', new mongoose.Schema({
    resName:{
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 30,
        trim: true
    },
    resAddress:{
        street:{ 
            type: String,
            required: true
        },
        city:{ 
            type: String,
            required: true
        },
        state:{ 
            type: String,
            required: true
        },
        zip:{ 
            type: Number,
            required: true
        },
        country:{ 
            type: String,
            required: true
        }
    },
    resContact:{
        phone:{
            type: Number, 
            required: true,
            minlength: 10,
            maxlength: 15    
        },
        email:{
            type: String, 
            required: true,
            minlength: 5,
            maxlength: 30,
            trim: true    
        }
    },
    resType:{
        type: [String],
        enum:['Fine Dining', 'Cafe', 'Pubs', 'Sports Bar']
    },
    resCusine:{
        type: [String],
        enum:['Indian', 'Japanese', 'Thai', 'Mexican', 'Italian', 'Chinese', 'American',
                'Lebanese', 'Mediterranean', 'Greek']
    },
    resAvgPrice:{ 
        type: Number,
        required: true
     },
    resRatings:{ 
        type: Number,
        required: true
     },
    resFeatures:{
        type: [String],
        enum: ['Wifi', 'Outdoor Seating', 'Happy Hour', 'Pet Friendly', 'Alcohol Served', 'Live Music']
    },
    resTimings:{
        open: {
            type: String,
            validate: {
                validator: function(timeInStr) {
                    return validateTime(timeInStr) },
                message: "Invalid restaurant open time"
            }
        },
        close: {
            type: String,
            validate:{
                validator: function(timeInStr) {
                    return validateTime(timeInStr) },
                message: "Invalid restaurant close time"
            }
        }
    },
    resMenu: [String],
    resPics: [String]
}));

function validateRestaurant(restaurant) {
    const schema = {
        resName: Joi.string().min(5).max(30).required(),
        resAddress: {
            street: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            zip: Joi.number().required(),
            country: Joi.string().required()
        },
        resContact: {
            phone: Joi.number().required(),
            email: Joi.string().required()
        },
        resType: Joi.array().items(Joi.array()
                    .valid('Fine Dining', 'Cafe', 'Pubs', 'Sports Bar')).min(1).required()
                    .error(() => { return {
                        message: 'Provided "resType" is not a valid value'}
                    }),
        resCusine: Joi.array().items(Joi.array()
                    .valid('Indian', 'Japanese', 'Thai', 'Mexican', 'Italian', 
                    'Chinese', 'American', 'Lebanese', 'Mediterranean', 'Greek'))
                    .min(1).required().error(() => { return { 
                    message: 'Provided "resCusine" is not a valid value' }}),
        resAvgPrice: Joi.number().required(),
        resRatings: Joi.number().required(),
        resFeatures: Joi.array().items(Joi.array()
                    .valid('Wifi', 'Outdoor Seating', 'Happy Hour', 'Pet Friendly', 
                    'Alcohol Served', 'Live Music')).min(1).required()
                    .error(() => { return {message: 'Provided "resFeatures" is not a valid value'}}),
        resTimings: {
            open: Joi.string().required(),
            close: Joi.string().required()
        },
        resMenu: Joi.array(),
        resPics: Joi.array()
    };
    return Joi.validate(restaurant, schema);
  }

function validateTime(timeInStr){
    timeInArr =  timeInStr.split(":");
    hrTime = parseInt(timeInArr[0]);
    minTime = parseInt(timeInArr[1]);
    return( (hrTime >= 0 && hrTime <= 23) && (minTime >= 0 && minTime <= 59) );
} 

exports.Restaurant = Restaurant;
exports.validateRestaurant = validateRestaurant;