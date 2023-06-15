const express = require("express");
const multer = require("multer");
const app = express()
const cors = require('cors')
require("./config/config")
app.use(express.json())
app.use(cors())
const https = require('https');
var fs = require('fs')
const sendEmail = require("./sendEmail.js");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const Mailgen = require('mailgen');
require("dotenv").config();
const path = require('path');
const options = {
    key: fs.readFileSync('/etc/ssl/private/rktutoring.key'),
    cert: fs.readFileSync('/etc/ssl/certs/rktutoring_com.crt')
};

const bcrypt = require('bcryptjs');

// ........................Agency data add .......................//
const Agency = require("./Schema/AgencySchema")
app.post("/agency", async (req, res) => {
    try {
        let agencies = new Agency(req.body)
        let result = await agencies.save();
        res.send(result);
    } catch (e) {
        console.log("e", e);
    }
})

// get Agency data
app.get("/agency", async (req, res) => {
    try {
        let agencyData = await Agency.find().collation({ locale: "en" }).sort({ title: 1 })
        if (agencyData.length) {
            res.send(agencyData)
        } else {
            res.send({ result: "No agency Data Found" })
        }
    } catch (e) {
        console.log("e", e);
    }

})

// delete Agency data
app.put("/ageny_data_delete/:id", async (req, res) => {
    try {
        let result = await Agency.updateOne({ _id: req.params.id }, {
            $set: req.body
        })
        res.send(result)
    } catch (e) {
        console.log("e", e);
    }
})

// Find Single Agency Data
app.get("/single_person_agency_data/:id", async (req, res) => {
    try {
        let result = await Agency.findOne({ _id: req.params.id })
        res.send(result);
    } catch (e) {
        console.log("e", e);
    }

})

//  Update Agency Data 
app.put("/update_single_person_agency_data/:id", async (req, res) => {
    try {
        let result = await Agency.updateOne(
            { _id: req.params.id },
            {
                $set: req.body
            })
        res.send(result)
    } catch (e) {
        console.log("e", e);
    }
})

//  Delete Agency data 
app.delete("/parmanently_Delete_Agency/:id", async (req, res) => {
    try {
        let result = await Agency.deleteOne({ _id: req.params.id })
        res.send(result)
    } catch (e) {
        console.log("e", e);
    }
})


// ........................Programs data add .......................//
const Programs = require("./Schema/ProgramsSchema")

//Iamge Upload
var image;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./image/");
  },
  filename: function (req, file, cb) {
    image = file.fieldname + "-" + Date.now() +  ".png"
    cb(null, image);
  },
});
console.log("image", image);
const upload = multer({ storage: storage }).single("image");
app.post("/Repeat_Logo", (req, res)=>{
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(500).json(err);
        } else if (err) {
          return res.status(500).json(err);
        }
        
        return res.status(200).send(req.file);
      });
})
app.use('/image', express.static(path.join(__dirname, '/image')));
//post program data 
app.post("/programs", async (req, res) => {
    try {
        // console.log(req.body);
        let {active,title, description,currentTime } = req.body
        let array = {active,title, description,currentTime, image}
        let Program = new Programs(array)
        let result = await Program.save();
        res.send(result);
    } catch (e) {
        console.log("e", e);
    }
})
// get programs data
app.get("/programs", async (req, res) => {
    try {
        let agencyData = await Programs.find().collation({ locale: "en" }).sort({ title: 1 })
        if (agencyData.length) {
            res.send(agencyData)
        } else {
            res.send({ result: "No agency Data Found" })
        }
    } catch (e) {
        console.log("e", e);
    }
})

// delete programs data
app.put("/programs_data_delete/:id", async (req, res) => {
    try {
        let result = await Programs.updateOne({ _id: req.params.id },
            {
                $set: req.body
            })
        res.send(result)
    } catch (e) {
        console.log("e", e);
    }
})

// Find Single programs Data
app.get("/single_person_programs_data/:id", async (req, res) => {
    try {
        let result = await Programs.findOne({ _id: req.params.id })
        res.send(result);
    } catch (e) {
        console.log("e", e);
    }
})

//  Update programs Data 
app.put("/update_single_person_programs_data/:id", async (req, res) => {
    try {
        // console.log(req.body);
        let {active,title, description,currentTime } = req.body
        let array = {active,title, description,currentTime, image}
        let result = await Programs.updateOne(
            { _id: req.params.id },
            {
                $set: array
            })
        res.send(result)
    } catch (e) {
        console.log("e", e);
    }
})
//  Delete program data 
app.delete("/parmanently_Delete_Program/:id", async (req, res) => {
    try {
        let result = await Programs.deleteOne({ _id: req.params.id })
        res.send(result)
    } catch (e) {
        console.log("e", e);
    }
})
// ........................Schools data add .......................//
const Schools = require("./Schema/SchoolSchema")

// post school data
app.post("/schools", async (req, res) => {
    try {
        let school = new Schools(req.body)
        let result = await school.save();
        res.send(result);
    } catch (e) {
        console.log("e", e);
    }
})
// get Schools data
app.get("/schools", async (req, res) => {
    try {
        let school = await Schools.find().collation({ locale: "en" }).sort({ title: 1 })
        if (school.length) {
            res.send(school)
        } else {
            res.send({ result: "No agency Data Found" })
        }
    } catch (e) {
        console.log("e", e);
    }
})

// delete Schools data
app.put("/schools_data_delete/:id", async (req, res) => {
    try {
        let result = await Schools.updateOne({ _id: req.params.id },
            {
                $set: req.body
            })
        res.send(result)
    } catch (e) {
        console.log("e", e);
    }
})

