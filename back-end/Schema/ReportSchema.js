const mongoose = require("mongoose")


const reportData =new mongoose.Schema({
    Teacher_Id:  String,
    Pragram_Value : String,
    Report_Value: String,
    student_Name: String,
    tutoring_Start_Date: String,
    tutor_Name: String,
    telephone_Number : String,
    date : String,
    tutoring_Agency: String, 
    image: String,
    program: String,
    Task_One: [
        {
            Goal: String,
            description: String,
            group1: String
        }
    ],
    Task_Two: [
        {
            Goal: String,
            description: String,
            group1: String
        }
    ],
    Task_Three: [
        {
            Goal: String,
            description: String,
            group1: String
        }
    ],
    Task_Four: [
        {
            Goal: String,
            description: String,
            group1: String
        }
    ],
    Task_Five: [
        {
            Goal: String,
            description: String,
            group1: String
        }
    ],
    
})


module.exports = mongoose.model("reportData", reportData)