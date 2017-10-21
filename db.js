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
}

module.exports = User;
