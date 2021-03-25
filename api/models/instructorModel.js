const mongoose = require('mongoose');
const Joi = require('joi');

const instructorSchema = new mongoose.Schema({
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
    createdAt: {
        type:Date, default:Date.now()
    }
});

exports.InstructorModel = mongoose.model('instructors', instructorSchema);

exports.validateInstructor = (_instructor) => {
    const schema = Joi.object({
        _id: Joi.any(),    
        name: Joi.string().min(2).max(255).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required()
    });

    return schema.validate(_instructor);
}