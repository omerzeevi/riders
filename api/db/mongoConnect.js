const mongoose = require('mongoose');
const { db: { mongoUser, mongoPassword }} = require('../config/secret');

const connectToDb = () => {
  mongoose.connect(`mongodb+srv://${mongoUser}:${mongoPassword}@cluster0.pwx7r.mongodb.net/riders`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('mongo connected');
  });
};

module.exports = { connectToDb };