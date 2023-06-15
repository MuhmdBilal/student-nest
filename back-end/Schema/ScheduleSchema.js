const mongoose = require("mongoose")

let Schedule = new mongoose.Schema({
    ids : String,
    mondayStartTime: String,
    mondayEndTime: String,
    tuesdayStartTime: String,
    tuesdayEndTime: String,
    wednesdayStartTime: String,
    wednesdayEndTime: String,
    thursdayStartTime: String,
    thursdayEndTime: String,
    fridayStartTime: String,
    fridayEndTime: String,
    saturdayStartTime: String,
    saturdayEndTime: String,
    sundayStartTime: String,
    sundayEndTime: String,
    

})

module.exports = mongoose.model("Schedule", Schedule)