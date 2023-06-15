const mongoose = require("mongoose")
let Language = new mongoose.Schema({
    language : String,
    
})

module.exports = mongoose.model("Language", Language)