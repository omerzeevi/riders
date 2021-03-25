const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/secret')
const httpCodes = require('http-codes');
const { RiderModel } = require('../models/riderModel');

let router = express.Router();

router.post("/", async(req,res) => {
  // check for errors at the login 
  const { error } = validLoginRider(req.body);
  if (error) {
      return res.status(httpCodes.UNAUTHORIZED).json(error.details);
  }
  // check if the email is valid  
  const rider = await RiderModel.findOne({ email: req.body.email });
  if (!rider) {
      return res.status(httpCodes.NOT_FOUND).json({ message: 'Invalid email or password' });
  }
  // check if the password is valid  
  const validRiderPassword = await bcrypt.compare(req.body.password, rider.password);
  if (!validRiderPassword) {
      return res.status(httpCodes.NOT_FOUND).json({ message: 'Invalid email or password' });
  }

  res.json({ token: generateToken(rider._id) });
});

// create token
const generateToken = (_id) => {
    const token = jwt.sign({ _id:_id }, config.jwt.JWTSecretKey, { expiresIn: "60mins" });
    return token;
};

const validLoginRider = (_riderBody) => {
    let schema = Joi.object({
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required()
  });

    return schema.validate(_riderBody);
};

module.exports = router;