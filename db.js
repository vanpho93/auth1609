const mongoose = require('mongoose');
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

module.exports = User;

// User.insertMany([
//     { email: 'a@gmail.com', password: '123456', name: 'a b c', phone: '129784871283' },
//     { email: 'b@gmail.com', password: '234567', name: 'a b c', phone: '129784871283' },
// ])

// User.find().then(users => console.log(users));
