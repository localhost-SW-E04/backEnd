const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Hospital = new Schema({
    id: { type: Number, required: true },
    tob: { type: String, required: true },
})
const userSchema = new Schema({
    aadharno: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    hospitalbooked: { type: Hospital, required: false },
    doctorid: { type: String, required: false }

}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;