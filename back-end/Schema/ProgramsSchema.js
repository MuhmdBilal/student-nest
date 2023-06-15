const mongoose = require("mongoose")
let Programs = new mongoose.Schema({
    title : String,
    description: String,
    active: String,
    currentTime: String,
    image: String
})

module.exports = mongoose.model("Programs", Programs)