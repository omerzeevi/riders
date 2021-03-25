const express = require('express');
const bcrypt = require('bcrypt');
const httpCodes = require('http-codes');
const _ = require('lodash');
const { InstructorModel, validateInstructor  } = require('../models/instructorModel');
const { authToken } = require('../middleware/authToken');

const router = express.Router();
const saltRounds = 10;

router.get('/', authToken, async(req, res) => {
  const instructorData = await InstructorModel.find({});  
  res.json(instructorData);
});


router.post('/', async(req, res) => {
  // check for validation user data
  const { error } = validateInstructor(req.body);  
  if (error) { 
    return res.status(httpCodes.BAD_REQUEST).json(error.details)
  };

  // check if the user alredy exists
  const instructorData = await InstructorModel.findOne({ email: req.body.email });
  if (instructorData) { 
    return res.status(httpCodes.CONFLICT).json({ err: 'This user already exists in the system, try to log in'});
  };

  // Password encryption
  const instructor = new InstructorModel(req.body);
  const salt = await bcrypt.genSalt(saltRounds);
  instructor.password = await bcrypt.hash(instructor.password, salt);
  try {
    await instructor.save();
  } catch (error) {
    console.error('cannot save to db', { error })
  };

  // present user data without his password
  res.json(_.pick(instructor,['createdAt','_id',  'name','email']));
});

// update
router.put('/', authToken, (req, res) => {
  const validData = validateInstructor(req.body);
  if (validData.error) {
    return res.status(httpCodes.BAD_REQUEST).json(validData.error.details);
  }

  InstructorModel.updateOne({ _id: req.body._id }, req.body)
  .then(data => {
    res.status(httpCodes.OK).json(data);
  })
  .catch(err => {
    return res.status(httpCodes.BAD_REQUEST).json(err);
  })
});

// delete
router.delete('/:id', authToken, (req, res) => {
  const id = req.params.id;
  InstructorModel.deleteOne({ _id: id })
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    return res.status(httpCodes.NOT_FOUND).json(err);
  })
});

module.exports = router;