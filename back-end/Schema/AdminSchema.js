const mongoose = require("mongoose")
const bcrypt = require('bcryptjs');

let Admin = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    mobileNumber: String,
    address: String,
    password: String,
})



Admin.pre('save', async function(next){

    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
 });

// verify password
Admin.methods.comparePassword = async function(yourPassword){
    return await bcrypt.compare(yourPassword, this.password);
}

module.exports = mongoose.model("Admin", Admin)