// Find Single Schools Data
app.get("/single_person_schools_data/:id", async (req, res) => {
    try {
        let result = await Schools.findOne({ _id: req.params.id })
        res.send(result);
    } catch (e) {
        console.log("e", e);
    }
})

//  Update Schools Data 
app.put("/update_single_person_schools_data/:id", async (req, res) => {
    try {
        let result = await Schools.updateOne(
            { _id: req.params.id },
            {
                $set: req.body
            })
        res.send(result)
    } catch (e) {
        console.log("e", e);
    }
})
//  Delete School data 
app.delete("/parmanently_Delete_School/:id", async (req, res) => {
    try {
        let result = await Schools.deleteOne({ _id: req.params.id })
        res.send(result)
    } catch (e) {
        console.log("e", e);
    }
})

// ........................Grade data add .......................//
const Grades = require("./Schema/GradeSchema");

//post grade data
app.post("/grades", async (req, res) => {
    try {
        let school = new Grades(req.body)
        let result = await school.save();
        res.send(result);
    } catch (e) {
        console.log("e", e);
    }
})
// get grades data
app.get("/grades", async (req, res) => {
    try {
        let school = await Grades.find().sort({ title: 1 }).collation({ locale: "en_US", numericOrdering: true })
        if (school.length) {
            res.send(school)
        } else {
            res.send({ result: "No agency Data Found" })
        }
    } catch (e) {
        console.log("e", e);
    }
})

// delete grades data
app.put("/grades_data_delete/:id", async (req, res) => {
    try {
        let result = await Grades.updateOne({ _id: req.params.id },
            {
                $set: req.body
            })
        res.send(result)
    } catch (e) {
        console.log("e", e);
    }

})

// Find Single grades Data
app.get("/single_person_grades_data/:id", async (req, res) => {
    try {
        let result = await Grades.findOne({ _id: req.params.id })
        res.send(result);
    } catch (e) {
        console.log("e", e);
    }

})

//  Update grades Data 
app.put("/update_single_person_grades_data/:id", async (req, res) => {
    try {
        let result = await Grades.updateOne(
            { _id: req.params.id },
            {
                $set: req.body
            })
        res.send(result)
    } catch (e) {
        console.log("e", e);
    }

})
//  Delete Grade data 
app.delete("/parmanently_Delete_Grade/:id", async (req, res) => {
    try {
        let result = await Grades.deleteOne({ _id: req.params.id })
        res.send(result)
    } catch (e) {
        console.log("e", e);
    }
})

// ........................Subjects data add .......................//
const Subjects = require('./Schema/SubjectSchema')

// post subject data
app.post("/subjects", async (req, res) => {
    try {
        let school = new Subjects(req.body)
        let result = await school.save();
        res.send(result);
    } catch (e) {
        console.log("e", e);
    }

})
// get Subjects data
app.get("/subjects", async (req, res) => {
    try {
        let school = await Subjects.find().collation({ locale: "en" }).sort({ title: 1 })
        if (school.length) {
            res.send(school)
        } else {
            res.send({ result: "No agency Data Found" })
        }
    } catch (e) {
        console.log("e", e);
    }
})

// delete Subjects data
app.put("/subjects_data_delete/:id", async (req, res) => {
    try {
        let result = await Subjects.updateOne({ _id: req.params.id },
            {
                $set: req.body
            })
        res.send(result)
    } catch (e) {
        console.log("e", e);
    }
})

// Find Single Subjects Data
app.get("/single_person_subjects_data/:id", async (req, res) => {
    try {
        let result = await Subjects.findOne({ _id: req.params.id })
        res.send(result);
    } catch (e) {
        console.log("e", e);
    }
})

//  Update Subjects Data 
app.put("/update_single_person_subjects_data/:id", async (req, res) => {
    try {
        let result = await Subjects.updateOne(
            { _id: req.params.id },
            {
                $set: req.body
            }
        )
        res.send(result)
    } catch (e) {
        console.log("e", e);
    }
})
//  Delete Subject data 
app.delete("/parmanently_Delete_Subject/:id", async (req, res) => {
    try {
        let result = await Subjects.deleteOne({ _id: req.params.id })
        res.send(result)
    } catch (e) {
        console.log("e", e);
    }
})

// ................... Time Zone Add ....................../
const TimeZone = require("./Schema/TimeZoneSchema")

// post timezone data
app.post("/timezone", async (req, res) => {
    try {
        let timezone = new TimeZone(req.body);
        let result = await timezone.save();
        res.send(result);
    } catch (e) {
        console.log("e", e);
    }
})
app.get('/timezone', async (req, res) => {
    try {
        let timezones = await TimeZone.find().collation({ locale: "en" }).sort({ timezone: 1 })
        if (timezones.length) {
            res.send(timezones)
        } else {
            res.send({ result: "No agency Data Found" })
        }
    } catch (e) {
        console.log("e", e);
    }
})


// .........................Language APi ..................//
const Language = require("./Schema/LanguageSchema")

// post language data
app.post("/language", async (req, res) => {
    try {
        let language = new Language(req.body);
        let result = await language.save();
        res.send(result);
    } catch (e) {
        console.log("e", e);
    }
})

app.get("/language", async (req, res) => {
    try {
        let lan = await Language.find().collation({ locale: "en" }).sort({ language: 1 });
        if (lan.length) {
            res.send(lan)
        } else {
            res.send({ result: "No agency Data Found" })
        }
    } catch (e) {
        console.log("e", e);
    }
})


// ............................. User Data Add .................//
const UserData = require("./Schema/UserDataSchema");

