const mongoose = require('mongoose');
const Joi = require('joi');

const riderSchema = new mongoose.Schema({
    name: {
        type: String,
        requierd: true,
        minLength: 2,
        maxLength: 255
    },
    email: {
        type: String,
        requierd: true,
        minLength: 6,
        maxLength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    favorites: Array,
    createdAt: {
        type:Date, default:Date.now()
    }
});

exports.RiderModel = mongoose.model('riders', riderSchema);

exports.validateRider = (_rider) => {
    const schema = Joi.object({
        _id: Joi.any(),    
        name: Joi.string().min(2).max(255).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required()
  });

    return schema.validate(_rider);
};

// add to favourites
exports.validFavsRider = (_arFavs) => {
    const schema = Joi.object({
        instructorId: Joi.string().min(5).required()
    });
    return schema.validate(_arFavs);
};