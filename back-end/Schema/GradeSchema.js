const mongoose = require("mongoose")
let Grades = new mongoose.Schema({
    title : String,
    description: String,
    active: String,
    currentTime: String
})

module.exports = mongoose.model("Grades", Grades)