const mongoose = require("mongoose");

let EmailRecordSchema = new mongoose.Schema({
    fName : String,
    lName : String,
    email: String,
    dateTime : String
})

module.exports = mongoose.model("EmailRecordSchema", EmailRecordSchema)