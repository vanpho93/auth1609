const mongoose = require('mongoose');
const { hash, compare } = require('bcrypt');
const { signPromise, verifyPromise } = require('./jwt');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, unique: true, trim: true, minlength: 5, required: true },
    password: { type: String, trim: true, minlength: 6, required: true },
    name: { type: String, trim: true, minlength: 1, required: true },
    phone: { type: String, trim: true, minlength: 8 }
});

const User = mongoose.model('user', UserSchema);

mongoose.connect('mongodb://localhost/rn1609', { useMongoClient: true });

User.signUp = async function(email, password, name, phone) {
    const encrypted = await hash(password, 8);
    const user = new User({ email, password: encrypted, name, phone });
    return user.save();
}

User.signIn = async function (email, password) {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Email is not exist.');
    const same = await compare(password, user.password);
    if (!same) throw new Error('Password is incorrect');
    const token = await signPromise({ email, name: user.name });
    return token;
}

User.checkToken = async function (oldToken) {
   const obj = await verifyPromise(oldToken);
   const newToken = await signPromise(obj);
   return newToken;
}

module.exports = User;

// User.signIn('z@gmail.com', '1232456').then(token => console.log(token));

// User.checkToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InpAZ21haWwuY29tIiwibmFtZSI6Ik5hbSIsImlhdCI6MTUwODU2OTE2NywiZXhwIjoxNTA4NTcyNzY3fQ.84Lo4xZa7lhd8G61nS6cbk0iuJwae3qO-f5RlorJj4w')
// .then(token => console.log(token));
