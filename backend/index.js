const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('./cors')(app)

const users = require('./routes/users');

mongoose.connect('mongodb://localhost/grabABite')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use('/user', users);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));