// post teacher data
app.post("/User_Data", async (req, res) => {
    try {
        let { email } = req.body
        let emailCheck = await UserData.find({ email: email })
        if (emailCheck.length > 0) {
            res.send({ result: "Duplicate", emailCheck: emailCheck });
        } else {
            const userDataSUbmit = new UserData(req.body);
            let result = await userDataSUbmit.save()
            res.send(result)
        }

    } catch (e) {
        console.log("e", e);
    }
})

app.get("/User_Data", async (req, res) => {
    // console.log("ggggg");
    try {
        let use = await UserData.find().collation({ locale: "en" }).sort({ firstName: 1 });
        if(use.length) {
            res.send(use)
            // console.log("ffffff");
        } else {
            res.send({ result: "No user Data Found" })
        }
    } catch (e) {
        console.log("e", e);
    }
})

// single value Change active => Inactive

app.put("/user_Single_Data_Delete/:id", async (req, res) => {
    try {
        let result = await UserData.updateOne(
            { _id: req.params.id },
            {
                $set: req.body
            }
        )
        res.send(result);
    } catch (e) {
        console.log("e", e);
    }
})

app.get("/User_Data_Filter/:key", async (req, res) => {
    try {
        let myARR = [];
        let data = req.params.key
        let query = new URLSearchParams(data);
        let personName = query.get("personName")
        let selectPrograms = query.get("selectPrograms")
        let selectLanguages = query.get("selectLanguages")
        let selectSchools = query.get("selectSchools");
        let selectGrades = query.get("selectGrades");
        let selectSubjects = query.get("selectSubjects")
        let day = query.get("Day")
        let startTime = query.get("StartTime")
        // console.log("startTime", startTime);
        let endTime = query.get("EndTime")
        // console.log("endTime", endTime);

        let dbStartTime;
        let dbEndTime;
        if (day === "Monday" ) {
           if(startTime > 0 && endTime > 0){
            dbStartTime = { "mondayStartTime": { $lte: startTime } };
            dbEndTime = { "mondayEndTime": { $gte: endTime } }
        } 
        else{
            dbStartTime = { "mondayStartTime": { $lte: 0 } };
            dbEndTime = { "mondayEndTime": { $gte: 86400 } }
        }
        } else if (day === "Tuesday" ) {
            if(startTime > 0 && endTime > 0){
            dbStartTime = { "tuesdayStartTime": { $lte: startTime } };
            dbEndTime = { "tuesdayEndTime": { $gte: endTime } };
        } 
        else{
            dbStartTime = { "tuesdayStartTime": { $lte: 0 } };
            dbEndTime = { "tuesdayEndTime": { $gte: 86400 } };
        }
        } else if (day === "Wednesday" ) {
            if(startTime > 0 && endTime > 0){
            dbStartTime = { "wednesdayStartTime": { $lte: startTime } };
            dbEndTime = { "wednesdayEndTime": { $gte: endTime } };
        } 
        else{
            dbStartTime = { "wednesdayStartTime": { $lte: 0 } };
            dbEndTime = { "wednesdayEndTime": { $gte: 86400 } };
        }
        } else if (day === "Thursday") {
            if(startTime > 0 && endTime > 0){
            dbStartTime = { "thursdayStartTime": { $lte: startTime } };
            dbEndTime = { "thursdayEndTime": { $gte: endTime } };
        } 
        else{
            dbStartTime = { "thursdayStartTime": { $lte: 0 } };
            dbEndTime = { "thursdayEndTime": { $gte: 86400 } };
        }
        } else if (day === "Friday" ) {
            if(startTime > 0 && endTime > 0){
            dbStartTime = { "fridayStartTime": { $lte: startTime } };
            dbEndTime = { "fridayEndTime": { $gte: endTime } };
        } 
        else{
            dbStartTime = { "fridayStartTime": { $lte: 0 } };
            dbEndTime = { "fridayEndTime": { $gte: 86400 } };
        }
        } else if (day === "Saturday") {
            if(startTime > 0 && endTime > 0){
            dbStartTime = { "saturdayStartTime": { $lte: startTime } };
            dbEndTime = { "saturdayEndTime": { $gte: endTime } };
        } 
        else{
            dbStartTime = { "saturdayStartTime": { $lte: 0 } };
            dbEndTime = { "saturdayEndTime": { $gte: 86400 } };
        }
        } else if (day === "Sunday" ) {
            if(startTime > 0 && endTime > 0){
            dbStartTime = { "sundayStartTime": { $lte: startTime } };
            dbEndTime = { "sundayEndTime": { $gte: endTime } };
        } 
        else{
            dbStartTime = { "sundayStartTime": { $lte: 0 } };
            dbEndTime = { "sundayEndTime": { $gte: 86400 } };
        }
            // myARR.push(dbEndTime);
            // myARR.push(dbEndTime);
        }
        else {
            dbStartTime = ""
            dbEndTime = ""
        }

        if (personName.length > 0) {
            myARR.push({ "personNameEnter": { $in: personName.split(",") } })
        }
        if (selectPrograms.length > 0) {
            myARR.push({ "selectProgramsEnter": { $in: selectPrograms.split(",") } })
        }

        if (selectSchools.length > 0) {
            myARR.push({ "selectSchoolsEnter": { $in: selectSchools.split(",") } })
        }
        if (selectGrades.length > 0) {
            myARR.push({ "selectGradesEnter": { $in: selectGrades.split(",") } })
        }
        if (selectSubjects.length > 0) {
            myARR.push({ "selectSubjectsEnter": { $in: selectSubjects.split(",") } })
        }
        if (selectLanguages.length > 0) {
            myARR.push({ "selectLanguagesEnter": { $in: selectLanguages.split(",") } })

        }
        if (dbStartTime) {
            myARR.push(dbStartTime);
        }
        if (dbEndTime) {
            myARR.push(dbEndTime);
        }
        // console.log("result", myARR);
        // console.log("dbStartTime", dbStartTime);
        // console.log("dbEndTime", dbEndTime);
        let result = await UserData.find({
            $and: myARR
        }).collation({ locale: "en" }).sort({ firstName: 1 });
        // console.log("result111", result);
        res.send(result)
    } catch (e) {
        console.log("e", e);
    }
})


