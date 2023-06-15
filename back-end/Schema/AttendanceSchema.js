const mongoose = require('mongoose')

let Attendance_Report = new mongoose.Schema({
    Teacher_Id:  String,
    Pragram_Value : String,
    Report_Value: String,
    date: String,
    student_Name: String,
    Grade : String,
    tutor_Name: String,
    tutoring_Start_Date: String,
    project_End_Date: String,
    caregiver_Name : String,
    caregiver_Telephone_Number: String,
    Previous_Hours_Tutored: String,
    hoursTutoredThisMonth: String,
    image: String,
    program: String,
    Attendance_value : [
        {
            Date: String,
            Start_Time: String,
            End_Time: String,
            Hours: String,
            Goal_from_SLP: String
        }
    ]
})


module.exports = mongoose.model("Attendance_Report", Attendance_Report)