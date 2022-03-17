const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    name: { type: String, required: true },
    specialisation: { type: String, required: true },
    aadharno: { type: Number, required: true },
    tags: { type: [String], required: true },
    desc: { type: String },
    password: { type: String }

}, {
    timestamps: true,
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;