const mongoose = require("mongoose")

let Agency = new mongoose.Schema({
    title : String,
    description: String,
    active: String,
    currentTime: String
})

module.exports = mongoose.model("Agency", Agency)