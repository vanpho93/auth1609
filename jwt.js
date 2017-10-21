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

module.exports = { signPromise, verifyPromise };
