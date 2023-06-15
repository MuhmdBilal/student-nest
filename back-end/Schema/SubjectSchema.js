const mongoose = require("mongoose")
let Subjects = new mongoose.Schema({
    title : String,
    description: String,
    active: String,
    currentTime: String
})

module.exports = mongoose.model("Subjects", Subjects)