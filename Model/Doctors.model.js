const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;
const doctordata = new Schema({
    aadharno: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },

},
    {
        timestamps: true,
    });

doctordata.pre('save', async function (next) {
    //console.log('hi');
    if (this.isDirectModified('password' || 'cpassword')) {

        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
        //console.log(this.password);
    }
    next()

});
const User = mongoose.model('doctordata', doctordata);
module.exports = User;