const { verify, sign } = require('jsonwebtoken');

const KEY = 'iq2y72ydhq274ysan!!dDsa#';

function signPromise(obj) {
    return new Promise((resolve, reject) => {
        sign(obj, KEY, { expiresIn: '1h' }, (err, token) => {
            if (err) return reject(err);
            resolve(token);
        });
    });
}

function verifyPromise(token) {
    return new Promise((resolve, reject) => {
        verify(token, KEY, (err, obj) => {
            if (err) return reject(err);
            delete obj.iat;
            delete obj.exp;
            resolve(obj);
        });
    });
}

// signPromise({ email: 'abcd', password: 'def' })
// .then(token => console.log(token));

// verifyPromise('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY2QiLCJwYXNzd29yZCI6ImRlZiIsImlhdCI6MTUwODU2MDk5MywiZXhwIjoxNTA4NTY0NTkzfQ.SB9Z0ZlUc1HSpAFOTijkoXcCvfRqhbE3VO6_BabQMnA')
// .then(obj => console.log(obj));