app.get("/User_Filter_Data/:key", async (req, res) => {
    let myARR = [];
    let data = req.params.key
    let query = new URLSearchParams(data);
    let personName = query.get("personName")
    let selectPrograms = query.get("selectPrograms")
    let selectLanguages = query.get("selectLanguages")
    let selectSchools = query.get("selectSchools");
    let selectGrades = query.get("selectGrades");
    let selectSubjects = query.get("selectSubjects")
    if (personName.length > 0) {
        myARR.push({ "personNameEnter": { $all: personName } })
    }
    if (selectPrograms.length > 0) {
        myARR.push({ "selectProgramsEnter": { $all: selectPrograms } })
    }

    if (selectSchools.length > 0) {
        myARR.push({ "selectSchoolsEnter": { $all: selectSchools } })
    }
    if (selectGrades.length > 0) {
        myARR.push({ "selectGradesEnter": { $all: selectGrades } })
    }
    if (selectSubjects.length > 0) {
        myARR.push({ "selectSubjectsEnter": { $all: selectSubjects } })
    }
    if (selectLanguages.length > 0) {
        myARR.push({ "selectLanguagesEnter": { $all: selectLanguages } })

    }

    let result = await UserData.find({
        $and: myARR
    })
    res.send(result)
})
// Find user Single data
app.get("/user_single_data_find/:id", async (req, res) => {
    try {
        let result = await UserData.findOne({ _id: req.params.id })
        res.send(result)
    } catch (e) {
        console.log("e", e);
    }
})

app.put("/user_single_data_Update/:id", async (req, res) => {
    try {
        let { password, role, timeZone, personNameEnter, selectProgramsEnter, selectSchoolsEnter, selectGradesEnter, selectSubjectsEnter, selectLanguagesEnter,
            consortiumId, gender, firstName, lastName, email, mobileNumber, address, mondayStartTime, mondayEndTime, tuesdayStartTime, tuesdayEndTime, wednesdayStartTime,
            wednesdayEndTime, thursdayStartTime, thursdayEndTime, fridayStartTime, fridayEndTime, saturdayStartTime, saturdayEndTime, sundayStartTime, sundayEndTime
        } = req.body
        const passwordss = await bcrypt.hash(password, 10);
        let withoutpassword = ({
            role: role, timeZone: timeZone, personNameEnter: personNameEnter, selectProgramsEnter: selectProgramsEnter, selectSchoolsEnter: selectSchoolsEnter,
            selectGradesEnter: selectGradesEnter, selectSubjectsEnter: selectSubjectsEnter, selectLanguagesEnter: selectLanguagesEnter, consortiumId: consortiumId, gender: gender,
            firstName: firstName, lastName: lastName, email: email, mobileNumber: mobileNumber, address: address, mondayStartTime: mondayStartTime, mondayEndTime: mondayEndTime,
            tuesdayStartTime: tuesdayStartTime, tuesdayEndTime: tuesdayEndTime, wednesdayStartTime: wednesdayStartTime, wednesdayEndTime: wednesdayEndTime, thursdayStartTime: thursdayStartTime,
            thursdayEndTime: thursdayEndTime, fridayStartTime: fridayStartTime, fridayEndTime: fridayEndTime, saturdayStartTime: saturdayStartTime, saturdayEndTime: saturdayEndTime, sundayStartTime: sundayStartTime, sundayEndTime: sundayEndTime
        })
        let withpassword = ({
            role: role, timeZone: timeZone, personNameEnter: personNameEnter, selectProgramsEnter: selectProgramsEnter, selectSchoolsEnter: selectSchoolsEnter,
            selectGradesEnter: selectGradesEnter, selectSubjectsEnter: selectSubjectsEnter, selectLanguagesEnter: selectLanguagesEnter, consortiumId: consortiumId, gender: gender,
            firstName: firstName, lastName: lastName, email: email, mobileNumber: mobileNumber, address: address, mondayStartTime: mondayStartTime, mondayEndTime: mondayEndTime,
            tuesdayStartTime: tuesdayStartTime, tuesdayEndTime: tuesdayEndTime, wednesdayStartTime: wednesdayStartTime, wednesdayEndTime: wednesdayEndTime, thursdayStartTime: thursdayStartTime,
            thursdayEndTime: thursdayEndTime, fridayStartTime: fridayStartTime, fridayEndTime: fridayEndTime, saturdayStartTime: saturdayStartTime, saturdayEndTime: saturdayEndTime, sundayStartTime: sundayStartTime, sundayEndTime: sundayEndTime, password: passwordss
        })
        if (password.length <= 0) {
            let result = await UserData.updateOne(
                { _id: req.params.id },
                {
                    $set: withoutpassword
                }
            )
            res.send(result);
        } else {
            let result = await UserData.updateOne(
                { _id: req.params.id },
                {
                    $set: withpassword
                }
            )
            res.send(result);
        }
    } catch (e) {
        console.log("e", e);
    }


})

// delete user
app.delete("/delete_permanently_user/:id", async (req, res) => {
    try {
        let result = await UserData.deleteOne({ _id: req.params.id })
        res.send(result)
    } catch (e) {
        console.log("e", e);
    }
})
// ........................... Schedule api ................//
const Schedule = require("./Schema/ScheduleSchema")
app.post("/schedule", async (req, res) => {
    try {
        let scheduless = new Schedule(req.body)
        let result = await scheduless.save()
        res.send(result)
    } catch (e) {
        console.log("e", e);
    }

})

