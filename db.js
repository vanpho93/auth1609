const mongoose = require('mongoose');
const { hash, compare } = require('bcrypt');

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

function signUp(email, password, name, phone) {
    return hash(password, 8)
    .then(encrypted => {
        const user = new User({ email, password: encrypted, name, phone });
        return user.save();
    });
}

User.signUp = signUp;

module.exports = User;
