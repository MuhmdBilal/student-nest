const mongoose = require("mongoose")
let Schools = new mongoose.Schema({
    title : String,
    description: String,
    active: String,
    currentTime: String
})

module.exports = mongoose.model("Schools", Schools)