app.get("/schedule", async (req, res) => {
    try {
        let result = await Schedule.find();
        if (result.length) {
            res.send(result)
        } else {
            res.send({ result: "No agency Data Found" })
        }
    } catch (e) {
        console.log("e", e);
    }
})

// ................... Schedule google api .................//
const NewSchedule = require("./Schema/NewScheduleSchema")

// post new Schedule Schema
app.post("/schedule_google", cors(), async (req, res) => {
    try {
        let new_schedule = new NewSchedule(req.body);
        let result = await new_schedule.save();
        res.send(result)
    } catch (e) {
        console.log("e", e);
    }

})
// get student schedule data
app.get("/schedule_student", async (req, res) => {
    try {
        let result = await NewSchedule.find();
        if (result.length) {
            res.send(result)
        } else {
            res.send({ result: "No agency Data Found" })
        }
    } catch (e) {
        console.log("e", e);
    }
})

app.get("/schedule_googles_filter/:key", cors(), async (req, res) => {
    try {
        let data = req.params.key
        let query = new URLSearchParams(data);
        let day = query.get("Day")
        let startTime = query.get("StartTime")
        let endTime = query.get("EndTime")
        let teacherId = query.get("teacherId");
        let years = query.get("year");
        let months = query.get("month");
        let datess = query.get("dates")
        let OrignalTimeStart = query.get("OrignalTimeStart");
        let OrignalTimeEnd = query.get("OrignalTimeEnd");
        let EFOT = parseInt(OrignalTimeEnd.split(':')[0]);
        let ELOT = parseInt(OrignalTimeEnd.split(':')[1]);
        let SFOT = parseInt(OrignalTimeStart.split(':')[0]);
        let SLOT = parseInt(OrignalTimeStart.split(':')[1]);
        const now = new Date(years, months, datess, SFOT, SLOT);
        const isoTimestamp = now.toISOString().replace(/[-:]/g, "").slice(0, -5) + "Z";
        let dayWeek;
        if (day === "Monday") {
            dayWeek = "MO"
        } else if (day === "Tuesday") {
            dayWeek = "TU"
        } else if (day === "Wednesday") {
            dayWeek = "WE"
        } else if (day === "Thursday") {
            dayWeek = "TH"
        } else if (day === "Friday") {
            dayWeek = "FR"
        } else if (day === "Saturday") {
            dayWeek = "SA"
        } else if (day === "Sunday") {
            dayWeek = "SU"
        }
        let array = []
        let startTimes;
        let endTimes;
         
        if(SLOT > 0 || ELOT > 0){
            if (startTime > 0) {
                startTimes = { "startTime": { $lte: startTime } }
            } else {
                startTimes = { "startTime": { $all: 0 } }  
            }
            if (endTime > 0) {
                endTimes = { "endTIme": { $gte: endTime } }
            
            } else {
                endTimes = { "endTIme": { $all: 86400 } }
            }
        } else {
            if (startTime > 0) {
                startTimes = { "startTime": { $lte: startTime } }
            } else {
                startTimes = { "startTime": { $all: 0 } }
            }
            if (endTime > 0) {
                endTimes = { "endTIme": { $gte: endTime } }
            
            } else {
                endTimes = { "endTIme": { $all: 86400 } }
            }
        }


        //    if({ "startTime": { $gte: startTime } } && { "endTIme": { $lte: endTime } }){

            // if({ "recurrenceRule.": { $regex: "UNTIL",  $options: 'i' } } && { "recurrenceRule.UNTIL": {$gte: `${isoTimestamp}`}}){

            //     array.push({ "recurrenceRule.UNTIL": {$gte: `${isoTimestamp}` } })
            //     console.log("good");
            // } 

            // if (dayWeek) {
            //     array.push({ "recurrenceRule": { $regex: `${dayWeek}`, $options: 'i' } });
            //     // console.log("goog");
            // } else {
            //     array.push({ "day": { $all: day } });
            //     // console.log("bad");
            // }

           //  { "recurrenceRule": { $regex: "UNTIL",  $options: 'i' } } && { "recurrenceRule.UNTIL" : {$gte: `${isoTimestamp}`}}


               if(dayWeek === 'WE' || dayWeek === 'FR' || dayWeek === 'MO'){
                array.push({ "recurrenceRule": {$not: { $regex: `${dayWeek}`, $options: 'i' }} })
                // array.push({ "recurrenceRule": { $regex: `${dayWeek}`, $options: 'i' } })
                // console.log("until");
               } else if({ "recurrenceRule": { $regex: "WEEKLY",  $options: 'i' } }){
                array.push({ "recurrenceRule": { $regex: `${dayWeek}`, $options: 'i' } })
                // console.log("weekly");
               }else {
                array.push({ "day": { $all: day } })
                // console.log("day");
               }

        // array.push({ "recurrenceRule.UNTIL" : {$gte: isoTimestamp}})
        // array.push({ "recurrenceRule": { $regex: `${dayWeek}`, $options: 'i' } })
        // array.push({ "recurrenceRule":{ $in: { $regex: dayWeek, $options: 'i' }}})
        // console.log("dayWeek", dayWeek);
        array.push(startTimes);
        array.push(endTimes);
        array.push({ "teacherSelect": { $in: teacherId } })
        array.push({ "recurrenceException": { $not: { $regex: `${isoTimestamp}`, $options: 'i' } } })
        
        // console.log("array", array);
        let result = await NewSchedule.find(
                {$and : array}
        ).exec((err, users) => {
                if (err) {
                  console.error(err);
                } else {
                    // console.log("result", users);
                    res.send(users)
                }
              });

        //    let result = NewSchedule.aggregate([
        //     {
        //         $match :{
        //             $and: [
        //                 {
        //                     cond: {
        //                         if: { "recurrenceRule": { $regex: "UNTIL",  $options: 'i' } },
        //                         then: [
        //                             { "recurrenceRule": { $regex: `${dayWeek}`, $options: 'i' }},
        //                             // { "recurrenceRule.UNTIL": {$gte: `${isoTimestamp}`}},
        //                             { "teacherSelect": { $all: teacherId } },
        //                             { "startTime": { $all: startTime } },
        //                             { "endTIme": { $all: endTime } }
        //                         ],
        //                         else: [
        //                      { "recurrenceRule": { $regex: `${dayWeek}`, $options: 'i' }},
        //                      { "teacherSelect": { $all: teacherId } },
        //                      { "startTime": { $all: startTime } },
        //                      { "endTIme": { $all: endTime } } 
        //                         ]
        //                     }
        //                 }
        //             ]
        //         }
        //     }
        //    ]).exec((err, users) => {
        //     if (err) {
        //       console.error(err);
        //     } else {
        //         console.log("result", users);
        //         res.send(users)
        //     }
        //   });

        // console.log("result", result);
        // res.send(result)
        
    } catch (e) {
        console.log("e", e);
    }

})
app.get("/schedule_googles/:id", cors(), async (req, res) => {
    try {
        let result = await NewSchedule.find({ teacherSelect: req.params.id })
        res.send(result)
    } catch (e) {
        console.log("e", e);
    }
})
app.put(("/schedule_google/:id"), async (req, res) => {

    try {
        let result = await NewSchedule.updateOne(
            { _id: req.body._id },
            {
                $set: req.body
            }
        )
        res.send(result);
    } catch (e) {
        console.log("e", e);
    }
})
app.get("/schedule_googles_Data", async (req, res) => {
    try {
        // let teacherId = "teacherSelect"
        // const distinctValues = await NewSchedule.distinct(teacherId);
        const distinctValues = await NewSchedule.find();
        res.send(distinctValues)
    } catch (e) {
        console.log("e", e);
    }

})
app.delete(("/schedule_google/:id"), async (req, res) => {
    try {
        let result = await NewSchedule.deleteOne({ _id: req.params.id })
        res.send(result)
    } catch (e) {
        console.log("e", e);
    }
})
app.get("/", (req, res) => {
    try {
        res.status(200).send("server 🏃🏻‍♂️ good")
    } catch (error) {
        console.error("error while get method", error);
    }
});
app.delete("/delete_Student_All_Data/:id", async (req, res) => {
    try {
        let result = await NewSchedule.deleteOne({ teacherSelect: req.params.id })
        res.send(result)
    } catch (e) {
        console.log("e", e);
    }
})
app.delete("/delete_Student_All_Data_dddd/:id", async (req, res) => {
    try {
        let result = await NewSchedule.deleteOne({ _id: req.params.id })
        res.send(result)
    } catch (e) {
        console.log("e", e);
    }
})

