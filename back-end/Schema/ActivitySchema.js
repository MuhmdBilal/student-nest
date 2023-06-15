const mongoose = require("mongoose");

let activitySchema = new mongoose.Schema({
    First_Name : String,
    Last_Name : String,
    dateTime : String,
    status: String
})

module.exports = mongoose.model("activitySchema", activitySchema)