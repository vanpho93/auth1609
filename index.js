const express = require('express');
const jsonParser = require('body-parser').json();
const User = require('./db');

const app = express();

app.get('/', (req, res) => {
    User.find()
    .then(users => res.send(users));
});

app.listen(3000, () => console.log('Server started'));
