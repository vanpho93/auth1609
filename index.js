const express = require('express');
const jsonParser = require('body-parser').json();
const { hash, compare } = require('bcrypt');
const User = require('./db');

const app = express();

app.get('/', (req, res) => {
    User.find()
    .then(users => res.send(users));
});

app.post('/signup', jsonParser, (req, res) => {
    const { email, password, name, phone } = req.body;
    User.signUp(email, password, name, phone)
    .then(() => res.send({ message: 'OK' }))
    .catch(err => res.send({ error: err.message }));
});

app.post('/signin', jsonParser, (req, res) => {
    const { email, password } = req.body;
    User.signIn(email, password)
    .then(userObj => res.send(userObj))
    .catch(err => res.send({ error: err.message }));
});

app.post('/check', jsonParser, (req, res) => {
    const { token } = req.body;
    User.checkToken(token)
    .then(newToken => res.send({ token: newToken }))
    .catch(err => res.send({ error: err.message }));
});

app.post('/renew', jsonParser, (req, res) => {
    const { token } = req.body;
    User.checkToken(token)
    .then(newToken => res.send({ token: newToken }))
    .catch(err => res.send({ error: err.message }));
});

app.listen(3000, () => console.log('Server started'));
