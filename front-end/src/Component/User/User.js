import React, { useEffect, useState } from "react";
import "./User.css";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { BACKEND_URI } from "../../config/config";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { Link } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import "rc-time-picker/assets/index.css";
import TimeInput from "react-time-picker-input";
import Spinner from 'react-bootstrap/Spinner';
import toast, { Toaster } from 'react-hot-toast';
import { toSeconds } from "../../Convertor"
import DataTable, { createTheme } from 'react-data-table-component';
import { BiLogOut } from "react-icons/bi"
import { MdDelete } from "react-icons/md"
import Modal from "react-bootstrap/Modal";
import { CSVLink } from "react-csv";
import { secondsToHmsssss } from "../../Convertor"
import Placeholder from 'react-bootstrap/Placeholder';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

function getStylesAgency(name, personNameEnter, theme) {
  return {
    fontWeight:
      personNameEnter.indexOf(name) === -1
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

function User() {
  const [status, setStatus] = useState(false);
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [selectLanguages, setSelectLanguages] = useState([]);
  const [selectPrograms, setSelectProgram] = useState([]);
  const [selectSchools, setSelectSchool] = useState([]);
  const [selectGrades, setSelectGrades] = useState([]);
  const [selectSubjects, setSelectSubjects] = useState([]);
  const [personNameEnter, setPersonNameEnter] = useState([]);
  const [selectLanguagesEnter, setSelectLanguagesEnter] = useState([]);
  const [selectProgramsEnter, setSelectProgramEnter] = useState([]);
  const [selectSchoolsEnter, setSelectSchoolEnter] = useState([]);
  const [selectGradesEnter, setSelectGradesEnter] = useState([]);
  const [selectSubjectsEnter, setSelectSubjectsEnter] = useState([]);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [reTypePassword, setReTypePassword] = useState("");
  const [showreTypePassword, setShowreTypePassword] = useState(false);
  // ........Time Pick .................//
  const [mondayStartTimes, setMondayStartTime] = useState("");
  const [mondayEndTimes, setMondayEndTime] = useState("");
  const [tuesdayStartTimes, setTuesdayStartTime] = useState("");
  const [tuesdayEndTimes, setTuesdayEndTime] = useState("");
  const [wednesdayStartTimes, setWednesdayStartTime] = useState("");
  const [wednesdayEndTimes, setWednesdayEndTime] = useState("");
  const [thursdayStartTimes, setThursdayStartTime] = useState("");
  const [thursdayEndTimes, setThursdayEndTime] = useState("");
  const [fridayStartTimes, setFridayStartTime] = useState("");
  const [fridayEndTimes, setFridayEndTime] = useState("");
  const [saturdayStartTimes, setSaturdayStartTime] = useState("");
  const [saturdayEndTimes, setSaturdayEndTime] = useState("");
  const [sundayStartTimes, setSundayStartTime] = useState("");
  const [sundayEndTimes, setSundayEndTime] = useState("");
  const [lodaing, setloading] = useState(false)
  const [age, setAge] = useState("");
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("");
  const [roleOpen, setRoleOpen] = useState(false);
  const [timeZone, setTimeZone] = useState([]);
  const [timeZoneOpen, setTimeZoneOpen] = useState(false);
  const [gender, setGender] = useState("");
  const [genderOpen, setGenderOpen] = useState(false);
  // user api function
  const [agencyData, setAgencyData] = useState([]);
  const [programData, setProgramData] = useState([]);
  const [schoolsData, setSchoolData] = useState([]);
  const [gradeData, setGradeData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [timeZoneGet, setTimeZoneGet] = useState([]);
  const [languageGet, setLanguageGet] = useState([]);
  const [userAllData, setUserAllData] = useState([]);
  const [consortiumId, setConsortiumId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEMail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [dataError, setDataError] = useState(false);
  const [active, setActive] = useState(true);
  const [activeStatus, setActiveStatus] = useState(true);
  const [activeShow, setActiveShow] = useState(0);
  const [userByNameShow, setUserByNameShow] = useState("Teacher")
  const [getAgencyDataFalse, setGetAgencyDataFalse] = useState([]);
  const [userActive, setUserActive] = useState(0)
  const [userInactive, setUserInactive] = useState(0)
  const [loadingActive, setLoadingActive] = useState(false)
  const [tableLoading, setTableLoading] = useState(false)
  const [modalShow, setModalShow] = useState(false);
  const [scheduleTableId, setscheduleTableId] = useState("");
  const [search, setSearch] = useState("")
  const [searchInactive, setSearchInactive] = useState("")
  const [filterSearch, setFilterSearch] = useState([])
  const [filterSearchInactive, setFilterSearchInactive] = useState([])
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [csvInactiveDate, setCsvInactiveDate] = useState([])
  const [csvData, setCsvDate] = useState([])
  const [sckelton, setSckelton] = useState(false);
  // ...........Show Password functon ....................//

  const columns = [
    {
      name: <span style={{ fontSize: "15px", fontWeight: "600" }}>Full Name</span>,
      selector: row => `${row.firstName} ${row.lastName}`,
      sortable: true,
      grow: 1
    },
    {
      name: <span style={{ fontSize: "15px", fontWeight: "600" }}>Email</span>,
      selector: row => row.email,
      sortable: true,

    },

    {
      name: <span style={{ fontSize: "15px", fontWeight: "600" }}>Mobile</span>,
      selector: row => row.mobileNumber,
      sortable: true
    },
    {
      name: <span style={{ fontSize: "15px", fontWeight: "600" }}>Agency</span>,
      selector: row => row.personNameEnter.length > 0 ? row.personNameEnter.join(',') : <div style={{ fontSize: "18px" }}>-</div>,
      sortable: true,
      grow: 2
    },
    {
      name: <span style={{ fontSize: "15px", fontWeight: "600" }}>Program</span>,
      selector: row => row.selectProgramsEnter.length > 0 ? row.selectProgramsEnter.join(',') : <div style={{ fontSize: "18px" }}>-</div>,
      sortable: true,
      grow: 2
    },
    {
      name: <span style={{ fontSize: "15px", fontWeight: "600" }}>Location</span>,
      selector: row => row.address,
      sortable: true,
      grow: 1
    },
    {
      name: <span style={{ fontSize: "15px", fontWeight: "600" }}>Status</span>,
      cell: (row) => row.activeStatus == "false" ? <button className='btn btn-Inactive' size="sm">Inactive</button> : <button className='btn btn-active' size="sm">Active</button>
    },
    {
      name: <span style={{ fontSize: "15px", fontWeight: "600" }}>Control</span>,
      cell: (row) => (
        <>
          {
            activeShow == 1 ? (
              <>
                <button className="btn btn-xs btn-warnings me-2 mt-1" style={{ paddibg: "0" }} title="Update" onClick={(e) => UserDataDelete(row._id, row.activeStatus)}><BiLogOut style={{ color: "white" }} size={20}></BiLogOut></button>
                <button className="btn btn-xxs btn-dangers mt-1 hidden-data" style={{ color: "white" }} title="Delete" onClick={() => userDeletePermanent(row._id)}><MdDelete size={20} /></button>
              </>
            ) : (
              <>
                <Link to={`/sidebar/view_single_User_Data/${row._id}`} style={{ textDecoration: "none" }}><button className="btn btn-xs btn-infoss me-2 mt-1" style={{ paddibg: "0" }} title="View"><i className="fa-solid fa-eye" style={{ color: "white" }}></i></button></Link>
                <Link to={`/sidebar/update_single_user_data/${row._id}`} style={{ textDecoration: "none" }}><button className="btn btn-xs btn-warnings me-2 mt-1" style={{ paddibg: "0" }} title="Update"><i className="fa-solid fa-pencil" style={{ color: "white" }}></i></button></Link>
                <button className="btn btn-xxs btn-dangers mt-1 hidden-data" title="Delete" onClick={(e) => UserDataDelete(row._id, row.activeStatus)}><i className="fa-solid fa-xmark" style={{ color: "white" }}></i></button>
              </>
            )
          }

        </>
      ),

    }
  ];
  createTheme('solarized', {
    background: {
      default: '#c0dfdf',

    },
    text: {
      primary: '#08272a',
      secondary: '#08272a',
    },
  });


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleChangepassword = (e) => {
    setPassword(e.target.value);
  };

  const handleClickTypeShowPassword = () => {
    setShowreTypePassword(!showreTypePassword);
  };

  const handleChangeTypePassword = (e) => {
    setReTypePassword(e.target.value);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeOne = (event) => {
    const {
      target: { value },
    } = event;
    setSelectLanguages(typeof value === "string" ? value.split(",") : value);
  };
  const handleChangeTwo = (event) => {
    const {
      target: { value },
    } = event;
    setSelectProgram(
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeThree = (event) => {

    const {
      target: { value },
    } = event;
    setSelectSchool(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeFour = (event) => {
    const {
      target: { value },
    } = event;
    setSelectGrades(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeFive = (event) => {
    const {
      target: { value },
    } = event;
    setSelectSubjects(

      typeof value === "string" ? value.split(",") : value
    );
  };
  const userByNameShowHandle = (e) => {
    setUserByNameShow(e.target.value);

  }
  // Add user Select Box
  const handleChangeAgency = (event) => {
    const {
      target: { value },
    } = event;
    setPersonNameEnter(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangePrograms = (event) => {
    const {
      target: { value },
    } = event;
    setSelectProgramEnter(
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeSchool = (event) => {
    const {
      target: { value },
    } = event;
    setSelectSchoolEnter(
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeGrade = (event) => {
    const {
      target: { value },
    } = event;
    setSelectGradesEnter(
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeSubjects = (event) => {
    const {
      target: { value },
    } = event;
    setSelectSubjectsEnter(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeLanguage = (event) => {
    const {
      target: { value },
    } = event;
    setSelectLanguagesEnter(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangesix = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
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

  //............................user api function .......................//

  const changeAgenciews = () => {
    setStatus(!status);
    setPassword("")
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
  };
  const userDataSave = async () => {
    let data = new Date()
    let dateTime = data.toDateString();
    let stuent_data = JSON.parse(localStorage.getItem("studentNest"));
    let First_Name = stuent_data.firstName
    let Last_Name = stuent_data.lastName
    let status = `User has been Created by ${First_Name} ${Last_Name}`
    try {
      if (
        !firstName || !lastName || !email || !mobileNumber || !address || !password
      ) {
        setDataError(true);
        return false;
      }
      if (password !== reTypePassword) {
        setPasswordError(true);
        return false;
      }
      setloading(true)
      let mondayStartTime = toSeconds(mondayStartTimes);
      let mondayEndTime = toSeconds(mondayEndTimes);
      let tuesdayStartTime = toSeconds(tuesdayStartTimes);
      let tuesdayEndTime = toSeconds(tuesdayEndTimes);
      let wednesdayStartTime = toSeconds(wednesdayStartTimes);
      let wednesdayEndTime = toSeconds(wednesdayEndTimes);
      let thursdayStartTime = toSeconds(thursdayStartTimes);
      let thursdayEndTime = toSeconds(thursdayEndTimes);
      let fridayStartTime = toSeconds(fridayStartTimes);
      let fridayEndTime = toSeconds(fridayEndTimes);
      let saturdayStartTime = toSeconds(saturdayStartTimes);
      let saturdayEndTime = toSeconds(saturdayEndTimes);
      let sundayStartTime = toSeconds(sundayStartTimes);
      let sundayEndTime = toSeconds(sundayEndTimes)
      await axios
        .post(`${BACKEND_URI}/User_Data`, {
          role, timeZone, personNameEnter, selectProgramsEnter, selectSchoolsEnter, selectGradesEnter, selectSubjectsEnter, selectLanguagesEnter, consortiumId, gender, firstName, lastName, email,
          mobileNumber, address, password, active, activeStatus, mondayStartTime, mondayEndTime, tuesdayStartTime, tuesdayEndTime, wednesdayStartTime, wednesdayEndTime, thursdayStartTime, thursdayEndTime, fridayStartTime,
          fridayEndTime, saturdayStartTime, saturdayEndTime, sundayStartTime, sundayEndTime,
        })
        .then(async (userRes) => {
          // console.log(userRes.data);

          // let roleCheck = userRes?.data?.emailCheck[0]?.role
          if (userRes.data.result == "Duplicate") {
            toast.error(`Email Already Used ! Please Use Another Email`)
            setloading(false)
          } else {
            if (userRes) {
              await axios.post(`${BACKEND_URI}/activity_Log`, {
                First_Name,
                Last_Name,
                dateTime,
                status
              }).then((resactivty) => {
              })
            }
            setRole("")
            setTimeZone([])
            setPersonNameEnter([]);
            setSelectProgramEnter([]);
            setSelectSchoolEnter([])
            setSelectGradesEnter([])
            setSelectSubjectsEnter([]);
            setSelectLanguagesEnter([])
            setGender('')
            setConsortiumId('')
            setFirstName("")
            setLastName("")
            setEMail("")
            setMobileNumber('')
            setAddress("")
            setPassword("")
            setMondayStartTime("")
            setMondayEndTime("")
            setTuesdayStartTime("")
            setTuesdayEndTime("")
            setWednesdayStartTime("")
            setThursdayStartTime("")
            setReTypePassword("")
            setThursdayEndTime("")
            setFridayStartTime("")
            setFridayEndTime("")
            setSaturdayStartTime("")
            setSaturdayEndTime('')
            setSundayStartTime("");
            setSundayEndTime("");
            toast.success("Data Submit successfully")
            setStatus(false);
            setloading(false)
            getUserAllDatas();

          }

        });

    } catch (e) {
      console.log("e", e);
      setloading(false)
      toast.error("May be Server Error! Please Refresh Page")
    }
  };

  const getUserAllDatas = async () => {
    try {
      setTableLoading(true)
      setSckelton(true)
      document.getElementById("Abble").style.display = "none"
      await axios.get(`${BACKEND_URI}/User_Data`).then((allyerDataRes) => {
        let arry = [];
        let arryfalse = [];
        let csvInactiveArry = [];
        let csvActiveArray = []
        for (var i = 0; i < allyerDataRes.data.length; i++) {
          let statusCheck = allyerDataRes.data[i].activeStatus;
          let roleCheck = allyerDataRes.data[i].role
          if (activeShow == 1) {
            if (statusCheck == "false" && roleCheck == userByNameShow) {
              let address = allyerDataRes.data[i].address;
              let role = allyerDataRes.data[i].role;
              let firstName = allyerDataRes.data[i].firstName;
              let lastName = allyerDataRes.data[i].lastName;
              let personNameEnter = allyerDataRes.data[i].personNameEnter;
              let email = allyerDataRes.data[i].email;
              let mobileNumber = allyerDataRes.data[i].mobileNumber;
              let gender = allyerDataRes.data[i].gender;
              let timeZone = allyerDataRes.data[i].timeZone;
              let selectProgramsEnter = allyerDataRes.data[i].selectProgramsEnter;
              let selectSchoolsEnter = allyerDataRes.data[i].selectSchoolsEnter;
              let selectGradesEnter = allyerDataRes.data[i].selectGradesEnter;
              let selectSubjectsEnter = allyerDataRes.data[i].selectSubjectsEnter;
              let selectLanguagesEnter = allyerDataRes.data[i].selectLanguagesEnter;
              let mondayStartTime = secondsToHmsssss(allyerDataRes.data[i].mondayStartTime);
              const [hourString, minute] = mondayStartTime.split(":");
              const hour = +hourString % 24;
              let monday_time_Chnage = (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
              let mondayEndTime = secondsToHmsssss(allyerDataRes.data[i].mondayEndTime);
              const [hourStrings, minutes] = mondayEndTime.split(":");
              const hours = +hourStrings % 24;
              let monday_End_time_Chnage = (hours % 12 || 12) + ":" + minutes + (hours < 12 ? " AM" : " PM");
              let tuesdayStartTime = secondsToHmsssss(allyerDataRes.data[i].tuesdayStartTime);
              const [hourStringTuesday_start_time, minuteTuesday_start_time] = tuesdayStartTime.split(":");
              const hourTuesday_start_time = +hourStringTuesday_start_time % 24;
              let Tuesday_start_time_Chnage = (hourTuesday_start_time % 12 || 12) + ":" + minuteTuesday_start_time + (hourTuesday_start_time < 12 ? " AM" : " PM")
              let tuesdayEndTime = secondsToHmsssss(allyerDataRes.data[i].tuesdayEndTime);
              const [hourStringTuesday_End_time, minuteTuesday_End_time] = tuesdayEndTime.split(":");
              const hourTuesday_End_time = +hourStringTuesday_End_time % 24;
              let Tuesday_End_time_Chnage = (hourTuesday_End_time % 12 || 12) + ":" + minuteTuesday_End_time + (hourTuesday_End_time < 12 ? " AM" : " PM")
              let wednesdayStartTime = secondsToHmsssss(allyerDataRes.data[i].wednesdayStartTime);
              const [hourStringWednesday_start_Time, minuteWednesday_start_Time] = wednesdayStartTime.split(":");
              const hourWednesday_start_Time = +hourStringWednesday_start_Time % 24;
              let Wednesday_start_Time_Chnage = (hourWednesday_start_Time % 12 || 12) + ":" + minuteWednesday_start_Time + (hourWednesday_start_Time < 12 ? " AM" : " PM")
              let wednesdayEndTime = secondsToHmsssss(allyerDataRes.data[i].wednesdayEndTime);
              const [hourStringWednesday_End_Time, minuteWednesday_End_Time] = wednesdayEndTime.split(":");
              const hourWednesday_End_Time = +hourStringWednesday_End_Time % 24;
              let Wednesday_End_Time_Chnage = (hourWednesday_End_Time % 12 || 12) + ":" + minuteWednesday_End_Time + (hourWednesday_End_Time < 12 ? " AM" : " PM")
              let thursdayStartTime = secondsToHmsssss(allyerDataRes.data[i].thursdayStartTime);
              const [hourStringThursday_Start_Time, minuteThursday_Start_Time] = thursdayStartTime.split(":");
              const hourThursday_Start_Time = +hourStringThursday_Start_Time % 24;
              let Thursday_Start_Time_Chnage = (hourThursday_Start_Time % 12 || 12) + ":" + minuteThursday_Start_Time + (hourThursday_Start_Time < 12 ? " AM" : " PM")
              let thursdayEndTime = secondsToHmsssss(allyerDataRes.data[i].thursdayEndTime);
              const [hourStringThursday_End_Time, minuteThursday_End_Time] = thursdayEndTime.split(":");
              const hourThursday_End_Time = +hourStringThursday_End_Time % 24;
              let Thursday_End_Time_Chnage = (hourThursday_End_Time % 12 || 12) + ":" + minuteThursday_End_Time + (hourThursday_End_Time < 12 ? " AM" : " PM")
              let fridayStartTime = secondsToHmsssss(allyerDataRes.data[i].fridayStartTime);
              const [hourStringFriday_Start_Time, minuteFriday_Start_Time] = fridayStartTime.split(":");
              const hourFriday_Start_Time = +hourStringFriday_Start_Time % 24;
              let Friday_Start_Time_Chnage = (hourFriday_Start_Time % 12 || 12) + ":" + minuteFriday_Start_Time + (hourFriday_Start_Time < 12 ? " AM" : " PM")
              let fridayEndTime = secondsToHmsssss(allyerDataRes.data[i].fridayEndTime);
              const [hourStringFriday_End_Time, minuteFriday_End_Time] = fridayEndTime.split(":");
              const hourFriday_End_Time = +hourStringFriday_End_Time % 24;
              let Friday_End_Time_Chnage = (hourFriday_End_Time % 12 || 12) + ":" + minuteFriday_End_Time + (hourFriday_End_Time < 12 ? " AM" : " PM")
              let saturdayStartTime = secondsToHmsssss(allyerDataRes.data[i].saturdayStartTime);
              const [hourStringSaturday_Start_Time, minuteSaturday_Start_Time] = saturdayStartTime.split(":");
              const hourSaturday_Start_Time = +hourStringSaturday_Start_Time % 24;
              let Saturday_Start_Time_Chnage = (hourSaturday_Start_Time % 12 || 12) + ":" + minuteSaturday_Start_Time + (hourSaturday_Start_Time < 12 ? " AM" : " PM")
              let saturdayEndTime = secondsToHmsssss(allyerDataRes.data[i].saturdayEndTime);
              const [hourStringSaturday_End_Time, minuteSaturday_End_Time] = saturdayEndTime.split(":");
              const hourSaturday_End_Time = +hourStringSaturday_End_Time % 24;
              let Saturday_End_Time_Chnage = (hourSaturday_End_Time % 12 || 12) + ":" + minuteSaturday_End_Time + (hourSaturday_End_Time < 12 ? " AM" : " PM")
              let sundayStartTime = secondsToHmsssss(allyerDataRes.data[i].sundayStartTime);
              const [hourStringSunday_Start_Time, minuteSunday_Start_Time] = sundayStartTime.split(":");
              const hourSunday_Start_Time = +hourStringSunday_Start_Time % 24;
              let Sunday_Start_Time_Chnage = (hourSunday_Start_Time % 12 || 12) + ":" + minuteSunday_Start_Time + (hourSunday_Start_Time < 12 ? " AM" : " PM")
              let sundayEndTime = secondsToHmsssss(allyerDataRes.data[i].sundayEndTime);
              const [hourStringSunday_End_Time, minuteSunday_End_Time] = sundayEndTime.split(":");
              const hourSunday_End_Time = +hourStringSunday_End_Time % 24;
              let Sunday_End_Time_Chnage = (hourSunday_End_Time % 12 || 12) + ":" + minuteSunday_End_Time + (hourSunday_End_Time < 12 ? " AM" : " PM")
              csvInactiveArry.push({
                address: address, role: role, firstName: firstName, lastName: lastName, personNameEnter: personNameEnter, email: email,
                mobileNumber: mobileNumber, gender: gender, timeZone: timeZone, selectProgramsEnter: selectProgramsEnter, selectSchoolsEnter: selectSchoolsEnter,
                selectGradesEnter: selectGradesEnter, selectSubjectsEnter: selectSubjectsEnter, selectSubjectsEnter: selectSubjectsEnter, selectLanguagesEnter: selectLanguagesEnter,
                mondayStartTime: monday_time_Chnage, mondayEndTime: monday_End_time_Chnage, tuesdayStartTime: Tuesday_start_time_Chnage, tuesdayEndTime: Tuesday_End_time_Chnage, wednesdayStartTime: Wednesday_start_Time_Chnage,
                thursdayStartTime: Thursday_Start_Time_Chnage, thursdayEndTime: Thursday_End_Time_Chnage, fridayStartTime: Friday_Start_Time_Chnage, saturdayStartTime: Saturday_Start_Time_Chnage, saturdayEndTime: Saturday_End_Time_Chnage,
                sundayStartTime: Sunday_Start_Time_Chnage, sundayEndTime: Sunday_End_Time_Chnage, wednesdayEndTime: Wednesday_End_Time_Chnage, fridayEndTime: Friday_End_Time_Chnage
              })
              arryfalse.push(allyerDataRes.data[i]);
            }
          } else {
            if (statusCheck == "true" && roleCheck == userByNameShow) {
              let address = allyerDataRes.data[i].address;
              let role = allyerDataRes.data[i].role;
              let firstName = allyerDataRes.data[i].firstName;
              let lastName = allyerDataRes.data[i].lastName;
              let personNameEnter = allyerDataRes.data[i].personNameEnter;
              let email = allyerDataRes.data[i].email;
              let mobileNumber = allyerDataRes.data[i].mobileNumber;
              let gender = allyerDataRes.data[i].gender;
              let timeZone = allyerDataRes.data[i].timeZone;
              let selectProgramsEnter = allyerDataRes.data[i].selectProgramsEnter;
              let selectSchoolsEnter = allyerDataRes.data[i].selectSchoolsEnter;
              let selectGradesEnter = allyerDataRes.data[i].selectGradesEnter;
              let selectSubjectsEnter = allyerDataRes.data[i].selectSubjectsEnter;
              let selectLanguagesEnter = allyerDataRes.data[i].selectLanguagesEnter;
              let mondayStartTime = secondsToHmsssss(allyerDataRes.data[i].mondayStartTime);
              const [hourString, minute] = mondayStartTime.split(":");
              const hour = +hourString % 24;
              let monday_time_Chnage = (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
              let mondayEndTime = secondsToHmsssss(allyerDataRes.data[i].mondayEndTime);
              const [hourStrings, minutes] = mondayEndTime.split(":");
              const hours = +hourStrings % 24;
              let monday_End_time_Chnage = (hours % 12 || 12) + ":" + minutes + (hours < 12 ? " AM" : " PM");
              let tuesdayStartTime = secondsToHmsssss(allyerDataRes.data[i].tuesdayStartTime);
              const [hourStringTuesday_start_time, minuteTuesday_start_time] = tuesdayStartTime.split(":");
              const hourTuesday_start_time = +hourStringTuesday_start_time % 24;
              let Tuesday_start_time_Chnage = (hourTuesday_start_time % 12 || 12) + ":" + minuteTuesday_start_time + (hourTuesday_start_time < 12 ? " AM" : " PM")
              let tuesdayEndTime = secondsToHmsssss(allyerDataRes.data[i].tuesdayEndTime);
              const [hourStringTuesday_End_time, minuteTuesday_End_time] = tuesdayEndTime.split(":");
              const hourTuesday_End_time = +hourStringTuesday_End_time % 24;
              let Tuesday_End_time_Chnage = (hourTuesday_End_time % 12 || 12) + ":" + minuteTuesday_End_time + (hourTuesday_End_time < 12 ? " AM" : " PM")
              let wednesdayStartTime = secondsToHmsssss(allyerDataRes.data[i].wednesdayStartTime);
              const [hourStringWednesday_start_Time, minuteWednesday_start_Time] = wednesdayStartTime.split(":");
              const hourWednesday_start_Time = +hourStringWednesday_start_Time % 24;
              let Wednesday_start_Time_Chnage = (hourWednesday_start_Time % 12 || 12) + ":" + minuteWednesday_start_Time + (hourWednesday_start_Time < 12 ? " AM" : " PM")
              let wednesdayEndTime = secondsToHmsssss(allyerDataRes.data[i].wednesdayEndTime);
              const [hourStringWednesday_End_Time, minuteWednesday_End_Time] = wednesdayEndTime.split(":");
              const hourWednesday_End_Time = +hourStringWednesday_End_Time % 24;
              let Wednesday_End_Time_Chnage = (hourWednesday_End_Time % 12 || 12) + ":" + minuteWednesday_End_Time + (hourWednesday_End_Time < 12 ? " AM" : " PM")
              let thursdayStartTime = secondsToHmsssss(allyerDataRes.data[i].thursdayStartTime);
              const [hourStringThursday_Start_Time, minuteThursday_Start_Time] = thursdayStartTime.split(":");
              const hourThursday_Start_Time = +hourStringThursday_Start_Time % 24;
              let Thursday_Start_Time_Chnage = (hourThursday_Start_Time % 12 || 12) + ":" + minuteThursday_Start_Time + (hourThursday_Start_Time < 12 ? " AM" : " PM")
              let thursdayEndTime = secondsToHmsssss(allyerDataRes.data[i].thursdayEndTime);
              const [hourStringThursday_End_Time, minuteThursday_End_Time] = thursdayEndTime.split(":");
              const hourThursday_End_Time = +hourStringThursday_End_Time % 24;
              let Thursday_End_Time_Chnage = (hourThursday_End_Time % 12 || 12) + ":" + minuteThursday_End_Time + (hourThursday_End_Time < 12 ? " AM" : " PM")
              let fridayStartTime = secondsToHmsssss(allyerDataRes.data[i].fridayStartTime);
              const [hourStringFriday_Start_Time, minuteFriday_Start_Time] = fridayStartTime.split(":");
              const hourFriday_Start_Time = +hourStringFriday_Start_Time % 24;
              let Friday_Start_Time_Chnage = (hourFriday_Start_Time % 12 || 12) + ":" + minuteFriday_Start_Time + (hourFriday_Start_Time < 12 ? " AM" : " PM")
              let fridayEndTime = secondsToHmsssss(allyerDataRes.data[i].fridayEndTime);
              const [hourStringFriday_End_Time, minuteFriday_End_Time] = fridayEndTime.split(":");
              const hourFriday_End_Time = +hourStringFriday_End_Time % 24;
              let Friday_End_Time_Chnage = (hourFriday_End_Time % 12 || 12) + ":" + minuteFriday_End_Time + (hourFriday_End_Time < 12 ? " AM" : " PM")
              let saturdayStartTime = secondsToHmsssss(allyerDataRes.data[i].saturdayStartTime);
              const [hourStringSaturday_Start_Time, minuteSaturday_Start_Time] = saturdayStartTime.split(":");
              const hourSaturday_Start_Time = +hourStringSaturday_Start_Time % 24;
              let Saturday_Start_Time_Chnage = (hourSaturday_Start_Time % 12 || 12) + ":" + minuteSaturday_Start_Time + (hourSaturday_Start_Time < 12 ? " AM" : " PM")
              let saturdayEndTime = secondsToHmsssss(allyerDataRes.data[i].saturdayEndTime);
              const [hourStringSaturday_End_Time, minuteSaturday_End_Time] = saturdayEndTime.split(":");
              const hourSaturday_End_Time = +hourStringSaturday_End_Time % 24;
              let Saturday_End_Time_Chnage = (hourSaturday_End_Time % 12 || 12) + ":" + minuteSaturday_End_Time + (hourSaturday_End_Time < 12 ? " AM" : " PM")
              let sundayStartTime = secondsToHmsssss(allyerDataRes.data[i].sundayStartTime);
              const [hourStringSunday_Start_Time, minuteSunday_Start_Time] = sundayStartTime.split(":");
              const hourSunday_Start_Time = +hourStringSunday_Start_Time % 24;
              let Sunday_Start_Time_Chnage = (hourSunday_Start_Time % 12 || 12) + ":" + minuteSunday_Start_Time + (hourSunday_Start_Time < 12 ? " AM" : " PM")
              let sundayEndTime = secondsToHmsssss(allyerDataRes.data[i].sundayEndTime);
              const [hourStringSunday_End_Time, minuteSunday_End_Time] = sundayEndTime.split(":");
              const hourSunday_End_Time = +hourStringSunday_End_Time % 24;
              let Sunday_End_Time_Chnage = (hourSunday_End_Time % 12 || 12) + ":" + minuteSunday_End_Time + (hourSunday_End_Time < 12 ? " AM" : " PM")
              csvActiveArray.push({
                address: address, role: role, firstName: firstName, lastName: lastName, personNameEnter: personNameEnter, email: email,
                mobileNumber: mobileNumber, gender: gender, timeZone: timeZone, selectProgramsEnter: selectProgramsEnter, selectSchoolsEnter: selectSchoolsEnter,
                selectGradesEnter: selectGradesEnter, selectSubjectsEnter: selectSubjectsEnter, selectSubjectsEnter: selectSubjectsEnter, selectLanguagesEnter: selectLanguagesEnter,
                mondayStartTime: monday_time_Chnage, mondayEndTime: monday_End_time_Chnage, tuesdayStartTime: Tuesday_start_time_Chnage, tuesdayEndTime: Tuesday_End_time_Chnage, wednesdayStartTime: Wednesday_start_Time_Chnage,
                thursdayStartTime: Thursday_Start_Time_Chnage, thursdayEndTime: Thursday_End_Time_Chnage, fridayStartTime: Friday_Start_Time_Chnage, saturdayStartTime: Saturday_Start_Time_Chnage, saturdayEndTime: Saturday_End_Time_Chnage,
                sundayStartTime: Sunday_Start_Time_Chnage, sundayEndTime: Sunday_End_Time_Chnage, wednesdayEndTime: Wednesday_End_Time_Chnage, fridayEndTime: Friday_End_Time_Chnage
              })
              arry.push(allyerDataRes.data[i]);
            }
          }
        }
        setCsvInactiveDate(csvInactiveArry)
        setCsvDate(csvActiveArray)
        setUserActive(arryfalse.length)
        setGetAgencyDataFalse(arryfalse);
        setFilterSearchInactive(arryfalse)
        setUserInactive(arry.length)
        setUserAllData(arry);
        setFilterSearch(arry)
        document.getElementById("Abble").style.display = "Block"
        setTableLoading(false)
        setSckelton(false)
      });
    } catch (e) {
      console.log("e", e);
      setSckelton(false)
    }
  };

  const headers = [
    {
      label: "Role", key: "role",
    },
    {
      label: "FirstName", key: "firstName"
    },
    {
      label: "LastName", key: "lastName"
    },
    {
      label: "Agency", key: "personNameEnter"
    },
    {
      label: "Email", key: "email"
    },
    {
      label: "PhoneNo", key: "mobileNumber"
    },
    {
      label: "Address", key: "address"
    },
    {
      label: "Gender", key: "gender"
    },
    {
      label: "timeZone", key: "timeZone"
    },
    {
      label: "Program", key: 'selectProgramsEnter'
    },
    {
      label: "School", key: "selectSchoolsEnter",
    },
    {
      label: "Grade", key: "selectGradesEnter"
    },
    {
      label: "Subject", key: "selectSubjectsEnter"
    },
    {
      label: "language", key: "selectLanguagesEnter"
    },
    {
      label: "Monday_Start_Time", key: "mondayStartTime"
    },
    {
      label: "Monday_End_Time", key: "mondayEndTime"
    },
    {
      label: "Tuesday_Start_Time", key: "tuesdayStartTime"
    },
    {
      label: "Tuesday_End_Time", key: "tuesdayEndTime"
    },
    {
      label: "Wednesday_Start_Time", key: "wednesdayStartTime"
    },
    {
      label: "Wednesday_End_Time", key: "wednesdayEndTime"
    },
    {
      label: "Thursday_Start_Time", key: "thursdayStartTime"
    },
    {
      label: "Thursday_End_Time", key: "thursdayEndTime"
    },
    {
      label: "Friday_Start_Time", key: "fridayStartTime"
    },
    {
      label: "Friday_End_Time", key: "fridayEndTime"
    },
    {
      label: "Saturday_Start_Time", key: "saturdayStartTime"
    },
    {
      label: "Saturday_End_Time", key: "saturdayEndTime"
    }
    ,
    {
      label: "Sunday_Start_Time", key: "sundayStartTime"
    },
    {
      label: "Sunday_End_Time", key: "sundayEndTime"
    }
  ]

  const csvLink = {
    filename: "Tutor.csv",
    headers: headers,
    data: csvData
  }

  const csvLinkInactive = {
    filename: "Tutor.csv",
    headers: headers,
    data: csvInactiveDate
  }

  const activeHandle = (e) => {
    setActiveShow(e.target.value);
  };

  const userDeletePermanent = async (ids) => {
    try {
      setscheduleTableId(ids)
      setModalShow(true)
    } catch (e) {
      console.log("e", e);
    }
  }

  // delete permanent user
  const handleDataDelete = async () => {
    try {
      setDeleteLoading(true)
      let data = new Date()
      let dateTime = data.toDateString();
      let stuent_data = JSON.parse(localStorage.getItem("studentNest"));
      let First_Name = stuent_data.firstName
      let Last_Name = stuent_data.lastName
      let status = `User has been Permanently Deleted by ${First_Name} ${Last_Name}`
      await axios.delete(`${BACKEND_URI}/delete_permanently_user/${scheduleTableId}`).then(async (resdelete) => {
        getUserAllDatas()
        setModalShow(false)
        setDeleteLoading(false)
        toast.success("User Deleted Parmanently")
        if (resdelete) {
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
      setDeleteLoading(false)
      console.log("e", e);
      toast.error("May be Server Error! Please Refresh Page")
    }
  }

  // user Active data inactive
  const UserDataDelete = async (id, status,) => {
    let activeStatus = ""
    if (status === "true") {
      setLoadingActive(true)
      activeStatus = false
      let data = new Date()
      let dateTime = data.toDateString();
      let stuent_data = JSON.parse(localStorage.getItem("studentNest"));
      let First_Name = stuent_data.firstName
      let Last_Name = stuent_data.lastName
      let status = `User has been Inactive by ${First_Name} ${Last_Name}`
      await axios
        .put(`${BACKEND_URI}/user_Single_Data_Delete/${id}`, {
          activeStatus,
        })
        .then(async (res) => {
          toast.error("Tutor Inactive successfully")
          setLoadingActive(false)
          getUserAllDatas();
          if (res) {
            await axios.post(`${BACKEND_URI}/activity_Log`, {
              First_Name,
              Last_Name,
              dateTime,
              status
            }).then((resactivty) => {
            })
          }
        });
      await axios.delete(`${BACKEND_URI}/delete_Student_All_Data/${id}`).then((resDelete) => {
      })
    }
    else {
      setLoadingActive(true)
      activeStatus = true
      let data = new Date()
      let dateTime = data.toDateString();
      let stuent_data = JSON.parse(localStorage.getItem("studentNest"));
      let First_Name = stuent_data.firstName
      let Last_Name = stuent_data.lastName
      let status = `User has been active by ${First_Name} ${Last_Name}`
      await axios
        .put(`${BACKEND_URI}/user_Single_Data_Delete/${id}`, {
          activeStatus,
        })
        .then(async (res) => {
          toast.success("Tutor Active successfully")
          getUserAllDatas();
          setLoadingActive(false)
          if (res) {
            await axios.post(`${BACKEND_URI}/activity_Log`, {
              First_Name,
              Last_Name,
              dateTime,
              status
            }).then((resactivty) => {
            })
          }
        });
      await axios.delete(`${BACKEND_URI}/delete_Student_All_Data/${id}`).then((resDelete) => {
      })
    }


  };

  //  Search by Input
  useEffect(() => {
    const result = userAllData.filter((country) => {
      return country.firstName.toLowerCase().match(search.toLowerCase());
    })
    setFilterSearch(result)
  }, [search])
  useEffect(() => {
    const result = getAgencyDataFalse.filter((country) => {
      return country.firstName.toLowerCase().match(searchInactive.toLowerCase());
    })
    setFilterSearchInactive(result)
  }, [searchInactive])



  // Filter All configuration
  const filterValue = async () => {
    try {
      setTableLoading(true)
      await axios.get(`${BACKEND_URI}/User_Data_Filter/personName=${personName}&selectPrograms=${selectPrograms}&selectLanguages=${selectLanguages}&selectSchools=${selectSchools}&selectGrades=${selectGrades}&selectSubjects=${selectSubjects}`).then((filterData) => {
        let arry = [];
        let arryfalse = [];
        
        for (var i = 0; i < filterData.data.length; i++) {
          console.log("filterData",filterData.data[i]);
          let statusCheck = filterData.data[i].activeStatus;
          let roleCheck = filterData.data[i].role;
          if (activeShow == 1) {
            if (statusCheck == "false" && roleCheck == userByNameShow) {
              arryfalse.push(filterData.data[i]);
            }
          } else {
            if (statusCheck == "true" && roleCheck == userByNameShow) {
              // console.log("filterData",filterData.data[i]);
              arry.push(filterData.data[i]);
            }
          }
        }
        setTableLoading(false)
        setUserActive(arryfalse.length)
        setGetAgencyDataFalse(arryfalse);
        setFilterSearchInactive(arryfalse)
        setUserInactive(arry.length)
        setUserAllData(arry);
        setFilterSearch(arry)


      })
    } catch (e) {
      setTableLoading(false)
      console.log("e", e);
    }
  }

  useEffect(() => {
    allApiData();
  }, []);

  useEffect(() => {
    getUserAllDatas();
  }, [userByNameShow])
  useEffect(() => {
    getUserAllDatas();
  }, [activeShow]);
  return (

    <div className="container">
      {loadingActive == true ? <div className="d-flex justify-content-center align-items-center " style={{ height: "100vh", width: "70%", position: "fixed", zIndex: "20000" }}><div className="loader-container">
        <div className="spinner"></div>
      </div></div> : <div></div>}

      {status ? (
        <div>
          <div className="row user-box-1">
            <div className="col-lg-12 col-12  d-flex justify-content-center  justify-content-between align-items-center pt-3 pb-3">
              <h4 className="user-h4 mt-2">NEW USER</h4>
            </div>
          </div>
          <div
            className="row d-flex justify-content-center "
            style={{ background: "#c7d7df", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}
          >
            <div className="col-lg-10 ms-3  mt-2 ">
              <div className="mb-3 d-flex align-items-center">
                <div className="col-md-2 text-start">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label mt-2"
                  >
                    Role
                  </label>
                </div>
                <FormControl className="select-width-demo" size="small">
                  <InputLabel id="demo-controlled-open-select-label">
                    Role
                  </InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={roleOpen}
                    onClose={handleCloseRole}
                    onOpen={handleOpenRole}
                    value={role}
                    label="Role"
                    className="text-start"
                    onChange={handleChangeRole}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Student">Student</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                    <MenuItem value="Teacher">Tutor</MenuItem>
                    <MenuItem value="Employee">Admin Staff</MenuItem>
                    {/* <MenuItem value="Developer">Developer</MenuItem> */}
                    {/* <MenuItem value="Developer">Admin</MenuItem> */}
                  </Select>
                </FormControl>
              </div>
            </div>

            {role == "Manager" ? (
              <div className="row d-flex justify-content-center ">
                <div className="col-lg-10  ">
                  <div className="mb-3 d-flex align-items-center">
                    <div className="col-md-2 text-start ">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label mt-2"
                      >
                        Language
                      </label>
                    </div>
                    <FormControl className="select-width-demo" size="small">
                      <InputLabel id="demo-multiple-name-label">
                        Select Language
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={selectLanguagesEnter}
                        onChange={handleChangeLanguage}
                        input={<OutlinedInput label="Select Language" />}
                        MenuProps={MenuProps}
                        className="text-start"
                      >
                        {languageGet.length > 0 ? (
                          languageGet.map((name) => (
                            <MenuItem
                              key={name.id}
                              value={name.language}
                              style={getStylesAgency(
                                name,
                                personNameEnter,
                                theme
                              )}
                            >
                              {name.language}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem>No Data</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="col-lg-10  ">
                  {active ? (
                    <div className="row  d-flex justify-content-center">
                      <div className="col-lg-9 box-col d-flex align-items-center justify-content-around">
                        <h6>Monday</h6>
                        <div className="text-start">
                          <lable>Start Time</lable>
                          <br />
                          <TimeInput value={mondayStartTimes} eachInputDropdown onChange={(dateString) => setMondayStartTime(dateString)} />
                        </div>
                        <div className="text-start">
                          <lable>End Time</lable>
                          <br />
                          <TimeInput value={mondayEndTimes} eachInputDropdown onChange={(dateString) => setMondayEndTime(dateString)} />
                        </div>
                      </div>

                      <div className="col-lg-9 box-col d-flex align-items-center justify-content-around">
                        <h6>Tuesday</h6>
                        <div className="text-start">
                          <lable>Start Time</lable>
                          <br />
                          <TimeInput value={tuesdayStartTimes} eachInputDropdown onChange={(dateString) => setTuesdayStartTime(dateString)} />
                        </div>
                        <div className="text-start">
                          <lable>End Time</lable>
                          <br />
                          <TimeInput value={tuesdayEndTimes} eachInputDropdown onChange={(dateString) => setTuesdayEndTime(dateString)} />
                        </div>
                      </div>

                      <div className="col-lg-9 box-col d-flex align-items-center justify-content-around">
                        <h6>Wednesday</h6>
                        <div className="text-start">
                          <lable>Start Time</lable>
                          <br />
                          <TimeInput value={wednesdayStartTimes} eachInputDropdown onChange={(dateString) => setWednesdayStartTime(dateString)} />

                        </div>
                        <div className="text-start">
                          <lable>End Time</lable>
                          <br />
                          <TimeInput value={wednesdayEndTimes} eachInputDropdown onChange={(dateString) => setWednesdayEndTime(dateString)} />

                        </div>
                      </div>

                      <div className="col-lg-9 box-col d-flex align-items-center justify-content-around">
                        <h6>Thursday</h6>
                        <div className="text-start">
                          <lable>Start Time</lable>
                          <br />
                          <TimeInput value={thursdayStartTimes} eachInputDropdown onChange={(dateString) => setThursdayStartTime(dateString)} />

                        </div>
                        <div className="text-start">
                          <lable>End Time</lable>
                          <br />
                          <TimeInput value={thursdayEndTimes} eachInputDropdown onChange={(dateString) => setThursdayEndTime(dateString)} />

                        </div>
                      </div>

                      <div className="col-lg-9 box-col d-flex align-items-center justify-content-around">
                        <h6>Friday</h6>
                        <div className="text-start">
                          <lable>Start Time</lable>
                          <br />
                          <TimeInput value={fridayStartTimes} eachInputDropdown onChange={(dateString) => setFridayStartTime(dateString)} />

                        </div>
                        <div className="text-start">
                          <lable>End Time</lable>
                          <br />
                          <TimeInput value={fridayEndTimes} eachInputDropdown onChange={(dateString) => setFridayEndTime(dateString)} />

                        </div>
                      </div>

                      <div className="col-lg-9 box-col d-flex align-items-center justify-content-around">
                        <h6>Saturday</h6>
                        <div className="text-start">
                          <lable>Start Time</lable>
                          <br />
                          <TimeInput value={saturdayStartTimes} eachInputDropdown onChange={(dateString) => setSaturdayStartTime(dateString)} />

                        </div>
                        <div className="text-start">
                          <lable>End Time</lable>
                          <br />
                          <TimeInput value={saturdayEndTimes} eachInputDropdown onChange={(dateString) => setSaturdayEndTime(dateString)} />

                        </div>
                      </div>

                      <div className="col-lg-9 box-col d-flex align-items-center justify-content-around">
                        <h6>Sunday</h6>
                        <div className="text-start">
                          <lable>Start Time</lable>
                          <br />
                          <TimeInput value={sundayStartTimes} eachInputDropdown onChange={(dateString) => setSundayStartTime(dateString)} />

                        </div>
                        <div className="text-start">
                          <lable>End Time</lable>
                          <br />
                          <TimeInput value={sundayEndTimes} eachInputDropdown onChange={(dateString) => setSundayEndTime(dateString)} />

                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ) : role == "Employee" ? (
              <div className="row d-flex justify-content-center ">
                <div className="col-lg-10  ">
                  <div className="mb-3 d-flex align-items-center">
                    <div className="col-md-2 text-start ">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label mt-2"
                      >
                        Language
                      </label>
                    </div>
                    <FormControl className="select-width-demo" size="small">
                      <InputLabel id="demo-multiple-name-label">
                        Select Language
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={selectLanguagesEnter}
                        onChange={handleChangeLanguage}
                        input={<OutlinedInput label="Select Language" />}
                        MenuProps={MenuProps}
                        className="text-start"
                      >
                        {languageGet.length > 0 ? (
                          languageGet.map((name) => (
                            <MenuItem
                              key={name.id}
                              value={name.language}
                              style={getStylesAgency(
                                name,
                                personNameEnter,
                                theme
                              )}
                            >
                              {name.language}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem>No Data</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
            ) : role == "Developer" ? (
              <div className="row d-flex justify-content-center ">
                <div className="col-lg-10  ">
                  <div className="mb-3 d-flex align-items-center">
                    <div className="col-md-2 text-start ">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label mt-2"
                      >
                        Language
                      </label>
                    </div>
                    <FormControl className="select-width-demo" size="small">
                      <InputLabel id="demo-multiple-name-label">
                        Select Language
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={selectLanguagesEnter}
                        onChange={handleChangeLanguage}
                        input={<OutlinedInput label="Select Language" />}
                        MenuProps={MenuProps}
                        className="text-start"
                      >
                        {languageGet.length > 0 ? (
                          languageGet.map((name) => (
                            <MenuItem
                              key={name.id}
                              value={name.language}
                              style={getStylesAgency(
                                name,
                                personNameEnter,
                                theme
                              )}
                            >
                              {name.language}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem>No Data</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
            ) : role == "Student" ? (
              <div className="row d-flex justify-content-center">
                <div className="col-lg-10  ">
                  <div className="mb-3 d-flex align-items-center">
                    <div className="col-md-2 text-start ">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label mt-2"
                      >
                        Time Zone
                      </label>
                    </div>
                    <FormControl className="select-width-demo" size="small">
                      <InputLabel id="demo-controlled-open-select-label">
                        Time Zone
                      </InputLabel>
                      <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={timeZoneOpen}
                        onClose={handleCloseTimeZone}
                        onOpen={handleOpenTimeZone}
                        value={timeZone}
                        label="Time Zone"
                        className="text-start"
                        onChange={handleChangeTimeZone}
                      >
                        {timeZoneGet.length > 0 ? (
                          timeZoneGet.map((items) => {
                            return (
                              <MenuItem value={items.timezone} key={items._id}>
                                {items.timezone}
                              </MenuItem>
                            );
                          })
                        ) : (
                          <MenuItem>No Data</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="col-lg-10  ">
                  <div className="mb-3 d-flex align-items-center">
                    <div className="col-md-2 text-start ">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label mt-2"
                      >
                        Agency
                      </label>
                    </div>
                    <FormControl className="select-width-demo" size="small">
                      <InputLabel id="demo-multiple-name-label">
                        Select Agency
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={personNameEnter}
                        onChange={handleChangeAgency}
                        input={<OutlinedInput label="Select Agency" />}
                        MenuProps={MenuProps}
                        className="text-start"
                      >
                        {agencyData.length > 0 ? (
                          agencyData.map((name) => (
                            <MenuItem
                              key={name.id}
                              value={name}
                              style={getStylesAgency(
                                name,
                                personNameEnter,
                                theme
                              )}
                            >
                              {name.title}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem>No Data</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="col-lg-10  ">
                  <div className="mb-3 d-flex align-items-center">
                    <div className="col-md-2 text-start ">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label mt-2"
                      >
                        Programs
                      </label>
                    </div>
                    <FormControl className="select-width-demo" size="small">
                      <InputLabel id="demo-multiple-name-label">
                        Select Programs
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={selectProgramsEnter}
                        onChange={handleChangePrograms}
                        input={<OutlinedInput label="Select Programs" />}
                        MenuProps={MenuProps}
                        className="text-start"
                      >
                        {programData.length > 0 ? (
                          programData.map((name) => (
                            <MenuItem
                              key={name.id}
                              value={name}
                              style={getStylesAgency(
                                name,
                                personNameEnter,
                                theme
                              )}
                            >
                              {name.title}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem>No Data</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="col-lg-10  ">
                  <div className="mb-3 d-flex align-items-center">
                    <div className="col-md-2 text-start ">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label mt-2"
                      >
                        Schools
                      </label>
                    </div>
                    <FormControl className="select-width-demo" size="small">
                      <InputLabel id="demo-multiple-name-label">
                        Select School
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={selectSchoolsEnter}
                        onChange={handleChangeSchool}
                        input={<OutlinedInput label="Select School" />}
                        MenuProps={MenuProps}
                        className="text-start"
                      >
                        {schoolsData.length > 0 ? (
                          schoolsData.map((name) => (
                            <MenuItem
                              key={name.id}
                              value={name}
                              style={getStylesAgency(
                                name,
                                personNameEnter,
                                theme
                              )}
                            >
                              {name.title}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem>No Data</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="col-lg-10  ">
                  <div className="mb-3 d-flex align-items-center">
                    <div className="col-md-2 text-start ">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label mt-2"
                      >
                        Grade
                      </label>
                    </div>
                    <FormControl className="select-width-demo" size="small">
                      <InputLabel id="demo-multiple-name-label">
                        Select Grade
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={selectGradesEnter}
                        onChange={handleChangeGrade}
                        input={<OutlinedInput label="Select Grade" />}
                        MenuProps={MenuProps}
                        className="text-start"
                      >
                        {gradeData.length > 0 ? (
                          gradeData.map((name) => (
                            <MenuItem
                              key={name.id}
                              value={name}
                              style={getStylesAgency(
                                name,
                                personNameEnter,
                                theme
                              )}
                            >
                              {name.title}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem>No Data</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="col-lg-10  ">
                  <div className="mb-3 d-flex align-items-center">
                    <div className="col-md-2 text-start ">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label mt-2"
                      >
                        Subjects
                      </label>
                    </div>
                    <FormControl className="select-width-demo" size="small">
                      <InputLabel id="demo-multiple-name-label">
                        Select Subjects
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={selectSubjectsEnter}
                        onChange={handleChangeSubjects}
                        input={<OutlinedInput label="Select Subjects" />}
                        MenuProps={MenuProps}
                        className="text-start"
                      >
                        {subjectData.length > 0 ? (
                          subjectData.map((name) => (
                            <MenuItem
                              key={name.id}
                              value={name}
                              style={getStylesAgency(
                                name,
                                personNameEnter,
                                theme
                              )}
                            >
                              {name.title}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem>No Data</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="col-lg-10  ">
                  <div className="mb-3 d-flex align-items-center">
                    <div className="col-md-2 text-start ">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label mt-2"
                      >
                        Language
                      </label>
                    </div>
                    <FormControl className="select-width-demo" size="small">
                      <InputLabel id="demo-multiple-name-label">
                        Select Language
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={selectLanguagesEnter}
                        onChange={handleChangeLanguage}
                        input={<OutlinedInput label="Select Language" />}
                        MenuProps={MenuProps}
                        className="text-start"
                      >
                        {languageGet.length > 0 ? (
                          languageGet.map((name) => (
                            <MenuItem
                              key={name.id}
                              value={name}
                              style={getStylesAgency(
                                name,
                                personNameEnter,
                                theme
                              )}
                            >
                              {name.language}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem>No Data</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="col-lg-10  ">
                  <div className="mb-3 d-flex align-items-center">
                    <div className="col-md-2 text-start ">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label mt-2"
                      >
                        Consortium ID
                      </label>
                    </div>
                    <TextField
                      size="small"
                      id="outlined-basic"
                      label="Consortium ID"
                      variant="outlined"
                      className="select-width-demo"
                      value={consortiumId}
                      onChange={(e) => setConsortiumId(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ) : role == "Teacher" ? (
              <div className="row d-flex justify-content-center">
                <div className="col-lg-10  ">
                  <div className="mb-3 d-flex align-items-center">
                    <div className="col-md-2 text-start ">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label mt-2"
                      >
                        Time Zone
                      </label>
                    </div>
                    <FormControl className="select-width-demo" size="small">
                      <InputLabel id="demo-controlled-open-select-label">
                        Time Zone
                      </InputLabel>
                      <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={timeZoneOpen}
                        onClose={handleCloseTimeZone}
                        onOpen={handleOpenTimeZone}
                        value={timeZone}
                        label="Time Zone"
                        className="text-start"
                        onChange={handleChangeTimeZone}
                      >
                        {timeZoneGet.length > 0 ? (
                          timeZoneGet.map((items) => {
                            return (
                              <MenuItem value={items.timezone} key={items._id}>
                                {items.timezone}
                              </MenuItem>
                            );
                          })
                        ) : (
                          <MenuItem>No Data</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="col-lg-10  ">
                  <div className="mb-3 d-flex align-items-center" >
                    <div className="col-md-2 text-start ">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label mt-2"
                      >
                        Agency
                      </label>
                    </div>
                    <FormControl className="select-width-demo" size="small">
                      <InputLabel id="demo-multiple-name-label">
                        Select Agency
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={personNameEnter}
                        onChange={handleChangeAgency}
                        input={<OutlinedInput label="Select Agency" />}
                        MenuProps={MenuProps}
                        className="text-start"
                      >
                        {agencyData.length > 0 ? (
                          agencyData.map((name) => (
                            <MenuItem
                              key={name.id}
                              value={name.title}
                              style={getStylesAgency(
                                name,
                                personNameEnter,
                                theme
                              )}
                            >
                              {name.title}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem>No Data</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="col-lg-10  ">
                  <div className="mb-3 d-flex align-items-center">
                    <div className="col-md-2 text-start ">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label mt-2"
                      >
                        Programs
                      </label>
                    </div>
                    <FormControl className="select-width-demo" size="small">
                      <InputLabel id="demo-multiple-name-label">
                        Select Programs
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={selectProgramsEnter}
                        onChange={handleChangePrograms}
                        input={<OutlinedInput label="Select Programs" />}
                        MenuProps={MenuProps}
                        className="text-start"
                      >
                        {programData.length > 0 ? (
                          programData.map((name) => (
                            <MenuItem
                              key={name.id}
                              value={name.title}
                              style={getStylesAgency(
                                name,
                                personNameEnter,
                                theme
                              )}
                            >
                              {name.title}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem>No Data</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="col-lg-10  ">
                  <div className="mb-3 d-flex align-items-center">
                    <div className="col-md-2 text-start ">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label mt-2"
                      >
                        Schools
                      </label>
                    </div>
                    <FormControl className="select-width-demo" size="small">
                      <InputLabel id="demo-multiple-name-label">
                        Select School
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={selectSchoolsEnter}
                        onChange={handleChangeSchool}
                        input={<OutlinedInput label="Select School" />}
                        MenuProps={MenuProps}
                        className="text-start"
                      >
                        {schoolsData.length > 0 ? (
                          schoolsData.map((name) => (
                            <MenuItem
                              key={name.id}
                              value={name.title}
                              style={getStylesAgency(
                                name,
                                personNameEnter,
                                theme
                              )}
                            >
                              {name.title}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem>No Data</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="col-lg-10  ">
                  <div className="mb-3 d-flex align-items-center">
                    <div className="col-md-2 text-start ">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label mt-2"
                      >
                        Grade
                      </label>
                    </div>
                    <FormControl className="select-width-demo" size="small">
                      <InputLabel id="demo-multiple-name-label">
                        Select Grade
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={selectGradesEnter}
                        onChange={handleChangeGrade}
                        input={<OutlinedInput label="Select Grade" />}
                        MenuProps={MenuProps}
                        className="text-start"
                      >
                        {gradeData.length > 0 ? (
                          gradeData.map((name) => (
                            <MenuItem
                              key={name.id}
                              value={name.title}
                              style={getStylesAgency(
                                name,
                                personNameEnter,
                                theme
                              )}
                            >
                              {name.title}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem>No Data</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="col-lg-10  ">
                  <div className="mb-3 d-flex align-items-center">
                    <div className="col-md-2 text-start ">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label mt-2"
                      >
                        Subjects
                      </label>
                    </div>
                    <FormControl className="select-width-demo" size="small">
                      <InputLabel id="demo-multiple-name-label">
                        Select Subjects
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={selectSubjectsEnter}
                        onChange={handleChangeSubjects}
                        input={<OutlinedInput label="Select Subjects" />}
                        MenuProps={MenuProps}
                        className="text-start"
                      >
                        {subjectData.length > 0 ? (
                          subjectData.map((name) => (
                            <MenuItem
                              key={name.id}
                              value={name.title}
                              style={getStylesAgency(
                                name,
                                personNameEnter,
                                theme
                              )}
                            >
                              {name.title}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem>No Data</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </div>
                </div>

                <div className="col-lg-10  ">
                  <div className="mb-3 d-flex align-items-center">
                    <div className="col-md-2 text-start ">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label mt-2"
                      >
                        Language
                      </label>
                    </div>
                    <FormControl className="select-width-demo" size="small">
                      <InputLabel id="demo-multiple-name-label">
                        Select Language
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={selectLanguagesEnter}
                        onChange={handleChangeLanguage}
                        input={<OutlinedInput label="Select Language" />}
                        MenuProps={MenuProps}
                        className="text-start"
                      >
                        {languageGet.length > 0 ? (
                          languageGet.map((name) => (
                            <MenuItem
                              key={name.id}
                              value={name.language}
                              style={getStylesAgency(
                                name,
                                personNameEnter,
                                theme
                              )}
                            >
                              {name.language}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem>No Data</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="col-lg-10  ">

                  {active ? (
                    <div className="row  d-flex justify-content-center">
                      <div className="col-lg-9 box-col d-flex align-items-center justify-content-around">
                        <h6>Monday</h6>
                        <div className="text-start">
                          <lable>Start Time</lable>
                          <br />
                          <TimeInput value={mondayStartTimes} eachInputDropdown onChange={(dateString) => setMondayStartTime(dateString)} />
                        </div>
                        <div className="text-start">
                          <lable>End Time</lable>
                          <br />
                          <TimeInput value={mondayEndTimes} eachInputDropdown onChange={(dateString) => setMondayEndTime(dateString)} />
                        </div>
                      </div>

                      <div className="col-lg-9 box-col d-flex align-items-center justify-content-around">
                        <h6>Tuesday</h6>
                        <div className="text-start">
                          <lable>Start Time</lable>
                          <br />
                          <TimeInput value={tuesdayStartTimes} eachInputDropdown onChange={(dateString) => setTuesdayStartTime(dateString)} />
                        </div>
                        <div className="text-start">
                          <lable>End Time</lable>
                          <br />
                          <TimeInput value={tuesdayEndTimes} eachInputDropdown onChange={(dateString) => setTuesdayEndTime(dateString)} />
                        </div>
                      </div>

                      <div className="col-lg-9 box-col d-flex align-items-center justify-content-around">
                        <h6>Wednesday</h6>
                        <div className="text-start">
                          <lable>Start Time</lable>
                          <br />
                          <TimeInput value={wednesdayStartTimes} eachInputDropdown onChange={(dateString) => setWednesdayStartTime(dateString)} />

                        </div>
                        <div className="text-start">
                          <lable>End Time</lable>
                          <br />
                          <TimeInput value={wednesdayEndTimes} eachInputDropdown onChange={(dateString) => setWednesdayEndTime(dateString)} />

                        </div>
                      </div>

                      <div className="col-lg-9 box-col d-flex align-items-center justify-content-around">
                        <h6>Thursday</h6>
                        <div className="text-start">
                          <lable>Start Time</lable>
                          <br />
                          <TimeInput value={thursdayStartTimes} eachInputDropdown onChange={(dateString) => setThursdayStartTime(dateString)} />
                        </div>
                        <div className="text-start">
                          <lable>End Time</lable>
                          <br />
                          <TimeInput value={thursdayEndTimes} eachInputDropdown onChange={(dateString) => setThursdayEndTime(dateString)} />

                        </div>
                      </div>

                      <div className="col-lg-9 box-col d-flex align-items-center justify-content-around">
                        <h6>Friday</h6>
                        <div className="text-start">
                          <lable>Start Time</lable>
                          <br />
                          <TimeInput value={fridayStartTimes} eachInputDropdown onChange={(dateString) => setFridayStartTime(dateString)} />

                        </div>
                        <div className="text-start">
                          <lable>End Time</lable>
                          <br />
                          <TimeInput value={fridayEndTimes} eachInputDropdown onChange={(dateString) => setFridayEndTime(dateString)} />

                        </div>
                      </div>

                      <div className="col-lg-9 box-col d-flex align-items-center justify-content-around">
                        <h6>Saturday</h6>
                        <div className="text-start">
                          <lable>Start Time</lable>
                          <br />
                          <TimeInput value={saturdayStartTimes} eachInputDropdown onChange={(dateString) => setSaturdayStartTime(dateString)} />

                        </div>
                        <div className="text-start">
                          <lable>End Time</lable>
                          <br />
                          <TimeInput value={saturdayEndTimes} eachInputDropdown onChange={(dateString) => setSaturdayEndTime(dateString)} />

                        </div>
                      </div>

                      <div className="col-lg-9 box-col d-flex align-items-center justify-content-around">
                        <h6>Sunday</h6>
                        <div className="text-start">
                          <lable>Start Time</lable>
                          <br />
                          <TimeInput value={sundayStartTimes} eachInputDropdown onChange={(dateString) => setSundayStartTime(dateString)} />

                        </div>
                        <div className="text-start">
                          <lable>End Time</lable>
                          <br />
                          <TimeInput value={sundayEndTimes} eachInputDropdown onChange={(dateString) => setSundayEndTime(dateString)} />

                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ) : (
              <div className="row d-flex justify-content-center">
                <div className="col-lg-10  ">
                  <div className="mb-3 d-flex align-items-center">
                    <div className="col-md-2 text-start ">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label mt-2"
                      >
                        Time Zone
                      </label>
                    </div>
                    <FormControl className="select-width-demo" size="small">
                      <InputLabel id="demo-controlled-open-select-label">
                        Time Zone
                      </InputLabel>
                      <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={timeZoneOpen}
                        onClose={handleCloseTimeZone}
                        onOpen={handleOpenTimeZone}
                        value={timeZone}
                        label="Time Zone"
                        className="text-start"
                        onChange={handleChangeTimeZone}
                      >
                        {timeZoneGet.length > 0 ? (
                          timeZoneGet.map((items) => {
                            return (
                              <MenuItem value={items.timezone} key={items._id}>
                                {items.timezone}
                              </MenuItem>
                            );
                          })
                        ) : (
                          <MenuItem>No Data</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="col-lg-10  ">
                  <div className="mb-3 d-flex align-items-center">
                    <div className="col-md-2 text-start ">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label mt-2"
                      >
                        Agency
                      </label>
                    </div>
                    <FormControl className="select-width-demo" size="small">
                      <InputLabel id="demo-multiple-name-label">
                        Select Agency
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={personNameEnter}
                        onChange={handleChangeAgency}
                        input={<OutlinedInput label="Select Agency" />}
                        MenuProps={MenuProps}
                        className="text-start"
                      >
                        {agencyData.length > 0 ? (
                          agencyData.map((name) => (
                            <MenuItem
                              key={name.id}
                              value={name}
                              style={getStylesAgency(
                                name,
                                personNameEnter,
                                theme
                              )}
                            >
                              {name.title}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem>No Data</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="col-lg-10  ">
                  <div className="mb-3 d-flex align-items-center">
                    <div className="col-md-2 text-start ">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label mt-2"
                      >
                        Programs
                      </label>
                    </div>
                    <FormControl className="select-width-demo" size="small">
                      <InputLabel id="demo-multiple-name-label">
                        Select Programs
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={selectProgramsEnter}
                        onChange={handleChangePrograms}
                        input={<OutlinedInput label="Select Programs" />}
                        MenuProps={MenuProps}
                        className="text-start"
                      >
                        {programData.length > 0 ? (
                          programData.map((name) => (
                            <MenuItem
                              key={name.id}
                              value={name}
                              style={getStylesAgency(
                                name,
                                personNameEnter,
                                theme
                              )}
                            >
                              {name.title}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem>No Data</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="col-lg-10  ">
                  <div className="mb-3 d-flex align-items-center">
                    <div className="col-md-2 text-start ">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label mt-2"
                      >
                        Schools
                      </label>
                    </div>
                    <FormControl className="select-width-demo" size="small">
                      <InputLabel id="demo-multiple-name-label">
                        Select School
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={selectSchoolsEnter}
                        onChange={handleChangeSchool}
                        input={<OutlinedInput label="Select School" />}
                        MenuProps={MenuProps}
                        className="text-start"
                      >
                        {schoolsData.length > 0 ? (
                          schoolsData.map((name) => (
                            <MenuItem
                              key={name.id}
                              value={name}
                              style={getStylesAgency(
                                name,
                                personNameEnter,
                                theme
                              )}
                            >
                              {name.title}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem>No Data</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="col-lg-10  ">
                  <div className="mb-3 d-flex align-items-center">
                    <div className="col-md-2 text-start ">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label mt-2"
                      >
                        Grade
                      </label>
                    </div>
                    <FormControl className="select-width-demo" size="small">
                      <InputLabel id="demo-multiple-name-label">
                        Select Grade
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={selectGradesEnter}
                        onChange={handleChangeGrade}
                        input={<OutlinedInput label="Select Grade" />}
                        MenuProps={MenuProps}
                        className="text-start"
                      >
                        {gradeData.length > 0 ? (
                          gradeData.map((name) => (
                            <MenuItem
                              key={name.id}
                              value={name}
                              style={getStylesAgency(
                                name,
                                personNameEnter,
                                theme
                              )}
                            >
                              {name.title}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem>No Data</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="col-lg-10  ">
                  <div className="mb-3 d-flex align-items-center">
                    <div className="col-md-2 text-start ">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label mt-2"
                      >
                        Subjects
                      </label>
                    </div>
                    <FormControl className="select-width-demo" size="small">
                      <InputLabel id="demo-multiple-name-label">
                        Select Subjects
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={selectSubjectsEnter}
                        onChange={handleChangeSubjects}
                        input={<OutlinedInput label="Select Subjects" />}
                        MenuProps={MenuProps}
                        className="text-start"
                      >
                        {subjectData.length > 0 ? (
                          subjectData.map((name) => (
                            <MenuItem
                              key={name.id}
                              value={name}
                              style={getStylesAgency(
                                name,
                                personNameEnter,
                                theme
                              )}
                            >
                              {name.title}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem>No Data</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </div>
                </div>

                <div className="col-lg-10  ">
                  <div className="mb-3 d-flex align-items-center">
                    <div className="col-md-2 text-start ">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label mt-2"
                      >
                        Language
                      </label>
                    </div>
                    <FormControl className="select-width-demo" size="small">
                      <InputLabel id="demo-multiple-name-label">
                        Select Language
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={selectLanguagesEnter}
                        onChange={handleChangeLanguage}
                        input={<OutlinedInput label="Select Language" />}
                        MenuProps={MenuProps}
                        className="text-start"
                      >
                        {languageGet.length > 0 ? (
                          languageGet.map((name) => (
                            <MenuItem
                              key={name.id}
                              value={name}
                              style={getStylesAgency(
                                name,
                                personNameEnter,
                                theme
                              )}
                            >
                              {name.language}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem>No Data</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="col-lg-10  ">
                  <div className="mb-3 d-flex align-items-center">
                    <div className="col-md-2 text-start ">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label mt-2"
                      >
                        Consortium ID
                      </label>
                    </div>
                    <TextField
                      size="small"
                      id="outlined-basic"
                      label="Consortium ID"
                      variant="outlined"
                      className="select-width-demo"
                      value={consortiumId}
                      onChange={(e) => setConsortiumId(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="col-lg-10  ms-md-3">
              <div className="mb-3 d-flex align-items-center">
                <div className="col-md-2 text-start ">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label mt-2"
                  >
                    First Name
                  </label>
                </div>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    size="small"
                    className="select-width-demo"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {dataError && !firstName && (
                    <div className="text-start" style={{ color: "red" }}>
                      Please Enter First Name
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-10  ms-md-3">
              <div className="mb-3 d-flex align-items-center">
                <div className="col-md-2 text-start ">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label mt-2"
                  >
                    Last Name
                  </label>
                </div>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    className="select-width-demo"
                    size="small"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {dataError && !lastName && (
                    <div className="text-start" style={{ color: "red" }}>
                      Please Enter Last Name
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-10  ms-md-3">
              <div className="mb-3 d-flex align-items-center">
                <div className="col-md-2 text-start ">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label mt-2"
                  >
                    Email
                  </label>
                </div>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    className="select-width-demo"
                    size="small"
                    value={email}
                    onChange={(e) => setEMail(e.target.value)}
                  />
                  {dataError && !email && (
                    <div className="text-start" style={{ color: "red" }}>
                      Please Enter Email
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-10  ms-md-3">
              <div className="mb-3 d-flex align-items-center">
                <div className="col-md-2 text-start ">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label mt-2"
                  >
                    Mobile
                  </label>
                </div>
                <div>
                  <TextField
                    id="outlined-size-small"
                    label="Mobile No."
                    // label="Number"
                    type="number"
                    placeholder="(100)-000-00000"
                    variant="outlined"
                    size="small"

                    className="select-width-demo"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                  {dataError && !mobileNumber && (
                    <div className="text-start" style={{ color: "red" }}>
                      Please Enter mobile Number
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-10  ms-md-3">
              <div className="mb-3 d-flex align-items-center">
                <div className="col-md-2 text-start ">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label mt-2"
                  >
                    Address
                  </label>
                </div>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="Address"
                    variant="outlined"
                    className="select-width-demo"
                    size="small"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {dataError && !address && (
                    <div className="text-start" style={{ color: "red" }}>
                      Please Enter Address
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-10 ms-md-3">
              <div className="mb-3 d-flex align-items-center">
                <div className="col-md-2 text-start ">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label mt-2"
                  >
                    Gender
                  </label>
                </div>
                <FormControl className="select-width-demo" size="small">
                  <InputLabel id="demo-controlled-open-select-label">
                    Gender
                  </InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={genderOpen}
                    onClose={handleCloseGender}
                    onOpen={handleOpenGender}
                    value={gender}
                    label="Gender"
                    className="text-start"
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

            <div className="col-lg-10 ms-md-3">
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
                    size="small"
                    className="select-width-demo"
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
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
                  {dataError && !password && (
                    <div className="text-start" style={{ color: "red" }}>
                      Please Enter Password
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-10 text-start ms-md-3">
              <div className="mb-1 d-flex align-items-center">
                <div className="col-md-2 text-start ">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label mt-2"
                  >
                    Repeat Password
                  </label>
                </div>
                <div>
                  <OutlinedInput
                    className="select-width-demo"
                    id="outlined-adornment-password"
                    type={showreTypePassword ? "text" : "password"}
                    value={reTypePassword}
                    size="small"
                    onChange={handleChangeTypePassword}

                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickTypeShowPassword}
                          edge="end"
                        >
                          {showreTypePassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Enter Your Password"
                  />
                  <br />
                  {passwordError && (
                    <div className="text-start" style={{ color: "red" }}>
                      Re-Type Password is not metched
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div
              className="col-md-11 mt-4 pt-3 pb-3 mb-5"
              style={{
                borderBottom: "1px solid #838383",
                borderTop: "1px solid #838383",
              }}
            >
              <button className="btn btn-save me-2" onClick={userDataSave}>
                {lodaing == true ? <Spinner animation="border" /> : <span>Save</span>}
              </button>
              <button className="btn btn-Cancel" onClick={changeAgenciews}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="row user-box-1">
            <div className="col-lg-12 col-12 border  d-flex justify-content-center  justify-content-between align-items-center pt-3 pb-3">
              <h4 className="user-h4 mt-2">USERS</h4>
              <div>
                {
                  activeShow == 1 ? <CSVLink className="btn btn-dangerexcel mt-1" id="Abble" {...csvLinkInactive}>Export to CSV</CSVLink> : <CSVLink className="btn btn-dangerexcel mt-1" id="Abble" {...csvLink}>Export to CSV</CSVLink>
                }

              </div>
            </div>
          </div>
          <div
            className="row d-flex justify-content-center justify-content-between pt-3 pb-3 align-items-center ps-md-3 pe-md-3"
            style={{ background: "#c7d7df" }}
          >
            <div className="col-lg-5 text-md-start d-flex align-items-center ">
              <button
                className="btn btn-primaryadd me-md-3 mt-2"
                onClick={changeAgenciews}
              >
                <i className="fa-solid fa-plus"></i> Add New User
              </button>
              {/* <button className="btn  mt-2">
                <i className="fa-solid fa-upload"></i> Bulk Upload
              </button> */}
            </div>
            <div className="col-lg-7  ">
              <div className="row  d-flex justify-content-lg-end ">
                <div className="col-lg-5 mt-2">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={userByNameShow}
                    onChange={userByNameShowHandle}
                  >
                    <option value="Teacher">Tutor</option>
                    <option value="Manager">Manager</option>
                    <option value="Student">Student</option>
                    <option value="Employee">Admin Staff</option>
                  </select>
                </div>
                <div className="col-lg-5 mt-2">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={activeShow}
                    onChange={activeHandle}
                  >
                    <option value={0}>Active</option>
                    <option value={1}>Inactive</option>
                  </select>
                </div>
              </div>
            </div>




            <div className="col-lg-4 mt-2">
              <FormControl className="select-width" size="small">
                <InputLabel id="demo-multiple-name-label" className="InputLabel-text">
                  Select Agency
                </InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput label="Select Agency" />}
                  MenuProps={MenuProps}
                  className="text-start"
                >
                  {agencyData.length > 0 ? (
                    agencyData.map((name) => (
                      <MenuItem
                        key={name.id}
                        value={name.title}
                      // style={getStyles(name, personName, theme)}
                      >
                        {name.title}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem>No Data</MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
            <div className="col-lg-4 mt-2">
              <FormControl className="select-width" size="small">
                <InputLabel id="demo-multiple-name-label-one">
                  Select Language
                </InputLabel>
                <Select
                  labelId="demo-multiple-name-label-one"
                  id="demo-multiple-name-one"
                  multiple
                  value={selectLanguages}
                  onChange={handleChangeOne}
                  input={<OutlinedInput label=" Select Language" />}
                  MenuProps={MenuProps}
                  className="text-start"
                >
                  {languageGet.length > 0 ? (
                    languageGet.map((name) => (
                      <MenuItem
                        key={name.id}
                        value={name.language}
                      // style={getStylesone(name, selectLanguages, theme)}
                      >
                        {name.language}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem>No Data</MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
            <div className="col-lg-4 mt-2">
              <FormControl className="select-width" size="small">
                <InputLabel id="demo-multiple-name-label-two">
                  Select Program
                </InputLabel>
                <Select
                  labelId="demo-multiple-name-label-two"
                  id="demo-multiple-name-two"
                  multiple
                  value={selectPrograms}
                  onChange={handleChangeTwo}
                  input={<OutlinedInput label=" Select Program" />}
                  MenuProps={MenuProps}
                  className="text-start"
                >
                  {programData.length > 0 ? (
                    programData.map((name) => (
                      <MenuItem
                        key={name.id}
                        value={name.title}
                      // style={getStylesTwo(name, selectPrograms, theme)}
                      >
                        {name.title}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem>No Data</MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
            <div className="col-lg-4 mt-2">
              <FormControl className="select-width" size="small">
                <InputLabel id="demo-multiple-name-label-two">
                  Select School
                </InputLabel>
                <Select
                  labelId="demo-multiple-name-label-two"
                  id="demo-multiple-name-two"
                  multiple
                  value={selectSchools}
                  onChange={handleChangeThree}
                  input={<OutlinedInput label=" Select School" />}
                  MenuProps={MenuProps}
                  className="text-start"
                >
                  {schoolsData.length > 0 ? (
                    schoolsData.map((name) => (
                      <MenuItem
                        key={name.id}
                        value={name.title}
                      // style={getStylesThree(name, selectSchools, theme)}
                      >
                        {name.title}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem>No Data</MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
            <div className="col-lg-4 mt-2">
              <FormControl className="select-width" size="small">
                <InputLabel id="demo-multiple-name-label-two">
                  Select Grade
                </InputLabel>
                <Select
                  labelId="demo-multiple-name-label-two"
                  id="demo-multiple-name-two"
                  multiple
                  value={selectGrades}
                  onChange={handleChangeFour}
                  input={<OutlinedInput label=" Select Grade" />}
                  MenuProps={MenuProps}
                  className="text-start"
                >
                  {gradeData.length > 0 ? (
                    gradeData.map((name) => (
                      <MenuItem
                        key={name.id}
                        value={name.title}
                      // style={getStylesFour(name, selectGrades, theme)}
                      >
                        {name.title}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem>No Data</MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
            <div className="col-lg-4 mt-2" >
              <FormControl className="select-width" size="small">
                <InputLabel id="demo-multiple-name-label-two">
                  Select Subject
                </InputLabel>
                <Select
                  labelId="demo-multiple-name-label-two"
                  id="demo-multiple-name-two"
                  multiple
                  value={selectSubjects}
                  onChange={handleChangeFive}
                  input={<OutlinedInput label=" Select Subject" />}
                  MenuProps={MenuProps}
                  className="text-start"
                >
                  {subjectData.length > 0 ? (
                    subjectData.map((name) => (
                      <MenuItem
                        key={name.id}
                        value={name.title}
                      // style={getStylesFive(name, selectSubjects, theme)}
                      >
                        {name.title}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem>No Data</MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
            <div className="col-lg-4 col-11 mt-3 mb-3">
              <div className="d-grid gap-2">
                <button
                  className="btn btn-infos"
                  size="lg"
                  style={{ color: "white" }}
                  onClick={filterValue}
                >
                  <i className="fa-solid fa-magnifying-glass"></i> Search
                </button>
              </div>
            </div>
          </div>
          <div className="row " style={{ background: "#c7d7df", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
            <span className="text-start ">Total Users: {sckelton == true ? <Placeholder as="s" animation="glow"><Placeholder xs={1} /></Placeholder> : <span>{activeShow == 1 ? <span>{userActive}</span> : <span>{userInactive}</span>}</span>} </span>
            <div className="col-lg-12 pb-4">
              {tableLoading == true ? <div className="d-flex justify-content-center align-items-center mt-4 " style={{ width: "75%", position: "fixed", zIndex: "20000" }}>
                <div className="spinner"></div>
              </div> : <>
                {
                  activeShow == 1 ? (

                    <div className="responsive-table">
                      <DataTable
                        columns={columns}
                        data={filterSearchInactive}
                        pagination
                        fixedHeader
                        fixedHeaderScrollHeight='600px'
                        highlightOnHover
                        subHeader
                        theme="solarized"
                        striped
                        subHeaderComponent={
                          <input type="text" placeholder='Search User' className='form-control' style={{ width: '28%' }} value={searchInactive} onChange={(e) => setSearchInactive(e.target.value)} />
                        }
                      // responsive={true}
                      />
                    </div>


                  ) : (
                    <div className="row">
                      <div className="col-12 responsive-table">
                        <DataTable
                          columns={columns}
                          data={filterSearch}
                          pagination
                          fixedHeader
                          fixedHeaderScrollHeight='600px'
                          highlightOnHover
                          subHeader
                          theme="solarized"
                          striped
                          subHeaderComponent={
                            <input type="text" placeholder='Search User' className='form-control' style={{ width: '28%' }} value={search} onChange={(e) => setSearch(e.target.value)} />
                          }
                          responsive={true}
                        />
                      </div>
                    </div>
                    // <>
                    // </>
                  )
                }
              </>}
            </div>
          </div>
        </div>
      )}

      {
        modalShow ? (
          <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Delete Confirmation
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete User. This will be remove Permanently !
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-danger" onClick={handleDataDelete}>
                {deleteLoading == true ? <Spinner animation="border" /> : <span>Delete</span>}
              </button>
            </Modal.Footer>
          </Modal>
        ) : (<>
        </>)
      }

      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  );
}
export default User;