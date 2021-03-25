const express = require('express');
const instructors = require('./routes/instructors');
const favourites = require('./routes/favourites');
const riders = require('./routes/riders');
const auth = require('./routes/auth');
const { connectToDb } = require('./db/mongoConnect');

const app = express();
const port = 3900;

connectToDb();

app.use(express.json());

app.use('/instructors', instructors);
app.use('/riders', riders);
app.use('/favourites', favourites);
app.use('/auth', auth);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
})