app.get("/schedule_student_CSV/:id", async (req, res) => {
    try {
        // console.log("req.params.id", req.params.id);
        let result = await NewSchedule.find({ teacherSelect: req.params.id })
        res.send(result)
    } catch (e) {
        console.log("e", e);
    }
})
//..............................login ...........................//
const Admin = require("./Schema/AdminSchema")
app.post("/admin_data", async (req, res) => {
    try {
        let admin = new Admin(req.body);
        let result = await admin.save();
        res.send(result)
    } catch (e) {
        console.log("e", e);
    }
})
app.get("/admin_data", async (req, res) => {
    try {
        let use = await UserData.find();
        if (use.length) {
            res.send(use)
        } else {
            res.send({ result: "No Admin Data Found" })
        }
    } catch (e) {
        console.log("e", e);
    }
})
app.get("/admin_data_show/:id", async (req, res) => {
    try {
        let result = await UserData.findOne({ _id: req.params.id })
        res.send(result);
    } catch (e) {
        console.log("e", e);
    }
})
app.put("/admin_update_data/:id", async (req, res) => {
    try {
        let result = await UserData.updateOne(
            { _id: req.params.id },
            {
                $set: req.body
            }
        )
        res.send(result)
    } catch (e) {
        console.log("e", e);
    }
})
app.put("/reset_password/:id", async (req, res) => {
    try {
        let { oldPassword, password } = req.body
        let result = await UserData.findOne({ _id: req.params.id })
        const isMatched = await result?.comparePassword(oldPassword);
        if (!isMatched) {

            return res.send({ result: "Old password not exist! please enter correct old password" })
        }
        if (isMatched == true) {
            const passwordss = await bcrypt.hash(password, 10);
            let resultsss = await UserData.updateOne(
                { _id: req.params.id },
                {
                    $set: { password: passwordss }

                }
            )
            res.send(resultsss)
        }

    } catch (e) {
        console.log("e", e);
    }
})
app.post("/login", async (req, res) => {
    try {

        let { email, password } = req.body;
       
        // console.log("password", password);

        if (!email || !password) {
            return res.send({ result: "E-mail and password are required" })
        }
        let checklogin = await UserData.findOne({ email: email })
        if (!checklogin) {
            return res.send({ result: "Invalid credentials" })
        }
        const isMatched = await checklogin.comparePassword(password);
        if (!isMatched) {

            return res.send({ result: "Invalid credentials password" })
        }
        res.send({ result: "Login Successfully", status: checklogin })
    } catch (e) {
        console.log("e", e);
    }

})


