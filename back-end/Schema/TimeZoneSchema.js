const mongoose = require("mongoose")
let TimeZone = new mongoose.Schema({
    timezone : String,
    
})

module.exports = mongoose.model("TimeZone", TimeZone)