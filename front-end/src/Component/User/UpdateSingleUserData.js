import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { BACKEND_URI } from "../../config/config"
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import InputAdornment from '@mui/material/InputAdornment';
import 'rc-time-picker/assets/index.css';
import { secondsToHmsssss, toSeconds } from "../../Convertor"
import TimeInput from "react-time-picker-input";
import toast, { Toaster } from 'react-hot-toast';
import Spinner from 'react-bootstrap/Spinner';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
function getStylesone(name, selectLanguages, theme) {
    return {
        fontWeight:
            selectLanguages.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
function getStylesTwo(name, selectPrograms, theme) {
    return {
        fontWeight:
            selectPrograms.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
function getStylesThree(name, selectSchools, theme) {
    return {
        fontWeight:
            selectSchools.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
function getStylesFour(name, selectGrades, theme) {
    return {
        fontWeight:
            selectGrades.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
function getStylesFive(name, selectSubjects, theme) {
    return {
        fontWeight:
            selectSubjects.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
function UpdateSingleUserData() {
    const theme = useTheme();
    const navigate = useNavigate();
    const params = useParams();
    const [role, setRole] = useState("");
    const [roleOpen, setRoleOpen] = useState(false)
    const [timeZone, setTimeZone] = useState([])
    const [timeZoneOpen, setTimeZoneOpen] = useState(false)
    const [timeZoneGet, setTimeZoneGet] = useState([]);
    const [personNameEnter, setPersonNameEnter] = useState([]);
    const [agencyData, setAgencyData] = useState([]);
    const [programData, setProgramData] = useState([]);
    const [selectProgramsEnter, setSelectProgramEnter] = useState([]);
    const [selectSchoolsEnter, setSelectSchoolEnter] = useState([]);
    const [schoolsData, setSchoolData] = useState([]);
    const [selectGradesEnter, setSelectGradesEnter] = useState([]);
    const [gradeData, setGradeData] = useState([]);
    const [selectSubjectsEnter, setSelectSubjectsEnter] = useState([])
    const [subjectData, setSubjectData] = useState([])
    const [selectLanguagesEnter, setSelectLanguagesEnter] = useState([]);
    const [languageGet, setLanguageGet] = useState([]);
    const [consortiumId, setConsortiumId] = useState('');
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('');
    const [email, setEMail] = useState('')
    const [mobileNumber, setMobileNumber] = useState('');
    const [address, setAddress] = useState('')
    const [gender, setGender] = useState("")
    const [genderOpen, setGenderOpen] = useState(false)
    const [timeStatus, checkTimeStatus] = useState();

    const [mondayStartTimes, setMondayStartTime] = useState("")
    const [mondayEndTimes, setMondayEndTime] = useState("")
    const [tuesdayStartTimes, setTuesdayStartTime] = useState('')
    const [tuesdayEndTimes, setTuesdayEndTime] = useState('');
    const [wednesdayStartTimes, setWednesdayStartTime] = useState('');
    const [wednesdayEndTimes, setWednesdayEndTime] = useState('');
    const [thursdayStartTimes, setThursdayStartTime] = useState('');
    const [thursdayEndTimes, setThursdayEndTime] = useState('');
    const [fridayStartTimes, setFridayStartTime] = useState("");
    const [fridayEndTimes, setFridayEndTime] = useState("");
    const [saturdayStartTimes, setSaturdayStartTime] = useState('');
    const [saturdayEndTimes, setSaturdayEndTime] = useState('');
    const [sundayStartTimes, setSundayStartTime] = useState('');
    const [sundayEndTimes, setSundayEndTime] = useState('');
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    // ........Time Pick .................//

    const handleChangeRole = (event) => {
        setRole(event.target.value);
    };
    const handleCloseRole = () => {
        setRoleOpen(false);
    };
    const handleOpenRole = () => {
        setRoleOpen(true);
    };
    const handleChangeTimeZone = (event) => {
        setTimeZone(event.target.value);
    };

    const handleCloseTimeZone = () => {
        setTimeZoneOpen(false);
    };

    const handleOpenTimeZone = () => {
        setTimeZoneOpen(true);
    };
    const handleChangeAgency = (event) => {
        const {
            target: { value },
        } = event;
        setPersonNameEnter(
            typeof value === 'string' ? value.split(',') : value
        );
    };
    const handleChangePrograms = (event) => {
        const {
            target: { value },
        } = event;
        setSelectProgramEnter(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleChangeSchool = (event) => {
        const {
            target: { value },
        } = event;
        setSelectSchoolEnter(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleChangeGrade = (event) => {
        const {
            target: { value },
        } = event;
        setSelectGradesEnter(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleChangeSubjects = (event) => {
        const {
            target: { value },
        } = event;
        setSelectSubjectsEnter(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleChangeLanguage = (event) => {
        const {
            target: { value },
        } = event;
        setSelectLanguagesEnter(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleChangeGender = (event) => {
        setGender(event.target.value);
    };

    const handleCloseGender = () => {
        setGenderOpen(false);
    };

    const handleOpenGender = () => {
        setGenderOpen(true);
    };
    const allApiData = async () => {
        try {
            let agencyArry = [];
            let programArray = [];
            let schoolArray = [];
            let gradeArray = [];
            let subjectArray = []
            await axios.get(`${BACKEND_URI}/agency`).then((agencyRes) => {
                agencyRes.data.forEach((agencyElement) => {
                    if (agencyElement.active == "true") {
                        agencyArry.push(agencyElement)
                    }
                })
                setAgencyData(agencyArry);
            });
            await axios.get(`${BACKEND_URI}/programs`).then((programsRes) => {
                programsRes.data.forEach((agencyElement) => {
                    if (agencyElement.active == "true") {
                        programArray.push(agencyElement)
                    }
                })
                setProgramData(programArray);
            });
            await axios.get(`${BACKEND_URI}/schools`).then((schoolsRes) => {
                schoolsRes.data.forEach((agencyElement) => {
                    if (agencyElement.active == "true") {
                        schoolArray.push(agencyElement)
                    }
                })
                setSchoolData(schoolArray);
            });
            await axios.get(`${BACKEND_URI}/grades`).then((gradesRes) => {
                gradesRes.data.forEach((gradesElement) => {
                    if (gradesElement.active == "true") {
                        gradeArray.push(gradesElement)
                    }
                })
                setGradeData(gradeArray);
            });
            await axios.get(`${BACKEND_URI}/subjects`).then((subjectsRes) => {
                subjectsRes.data.forEach((subjectsElement) => {
                    subjectArray.push(subjectsElement)
                })
                setSubjectData(subjectArray);
            });
            await axios.get(`${BACKEND_URI}/timezone`).then((timezoneres) => {
                setTimeZoneGet(timezoneres.data);
            });
            await axios.get(`${BACKEND_URI}/language`).then((languageRes) => {
                setLanguageGet(languageRes.data);
            });
        } catch (e) {
            console.log("e", e);
        }
    }

    const showSingleApiData = async () => {
        try {
            let userIds;
            await axios.get(`${BACKEND_URI}/user_single_data_find/${params.id}`).then(async(showRes) => {
                let agencyarr = []
                let timeZone = []
                setFirstName(showRes.data.firstName);
                setLastName(showRes.data.lastName);
                setEMail(showRes.data.email);
                setMobileNumber(showRes.data.mobileNumber);
                setAddress(showRes.data.address);
                setConsortiumId(showRes.data.consortiumId);
                setGender(showRes.data.gender)
                setRole(showRes.data.role);
                checkTimeStatus(showRes.data.active)
                userIds = showRes.data._id;
                let agencyData = showRes.data.personNameEnter;
                let mondyStartTime = secondsToHmsssss(showRes?.data?.mondayStartTime);
                let mondyendTime = secondsToHmsssss(showRes?.data?.mondayEndTime)
                let tusStartTime = secondsToHmsssss(showRes?.data?.tuesdayStartTime);
                let tusEndTime = secondsToHmsssss(showRes?.data?.tuesdayEndTime);
                let wedStartTime = secondsToHmsssss(showRes?.data?.wednesdayStartTime);
                let wedEndTime = secondsToHmsssss(showRes?.data?.wednesdayEndTime);
                let thuStartTime = secondsToHmsssss(showRes?.data?.thursdayStartTime);
                let thuEndTime = secondsToHmsssss(showRes?.data?.thursdayEndTime);
                let friStartEnd = secondsToHmsssss(showRes?.data?.fridayStartTime);
                let friEndTime = secondsToHmsssss(showRes?.data?.fridayEndTime);
                let satStartTime = await secondsToHmsssss(showRes?.data?.saturdayStartTime);
                let satEndTime = await secondsToHmsssss(showRes?.data?.saturdayEndTime);
                let sunSTartTime = await secondsToHmsssss(showRes?.data?.sundayStartTime);
                let sunEndTime = await secondsToHmsssss(showRes?.data?.sundayEndTime);
                setMondayStartTime(mondyStartTime);
                setMondayEndTime(mondyendTime)
                setTuesdayStartTime(tusStartTime)
                setTuesdayEndTime(tusEndTime)
                setWednesdayStartTime(wedStartTime)
                setWednesdayEndTime(wedEndTime)
                setThursdayStartTime(thuStartTime)
                setThursdayEndTime(thuEndTime);
                setFridayStartTime(friStartEnd);
                setFridayEndTime(friEndTime);
                setSaturdayStartTime(satStartTime);
                setSaturdayEndTime(satEndTime);
                setSundayStartTime(sunSTartTime);
                setSundayEndTime(sunEndTime)
                timeZone.push(showRes?.data?.timeZone)
                setTimeZone(showRes?.data?.timeZone)
                setSelectProgramEnter(showRes.data.selectProgramsEnter)
                setSelectSchoolEnter(showRes.data.selectSchoolsEnter)
                setSelectGradesEnter(showRes.data.selectGradesEnter)
                setSelectSubjectsEnter(showRes.data.selectSubjectsEnter)
                setSelectLanguagesEnter(showRes.data.selectLanguagesEnter)
                setPersonNameEnter(showRes.data.personNameEnter)
            })
        } catch (e) {
            console.log("e", e);
        }
    }
    // console.log("saturdayStartTimes", saturdayStartTimes, saturdayEndTimes, sundayEndTimes, sundayStartTimes);
    // console.log("sundayEndTimes", );

    const updateUserData = async () => {
        let data = new Date()
        let dateTime = data.toDateString();
        let stuent_data = JSON.parse(localStorage.getItem("studentNest"));
        let First_Name = stuent_data.firstName
        let Last_Name = stuent_data.lastName
        let status = `User has been Updated by ${First_Name} ${Last_Name}`
        setLoading(true)
        let mondayStartTime = toSeconds(mondayStartTimes);
        let mondayEndTime = toSeconds(mondayEndTimes)
        let tuesdayStartTime = toSeconds(tuesdayStartTimes);
        let tuesdayEndTime = toSeconds(tuesdayEndTimes);
        let wednesdayStartTime = toSeconds(wednesdayStartTimes);
        let wednesdayEndTime = toSeconds(wednesdayEndTimes);
        let thursdayStartTime = toSeconds(thursdayStartTimes);
        let thursdayEndTime = toSeconds(thursdayEndTimes);
        let fridayStartTime = toSeconds(fridayStartTimes);
        let fridayEndTime = toSeconds(fridayEndTimes);
        let saturdayStartTime = toSeconds(saturdayStartTimes)
        let saturdayEndTime = toSeconds(saturdayEndTimes);
        let sundayStartTime = toSeconds(sundayStartTimes);
        let sundayEndTime = toSeconds(sundayEndTimes)
        try {
            await axios.put(`${BACKEND_URI}/user_single_data_Update/${params.id}`, {
                role, timeZone, personNameEnter, selectProgramsEnter, selectSchoolsEnter, selectGradesEnter, selectSubjectsEnter, selectLanguagesEnter,
                consortiumId, gender, firstName, lastName, email, mobileNumber, address, mondayStartTime, mondayEndTime, tuesdayStartTime, tuesdayEndTime, wednesdayStartTime, wednesdayEndTime,
                thursdayStartTime, thursdayEndTime, fridayStartTime, fridayEndTime, saturdayStartTime, saturdayEndTime, sundayStartTime, sundayEndTime,
                password
            }).then(async(res) => {
                navigate("/sidebar/user")
                toast.success("Data Updated successfully")
                setLoading(false)
                if(res){
                    await axios.post(`${BACKEND_URI}/activity_Log`, {
                        First_Name,
                        Last_Name,
                        dateTime,
                        status
                      }).then((resactivty) => {
                      })
                }
            })
        } catch (e) {
            console.log("e", e);
            setLoading(false)
            toast.error("May be Server Error! Please Refresh Page")
        }
    }


    const handleChangepassword = (e) => {
        setPassword(e.target.value);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    useEffect(() => {
        allApiData()
    }, [])
    useEffect(() => {
        showSingleApiData()
    }, [])
    return (
        <div className='container'>
            <div className='row user-box-1'>
                <div className='col-lg-12 col-12  d-flex justify-content-center  justify-content-between align-items-center pt-3 pb-3'>
                    <h4 className='user-h4 mt-2'>UPDATE USER</h4>
                </div>
            </div>
            <div className='row d-flex justify-content-center ' style={{ background: "#c7d7df", borderBottomLeftRadius: "10px" , borderBottomRightRadius: "10px" }}>
                <div className='col-lg-10   mt-2 '>
                    <div className="row mb-3 d-flex flex-md-row flex-column align-items-center text-start">
                        <div className='col-md-2 text-start'>
                            <label htmlFor="exampleFormControlInput1" className="form-label mt-2">Role</label>
                        </div>
                        <div className='col-lg-6'>
                            <FormControl className='select-width-demo' size="small">
                                <InputLabel id="demo-controlled-open-select-label">Role</InputLabel>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    open={roleOpen}
                                    onClose={handleCloseRole}
                                    onOpen={handleOpenRole}
                                    value={role}
                                    label="Role"
                                    className='text-start'
                                    onChange={handleChangeRole}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Student">Student</MenuItem>
                                    <MenuItem value="Manager">Manager</MenuItem>
                                    <MenuItem value="Teacher">Teacher</MenuItem>
                                    <MenuItem value="Employee">Employee</MenuItem>
                                    <MenuItem value="Developer">Developer</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div>

                <div className='col-lg-10  '>
                    <div className="mb-3 d-flex align-items-center">
                        <div className='col-md-2 text-start '>
                            <label htmlFor="exampleFormControlInput1" className="form-label mt-2">Time Zone</label>
                        </div>
                        <FormControl className='select-width-demo' size="small">
                            <InputLabel id="demo-controlled-open-select-label">Time Zone</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={timeZoneOpen}
                                onClose={handleCloseTimeZone}
                                onOpen={handleOpenTimeZone}
                                value={timeZone}
                                label="Time Zone"
                                className='text-start'
                                onChange={handleChangeTimeZone}
                            >
                                {
                                    timeZoneGet.map((items) => {
                                        return (
                                            <MenuItem value={items.timezone} key={items._id}>{items.timezone}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className='col-lg-10  '>
                    <div className="mb-3 d-flex align-items-center">
                        <div className='col-md-2 text-start '>
                            <label htmlFor="exampleFormControlInput1" className="form-label mt-2">Agency</label>
                        </div>
                        <FormControl className='select-width-demo' size="small">
                            <InputLabel id="demo-multiple-name-label">Select Agency</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                value={personNameEnter}
                                defaultValue={personNameEnter.title}
                                onChange={handleChangeAgency}
                                input={<OutlinedInput label="Select Agency" />}
                                MenuProps={MenuProps}
                                className='text-start'
                            >
                                {agencyData.map((name) => (
                                    <MenuItem
                                        key={name.id}
                                        value={name.title}
                                    >
                                        {name.title}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className='col-lg-10  '>
                    <div className="mb-3 d-flex align-items-center">
                        <div className='col-md-2 text-start '>

                            <label htmlFor="exampleFormControlInput1" className="form-label mt-2">Programs</label>
                        </div>
                        <FormControl className='select-width-demo' size="small">
                            <InputLabel id="demo-multiple-name-label">Select Programs</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                value={selectProgramsEnter}
                                onChange={handleChangePrograms}
                                input={<OutlinedInput label="Select Programs" />}
                                MenuProps={MenuProps}
                                className='text-start'
                            >
                                {programData.map((name) => (
                                    <MenuItem
                                        key={name.id}
                                        value={name.title}
                                    >
                                        {name.title}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <div className='col-lg-10  '>
                    <div className="mb-3 d-flex align-items-center">
                        <div className='col-md-2 text-start '>

                            <label htmlFor="exampleFormControlInput1" className="form-label mt-2">Schools</label>
                        </div>
                        <FormControl className='select-width-demo' size="small">
                            <InputLabel id="demo-multiple-name-label">Select School</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                value={selectSchoolsEnter}
                                onChange={handleChangeSchool}
                                input={<OutlinedInput label="Select School" />}
                                MenuProps={MenuProps}
                                className='text-start'
                            >
                                {schoolsData.map((name) => (
                                    <MenuItem
                                        key={name.id}
                                        value={name.title}
                                    >
                                        {name.title}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <div className='col-lg-10  '>
                    <div className="mb-3 d-flex align-items-center">
                        <div className='col-md-2 text-start '>

                            <label htmlFor="exampleFormControlInput1" className="form-label mt-2">Grade</label>
                        </div>
                        <FormControl className='select-width-demo' size="small">
                            <InputLabel id="demo-multiple-name-label">Select Grade</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                value={selectGradesEnter}
                                onChange={handleChangeGrade}
                                input={<OutlinedInput label="Select Grade" />}
                                MenuProps={MenuProps}
                                className='text-start'
                            >
                                {gradeData.map((name) => (
                                    <MenuItem
                                        key={name.id}
                                        value={name.title}
                                    >
                                        {name.title}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <div className='col-lg-10  '>
                    <div className="mb-3 d-flex align-items-center">
                        <div className='col-md-2 text-start '>

                            <label htmlFor="exampleFormControlInput1" className="form-label mt-2">Subjects</label>
                        </div>
                        <FormControl className='select-width-demo' size="small">
                            <InputLabel id="demo-multiple-name-label">Select Subjects</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                value={selectSubjectsEnter}
                                onChange={handleChangeSubjects}
                                input={<OutlinedInput label="Select Subjects" />}
                                MenuProps={MenuProps}
                                className='text-start'
                            >
                                {subjectData.map((name) => (
                                    <MenuItem
                                        key={name.id}
                                        value={name.title}
                                    >
                                        {name.title}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <div className='col-lg-10  '>
                    <div className="mb-3 d-flex align-items-center">
                        <div className='col-md-2 text-start '>

                            <label htmlFor="exampleFormControlInput1" className="form-label mt-2">Language</label>
                        </div>
                        <FormControl className='select-width-demo' size="small">
                            <InputLabel id="demo-multiple-name-label">Select Language</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                value={selectLanguagesEnter}
                                onChange={handleChangeLanguage}
                                input={<OutlinedInput label="Select Language" />}
                                MenuProps={MenuProps}
                                className='text-start'
                            >
                                {languageGet.map((name) => (
                                    <MenuItem
                                        key={name.id}
                                        value={name.language}
                                    >
                                        {name.language}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                {
                    timeStatus !== true ? (
                        <div className='col-lg-10  text-start'>
                            <label htmlFor="exampleFormControlInput1" className="form-label mt-2">Schedule</label>
                            <div className='row  d-flex justify-content-center'>
                                <div className='col-lg-9 box-col d-flex align-items-center justify-content-around'>
                                    <h6>Monday</h6>
                                    <div className='text-start'>
                                        <lable>Start Time</lable><br />
                                        <TimeInput value={mondayStartTimes} eachInputDropdown onChange={(dateString) => setMondayStartTime(dateString)} />
                                    </div>
                                    <div className='text-start'>
                                        <lable>End Time</lable><br />
                                        <TimeInput value={mondayEndTimes} eachInputDropdown onChange={(dateString) => setMondayEndTime(dateString)} />
                                    </div>
                                </div>

                                <div className='col-lg-9 box-col d-flex align-items-center justify-content-around'>
                                    <h6>Tuesday</h6>
                                    <div className='text-start'>
                                        <lable>Start Time</lable><br />
                                        <TimeInput value={tuesdayStartTimes} eachInputDropdown onChange={(dateString) => setTuesdayStartTime(dateString)} />
                                    </div>
                                    <div className='text-start'>
                                        <lable>End Time</lable><br />
                                        <TimeInput value={tuesdayEndTimes} eachInputDropdown onChange={(dateString) => setTuesdayEndTime(dateString)} />
                                    </div>
                                </div>


                                <div className='col-lg-9 box-col d-flex align-items-center justify-content-around'>
                                    <h6>Wednesday</h6>
                                    <div className='text-start'>
                                        <lable>Start Time</lable><br />
                                        <TimeInput value={wednesdayStartTimes} eachInputDropdown onChange={(dateString) => setWednesdayStartTime(dateString)} />
                                    </div>
                                    <div className='text-start'>
                                        <lable>End Time</lable><br />
                                        <TimeInput value={wednesdayEndTimes} eachInputDropdown onChange={(dateString) => setWednesdayEndTime(dateString)} />
                                    </div>
                                </div>


                                <div className='col-lg-9 box-col d-flex align-items-center justify-content-around'>
                                    <h6>Thursday</h6>
                                    <div className='text-start'>
                                        <lable>Start Time</lable><br />
                                        <TimeInput value={thursdayStartTimes} eachInputDropdown onChange={(dateString) => setThursdayStartTime(dateString)} />
                                    </div>
                                    <div className='text-start'>
                                        <lable>End Time</lable><br />
                                        <TimeInput value={thursdayEndTimes} eachInputDropdown onChange={(dateString) => setThursdayEndTime(dateString)} />
                                    </div>
                                </div>

                                <div className='col-lg-9 box-col d-flex align-items-center justify-content-around'>
                                    <h6>Friday</h6>
                                    <div className='text-start'>
                                        <lable>Start Time</lable><br />
                                        <TimeInput value={fridayStartTimes} eachInputDropdown onChange={(dateString) => setFridayStartTime(dateString)} />
                                    </div>
                                    <div className='text-start'>
                                        <lable>End Time</lable><br />
                                        <TimeInput value={fridayEndTimes} eachInputDropdown onChange={(dateString) => setFridayEndTime(dateString)} />
                                    </div>
                                </div>

                                <div className='col-lg-9 box-col d-flex align-items-center justify-content-around'>
                                    <h6>Saturday</h6>
                                    <div className='text-start'>
                                        <lable>Start Time</lable><br />
                                        <TimeInput value={saturdayStartTimes} eachInputDropdown onChange={(dateString) => setSaturdayStartTime(dateString)} />
                                    </div>
                                    <div className='text-start'>
                                        <lable>End Time</lable><br />
                                        <TimeInput value={saturdayEndTimes} eachInputDropdown onChange={(dateString) => setSaturdayEndTime(dateString)} />
                                    </div>
                                </div>

                                <div className='col-lg-9 box-col d-flex align-items-center justify-content-around'>
                                    <h6>Sunday</h6>
                                    <div className='text-start'>
                                        <lable>Start Time</lable><br />
                                        <TimeInput value={sundayStartTimes} eachInputDropdown onChange={(dateString) => setSundayStartTime(dateString)} />
                                    </div>
                                    <div className='text-start'>
                                        <lable>End Time</lable><br />
                                        <TimeInput value={sundayEndTimes} eachInputDropdown onChange={(dateString) => setSundayEndTime(dateString)} />
                                    </div>
                                </div>

                            </div>
                        </div>
                    ) : (
                        <></>
                    )
                }
                <div className='col-lg-10  '>
                    <div className="mb-3 d-flex align-items-center">
                        <div className='col-md-2 text-start '>

                            <label htmlFor="exampleFormControlInput1" className="form-label mt-2">Consortium ID</label>
                        </div>
                        <TextField id="outlined-basic" size="small" label="Consortium ID" variant="outlined" className='select-width-demo' value={consortiumId} onChange={(e) => setConsortiumId(e.target.value)} />
                    </div>
                </div>
                <div className='col-lg-10  '>
                    <div className="mb-3 d-flex align-items-center">
                        <div className='col-md-2 text-start '>

                            <label htmlFor="exampleFormControlInput1" className="form-label mt-2">First Name</label>
                        </div>
                        <div>
                            <TextField id="outlined-basic" size="small" label="First Name" variant="outlined" className='select-width-demo' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className='col-lg-10  '>
                    <div className="mb-3 d-flex align-items-center">
                        <div className='col-md-2 text-start '>

                            <label htmlFor="exampleFormControlInput1" className="form-label mt-2">Last Name</label>
                        </div>
                        <div>
                            <TextField id="outlined-basic" size="small" label="Last Name" variant="outlined" className='select-width-demo' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className='col-lg-10  '>
                    <div className="mb-3 d-flex align-items-center">
                        <div className='col-md-2 text-start '>
                            <label htmlFor="exampleFormControlInput1" className="form-label mt-2">Email</label>
                        </div>
                        <div>
                            <TextField id="outlined-basic" size="small" label="Email" variant="outlined" className='select-width-demo' value={email} onChange={(e) => setEMail(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className='col-lg-10  '>
                    <div className="mb-3 d-flex align-items-center">
                        <div className='col-md-2 text-start '>

                            <label htmlFor="exampleFormControlInput1" className="form-label mt-2">Mobile</label>
                        </div>
                        <div>
                            <TextField id="outlined-basic" size="small" label="Mobile No." type="number" placeholder='(100)-000-00000' variant="outlined" className='select-width-demo' value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className='col-lg-10  '>
                    <div className="mb-3 d-flex align-items-center">
                        <div className='col-md-2 text-start '>

                            <label htmlFor="exampleFormControlInput1" className="form-label mt-2">Address</label>
                        </div>
                        <div>
                            <TextField id="outlined-basic" size="small" label="Address" variant="outlined" className='select-width-demo' value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className='col-lg-10 '>
                    <div className="mb-3 d-flex align-items-center">
                        <div className='col-md-2 text-start '>
                            <label htmlFor="exampleFormControlInput1" className="form-label mt-2">Gender</label>
                        </div>
                        <FormControl className='select-width-demo' size="small">
                            <InputLabel id="demo-controlled-open-select-label">Gender</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={genderOpen}
                                onClose={handleCloseGender}
                                onOpen={handleOpenGender}
                                value={gender}
                                label="Gender"
                                className='text-start'
                                onChange={handleChangeGender}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>

                            </Select>
                        </FormControl>

                    </div>
                </div>
                <div className="col-lg-10 ">
                    <div className="mb-3 d-flex align-items-center">
                        <div className="col-md-2 text-start ">
                            <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label mt-2"
                            >
                                Password
                            </label>
                        </div>
                        <div>
                            <OutlinedInput
                                className="select-width-demo"
                                id="outlined-adornment-password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                size="small"
                                onChange={handleChangepassword}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Enter Your Password"
                            />
                        </div>
                    </div>
                </div>
                <div className='col-md-11 mt-4 pt-3 pb-3 mb-5' style={{ borderBottom: "1px solid #838383", borderTop: "1px solid #838383" }}>
                    <button className='btn btn-save me-2' onClick={updateUserData}>
                        {loading == true ? <Spinner animation="border" /> : <span>Update</span>} </button>
                    <button className='btn btn-Cancel' onClick={() => {
                        navigate("/sidebar/user")
                    }
                    }>Cancel</button>
                </div>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                    toastOptions={{
                        duration: 5000,
                        success: {
                            duration: 3000,
                        },
                    }}
                />
            </div>
        </div>
    )
}

export default UpdateSingleUserData