// ...........................mail send .................//
let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "StudentNest",
        link: 'https://mailgen.js/'
    }
})

const EmailRecordSchema = require("./Schema/EmailRecordSchema")

app.post("/send_Reservation_Data", async (req, res) => {
    try {
        let { mailSTartTime, mailEndTime, email, description, text, day, recurrenceRule } = req.body
        let response = {
            body: {
                name: "Student",

                table: {
                    data: [
                        {
                            Start_Time: mailSTartTime,
                            End_Time: mailEndTime,
                            Subject: text,
                            Day: day,
                            Description: description,
                            Weekly_Repeat: recurrenceRule
                        }
                    ]
                },
                outro: "Looking forward to do more business"
            }
        }

        let mail = MailGenerator.generate(response)
        const send_to = email;
        const sent_from = "scheduling@studentnest.com"
        const reply_to = email;
        const subject = "Thank You Message From StudentNest";
        const message = mail
        //  `
        // <div style="font-size: .8rem; margin: 0 30px">
        //         <p>Start Time: <b>${mailSTartTime}</b></p>
        //         <p>End Time: <b>${mailEndTime}</b></p>
        //         <p>Subject: <b>${text}</b></p>
        //         <p>Day <b>${day}</b></p>
        //         <p>Description <b>${description}</b></p>
        //         <pWeekly Repeat <b>${recurrenceRule}</b></p>

        //       </div>
        // `;
        await sendEmail(subject, message, send_to, sent_from, reply_to);
        let emailRecord = new EmailRecordSchema(req.body)
        let result = await emailRecord.save();
        res.send({ success: true, message: "Email Sent", result: result });
    } catch (error) {
        res.send(error.message);
    }
})

app.get("/get_Email_Data", async (req, res) => {
    try {
        let use = await EmailRecordSchema.find().collation({ locale: "en" }).sort({ fName: 1 });
        if (use.length) {
            res.send(use)
        } else {
            res.send({ result: "No Email Data Found" })
        }
    } catch (e) {
        console.log("e", e);
    }
})

app.delete("/get_Email_Data/:id", async (req, res) => {
    try {
        let result = await EmailRecordSchema.deleteOne({ _id: req.params.id })
        res.send(result)
    } catch (e) {
        console.log("e", e);
    }
})
app.post("/send_Reservation_Update_Data", async (req, res) => {
    try {
        let { startTime, endTIme, email, description, text, day, recurrenceRule } = req.body
        let response = {
            body: {
                name: "Student",

                table: {
                    data: [
                        {
                            Start_Time: mailSTartTime,
                            End_Time: mailEndTime,
                            Subject: text,
                            Day: day,
                            Description: description,
                            Weekly_Repeat: recurrenceRule
                        }
                    ]
                },
                outro: "Looking forward to do more business"
            }
        }

        let mail = MailGenerator.generate(response)

        const send_to = email;
        const sent_from = "scheduling@studentnest.com"
        const reply_to = email;
        const subject = "Upadte Teacher Scheduler";
        const message = mail
        // `
        // // <div style="font-size: .8rem; margin: 0 30px">
        // //         <p>Start Time: <b>${startTime}</b></p>
        // //         <p>End Time: <b>${endTIme}</b></p>
        // //         <p>Subject: <b>${text}</b></p>
        // //         <p>Day <b>${day}</b></p>
        // //         <p>Description <b>${description}</b></p>
        // //         <pWeekly Repeat <b>${recurrenceRule}</b></p>

        // //       </div>
        // `;
        await sendEmail(subject, message, send_to, sent_from, reply_to);

        res.send({ success: true, message: "Email Sent" });
    } catch (error) {
        res.send(error.message);
    }
})

// ........................Activity Log ..................//
const activitySchema = require("./Schema/ActivitySchema");

app.post("/activity_Log", async (req, res) => {
    try {
        let admin = new activitySchema(req.body);
        let result = await admin.save();
        res.send(result)
    } catch (e) {
        console.log("e", e);
    }
})

app.get("/activity_Log", async (req, res) => {
    try {
        let use = await activitySchema.find().collation({ locale: "en" }).sort({ fName: 1 });
        if (use.length) {
            res.send(use)
        } else {
            res.send({ result: "No activity Data Found" })
        }
    } catch (e) {
        console.log("e", e);
    }
})



// ...........................Pdf Progress Work .............................//
const reportData = require("./Schema/ReportSchema");

app.post('/Progress_Report', async(req, res)=>{
    try{
        // console.log(req.body);
        let progressReport = new reportData(req.body)
        let result = await progressReport.save()
        res.send(result)

    }catch(e){
        console.log("e", e)
    }
})

app.get('/Progress_Report', async(req,res)=>{
    try{
     let Progress_Report = await reportData.find().collation({ locale: "en" }).sort({ Report_Value: 1 });
     if (Progress_Report.length) {
        res.send(Progress_Report)
    } else {
        res.send({ result: "No activity Data Found" })
    }
    }catch(e){
      console.log("e", e)
    }
})
 
app.get("/ProgressReport/:id", async(req, res)=>{
    try{
         let SingleProgress = await reportData.findOne({_id: req.params.id})
         if(SingleProgress){
            res.send(SingleProgress)
         }else{
            res.send({result: "No Data Found"})
         }
    }catch(e){
        console.log("e", e)
    }
})
//...........................Pdf Attendance Work ..............................//

const Attendance_Report = require('./Schema/AttendanceSchema')


app.post("/attendance_Report_Data", async(req,res)=>{
    try{
        //  console.log(req.body);
         let attendanceReportData = new Attendance_Report(req.body)
         let result = await attendanceReportData.save()
         res.send(result)
    }catch(e){
        console.log("e", e)
    }
})

