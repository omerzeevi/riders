const express = require('express');
const httpCodes = require('http-codes');
const _ = require('lodash');
const { RiderModel, validateRider, validFavsRider  } = require('../models/riderModel');
const { authToken } = require('../middleware/authToken');
const { InstructorModel } = require('../models/instructorModel');
const { getEncryptedPassword } = require('../helpers/password');

const router = express.Router();

// sign in
router.get('/me', authToken, async(req, res) => {
  const riderData = await RiderModel.findOne({ _id: req.userContext }, { password: 0 });  
  res.json(riderData);
});

// sign up
router.post('/', async(req, res) => {
  // check for validation user data
  const { error } = validateRider(req.body);  
  if (error) { 
    return res.status(httpCodes.BAD_REQUEST).json(error.details)
  };
  // check if the rider already exists
  const riderData = await RiderModel.findOne({ email: req.body.email });
  if (riderData) { 
    return res.status(httpCodes.CONFLICT).json({ err: 'This rider already exists in the system, try to log in'})
  };
  // Password encryption
  const rider = new RiderModel(req.body);
  rider.password = await getEncryptedPassword(rider.password);
  try {
    await rider.save();
  } catch (error) {
    console.error('cannot save to db', { error })
  };

  res.json(_.pick(rider,['createdAt', '_id', 'name', 'email']));
});

// update rider
router.put('/', authToken, async (req, res) => {
  const validData = validateRider(req.body);
  if (validData.error) {
    return res.status(httpCodes.BAD_REQUEST).json(validData.error.details);
  }

  try {
    const encryptedPassword = await getEncryptedPassword(req.body.password);
    const riderWithEncryptedPassword = Object.assign({}, req.body, { password: encryptedPassword });
    const riderData = await RiderModel.updateOne({ _id: req.body._id }, riderWithEncryptedPassword);
    res.status(httpCodes.OK).json(riderData);
  } catch(err) {
    return res.status(httpCodes.BAD_REQUEST).json(err);
  }
});

// add favorites
router.put('/addFav', authToken, async(req, res) => {
  // validate request body - joi
  const validBody = validFavsRider(req.body);
  if (validBody.error) {
    return res.status(httpCodes.BAD_REQUEST).json(validBody.error.details);
  }

  try {
    // validate instructor id - get instructor from db, if not exists send 400
    const instructor = await InstructorModel.findOne({ _id: req.body.instructorId });
    if (!instructor) {
      return res.status(httpCodes.NOT_FOUND).json({ err: 'This instructor does not  exists' });
    }  
    // validate rider id - get rider from db, if not exists send 404
    const rider = await RiderModel.findOne({ _id: req.userContext._id });
    if (!rider) {
      return res.status(httpCodes.NOT_FOUND).json({ err: 'This rider does not exists' });
    }
    // check if id already exists in favourites array return 400
    const temp_arr = rider.favorites;
    if (temp_arr.includes(req.body.instructorId)) {
      return res.status(httpCodes.BAD_REQUEST).json({ err: 'Instructor already on favorites list' });
    }
    // add id into favorites - push
    temp_arr.push(req.body.instructorId);
    // update rider
    const updatedRider = await RiderModel.updateOne({ _id: req.userContext._id }, {   favorites: temp_arr });
    // return res
    res.json(updatedRider);
  } catch (err) {
    res.status(httpCodes.INTERNAL_SERVER_ERROR).json({ err: 'Oops, Something went wrong' });
  }
});

// remove favorites
router.put('/removeFav', authToken, async(req, res) => {
  // validate request body - joi
  const validBody = validFavsRider(req.body);
  if (validBody.error) {
    return res.status(httpCodes.BAD_REQUEST).json(validBody.error.details);
  }

  try {
    // validate rider id - get rider from db, if not exists send 404
    const rider = await RiderModel.findOne({ _id: req.userContext._id });
    if (!rider) {
      return res.status(httpCodes.NOT_FOUND).json({ err: 'This rider does not exists' });
    }
    // check if id does not exists on favorites array return 400
    const temp_arr = rider.favorites;
    if (!temp_arr.includes(req.body.instructorId)) {
      return res.status(httpCodes.BAD_REQUEST).json({ err: 'Instructor is not on favorites list' });
    }
    // remove id from favorites - splice
    temp_arr.splice(temp_arr.indexOf(req.body.instructorId),1);
    // update rider
    const updatedRider = await RiderModel.updateOne({ _id: req.userContext._id }, {   favorites: temp_arr });
    // return res
    res.json(updatedRider);
  } catch (err) {
    res.status(httpCodes.INTERNAL_SERVER_ERROR).json({ err: 'Oops, Something went wrong' });
  }
});

// delete rider
router.delete('/:id', authToken, async(req, res) => {
  let delData;
  const id = req.params.id;

  try {
    delData = await RiderModel.deleteOne({ _id: id });
  } 
  catch(err) {
    return res.status(httpCodes.NOT_FOUND).json(err);
  }

  res.json(delData);
});

module.exports = router;