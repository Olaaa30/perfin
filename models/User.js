const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum:['instructor', 'student', 'admin'], default: 'student' },
    password: { type: String, required: true },
    gender: { type: String, enum:['male, female']},
    profilePicture: { type: String },
    createdAt: { type: Date, default: Date.now },
    udpatedAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function (next){
    if (!this.isModified('password')) return next;
    this.password =  await bcrypt.hash(this.password, 12);
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;