app.get('/attendance_Report_Data', async(req,res)=>{
    try{
     let Progress_Report = await Attendance_Report.find().collation({ locale: "en" }).sort({ Report_Value: 1 });
     if (Progress_Report.length) {
        res.send(Progress_Report)
    } else {
        res.send({ result: "No activity Data Found" })
    }
    }catch(e){
      console.log("e", e)
    }
})

app.get("/attendance_Report/:id", async(req, res)=>{
    try{
         let SingleProgress = await Attendance_Report.findOne({_id: req.params.id})
         if(SingleProgress){
            res.send(SingleProgress)
         }else{
            res.send({result: "No Data Found"})
         }
    }catch(e){
        console.log("e", e)
    }
})





const port = process.env.PORT || 8000
https.createServer(options, app).listen(port, () => {
    console.log(`Server Running at ${port}`)
});

   
// const port = process.env.PORT || 8000
// app.listen(port, () => {
//     console.log(`Server Running at ${port}`)
// });












// console.log("dayWeek", dayWeek);
        // then: { "recurrenceRule": { regex: /dayWeek$/ },
        //     "recurrenceException" : { regex: /isoTimestamp$/ } 
        // }
        // $cond: {
        //     if: { "recurrenceRule": { regex: "WEEKLY" } },
        //     then: { 
        //         $cond: {
        //             if: {"recurrenceException" : { exists: true }},
        //             then: {"recurrenceException" : { regex: /isoTimestamp$/ }},
        //             else: {"recurrenceRule": { regex: /dayWeek$/ } }
        //         }
        //     },
        //     else: { "day": { all: day } }
        // }

        // Current Day 

        // $expr: {
        //     $cond: {
        //         if: { "recurrenceRule": { regex: "WEEKLY" } },
        //         then: { 
        //             $cond: {
        //                 if: {"recurrenceException": {neq: null }},
        //                 then: {"recurrenceException" : { eq: "hgfhfhgfh" }},
        //                 else: {"day": { neq: day }},

        //             }
        //         },
        //         else: { "day": { all: day } }
        //     }
        // },


        // 12:5
        // $cond: {
        //     if: { regex: ["$recurrenceRule", "WEEKLY"] },
        //     then: {
        //         $cond: {
        //             if: { exists: ["$recurrenceException", true] },
        //             then: { regex: ["$recurrenceException", isoTimestamp],
        //             all: [ "$teacherSelect", teacherId ]  },
        //             else: { 
        //             all: [ "$teacherSelect", teacherId ],
        //             all: [ "$startTime", startTime ],
        //             all: [ "$endTIme", endTime ] }
        //         }
        //     },
        //     else: { eq: ["$day", day],
        //     all: [ "$teacherSelect", teacherId ],
        //     all: [ "$startTime", startTime ],
        //     all: [ "$endTIme", endTime ] }
        // }

        // ............................. Update .................... //
        // {
        //     // $expr: {
        //     cond: {
        //         if: { recurrenceRule: /WEEKLY$/ },
        //         then: {
        //             $cond: {
        //                 if: { recurrenceException: true },
        //                 then: {
        //                     recurrenceException: /isoTimestamp$/,
        //                     all: ["$teacherSelect", teacherId],
        //                     all: ["$startTime", startTime],
        //                     all: ["$endTIme", endTime]
        //                 },
        //                 else: {
        //                     recurrenceRule: /dayWeek$/,
        //                     all: ["$teacherSelect", teacherId],
        //                     all: ["$startTime", startTime],
        //                     all: ["$endTIme", endTime]
        //                 }
        //             }
        //         },
        //         else: {
        //             eq: ["$day", day],
        //             all: ["$teacherSelect", teacherId],
        //             all: ["$startTime", startTime],
        //             all: ["$endTIme", endTime]
        //         }
        //     }
        //     // }
        // },

        // console.log("isoTimestamp", isoTimestamp);
        // let result = await NewSchedule.find({
        //     $and: [
        //         {
        //             // $expr: {
        //             cond: {
        //                 if: { regex: ["$recurrenceRule", /WEEKLY$/] },
        //                 then: {
        //                     cond: {
        //                         if: { ne: ["recurrenceException", /isoTimestamp$/] },
        //                         then: {
        //                             "teacherSelect": { all: teacherId },
        //                             "startTime": { all: startTime },
        //                             "endTIme": { all: endTime }
        //                         }
        //                     },
        //                     else: {}
        //                 },
        //                 else: { eq: ["$day", day] }
        //                 }
        //             // }
        //         },

        //         // regneqx: ["$recurrenceException", /isoTimestamp$/]



        //         // { "teacherSelect": { $all: teacherId } },
        //         // { "startTime": { $all: startTime } },
        //         // { "endTIme": { $all: endTime } }
        //         // { all: ["teacherSelect", teacherId ] },
        //         // { all: [ "startTime", startTime ] },
        //         // { all: [ "endTIme", endTime ] }

        //     ]
        // $cond: {
        //     if: { "recurrenceRule": { regex: "WEEKLY" } },
        //     then: {
        //         $cond: {
        //             if: { "recurrenceException": { exists: true } },
        //             then: { "recurrenceException": { regex: /isoTimestamp$/ } },
        //             else: { "recurrenceRule": { regex: /dayWeek$/ } }
        //         }
        //     },
        //     else: { "day": { all: day } }
        // }

        // $and: [
        //     { "teacherSelect": { $all: teacherId } },
        //     { "startTime": { $all: startTime } },
        //     { "endTIme": { $all: endTime } }
        // ]
        // })
        // console.log(result);