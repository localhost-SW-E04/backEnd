const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Doctor = new Schema({
    name: { type: String, required: true },
    specialisation: { type: String, required: true },
    desc: { type: String }
})
const Bed = new Schema({
    availability: { type: Boolean, required: true },
    type: { type: String, required: true },
    desc: { type: String }
})

const Location = new Schema({
    address: { type: String, required: true },
    pincode: { type: Number, required: true },
    desc: { type: String, required: false }
})
const Hospital = new Schema({
    location: { type: Location, required: true },
    bedsAvailable: { type: Number, required: true },
    bed: { type: [Bed], required: true },
    totalBeds: { type: Number, required: true },
    doctors: { type: [Doctor], required: true },

},
    {
        timestamps: true,
    });
const User = mongoose.model('Hospital', Hospital);
module.exports = User;