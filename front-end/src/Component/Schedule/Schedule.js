import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { BACKEND_URI } from "../../config/config";
import Form from "react-bootstrap/Form";
import toast, { Toaster } from "react-hot-toast";
import { toSeconds, secondsToHmsssss, convert24HoursTo12Hours } from "../../Convertor"
import TimeInput from "react-time-picker-input";
import DataTable, {createTheme} from 'react-data-table-component';
import moment from "moment"
import Placeholder from 'react-bootstrap/Placeholder';
import { CSVLink} from "react-csv";
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
    backgroundColor: selectGrades.indexOf(name) === -1
      ? ""
      : "gray",
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

function Schedule({ setTeacherSelect, teacherSelect, setSessionData, sessionData }) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [selectLanguages, setSelectLanguages] = useState([]);
  const [selectPrograms, setSelectProgram] = useState([]);
  const [selectSchools, setSelectSchool] = useState([]);
  const [selectGrades, setSelectGrades] = useState([]);
  const [selectSubjects, setSelectSubjects] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowOne, setModalShowOne] = useState(false);
  const navigate = useNavigate();
  const [agencyData, setAgencyData] = useState([]);
  const [programData, setProgramData] = useState([]);
  const [schoolsData, setSchoolData] = useState([]);
  const [gradeData, setGradeData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [timeZoneGet, setTimeZoneGet] = useState([]);
  const [languageGet, setLanguageGet] = useState([]);
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [teacherId, setTeacherId] = useState([]);
  const [scheduleTableId, setscheduleTableId] = useState("");
  const [scheduleTableData, setScheduleTableData] = useState([]);
  const [mondayStartTimes, setMondayStartTime] = useState("");
  const [mondayEndTimes, setMondayEndTime] = useState("");
  const [spiner, setSpiner] = useState(false)
  const [tableLoading, setTableLoading] = useState(false)
  const [loadingActive, setLoadingActive] = useState(false)
  const [search, setSearch] = useState("")
  const [filterSearchInactive, setFilterSearchInactive] = useState([])
  const [sckelton,setSckelton] = useState(false);
  const [csvShow,setCSVShow] = useState([])
  const [years,setYears] = useState("")
  const [datess,setDatess] = useState("")
  const [month,setMonth] = useState("")
  const [dataError, setDataError] = useState(false);

  const columns = [
    {
      name: <span style={{ fontSize: "15px", fontWeight: "600" }}>Tutor</span>,
      selector: row => `${row.firstName} ${row.lastName}`,
      sortable: true,
      grow: 2
    },
    {
      name: <span style={{ fontSize: "15px", fontWeight: "600" }}>Mon</span>,
      grow: 2,
      selector: row => row?.mondayStartTime > 0 && row?.mondayEndTime > 0 ? `${convert24HoursTo12Hours(row?.mondayStartTime)} - ${convert24HoursTo12Hours(row?.mondayEndTime)}` : < >N/A</>,
      conditionalCellStyles: [
        {
          when: row => row.mondayStartTime > 0 && row.mondayEndTime > 0,
          style: {
            color: 'black'
          }
        },
        {
          when: row => row.mondayStartTime <= 0 || row.mondayEndTime <= 0,
          style: {
            backgroundColor: '#b7b3b3',
            color: 'black',
            borderRight: "1px solid white"
          }
        }
      ]
    },
    {
      name: <span style={{ fontSize: "15px", fontWeight: "600" }}>Tue</span>,
      grow: 2,
      selector: row => row?.tuesdayStartTime > 0 && row?.tuesdayEndTime > 0 ? `${convert24HoursTo12Hours(row?.tuesdayStartTime)} - ${convert24HoursTo12Hours(row?.tuesdayEndTime)}` : <>N/A</>,
      conditionalCellStyles: [
        {
          when: row => row?.tuesdayStartTime > 0 && row?.tuesdayEndTime > 0,
          style: {
            color: 'black',
          }
        },
        {
          when: row => row.tuesdayStartTime <= 0 || row.tuesdayEndTime <= 0,
          style: {
            backgroundColor: '#b7b3b3',
            color: 'black',
            borderRight: "1px solid white"
          }
        }
      ]
    },
    {
      name: <span style={{ fontSize: "15px", fontWeight: "600" }}>Wed</span>,
      grow: 2,
      selector: row => row?.wednesdayStartTime > 0 && row?.wednesdayEndTime > 0 ? `${convert24HoursTo12Hours(row?.wednesdayStartTime)} - ${convert24HoursTo12Hours(row?.wednesdayEndTime)}` : <>N/A</>,
      conditionalCellStyles: [
        {
          when: row => row?.wednesdayStartTime > 0 && row?.wednesdayEndTime > 0,
          style: {
            color: 'black',
          }
        },
        {
          when: row => row.wednesdayStartTime <= 0 || row.wednesdayEndTime <= 0,
          style: {
            backgroundColor: '#b7b3b3',
            color: 'black',
            borderRight: "1px solid white"
          }
        }
      ]
    },
    {
      name: <span style={{ fontSize: "15px", fontWeight: "600" }}>Thu</span>,
      grow: 2,
      selector: row => row?.thursdayStartTime > 0 && row?.thursdayEndTime > 0 ? `${convert24HoursTo12Hours(row?.thursdayStartTime)} - ${convert24HoursTo12Hours(row?.thursdayEndTime)}` : <>N/A</>,
      conditionalCellStyles: [
        {
          when: row => row?.thursdayStartTime > 0 && row?.thursdayEndTime > 0,
          style: {
            color: 'black',
          }
        },
        {
          when: row => row.thursdayStartTime <= 0 || row.thursdayEndTime <= 0,
          style: {
            backgroundColor: '#b7b3b3',
            color: 'black',
            borderRight: "1px solid white"
          }
        }
      ]
    },
    {
      name: <span style={{ fontSize: "15px", fontWeight: "600" }}>Fri</span>,
      grow: 2,
      selector: row => row?.fridayStartTime > 0 && row?.fridayEndTime > 0 ? `${convert24HoursTo12Hours(row?.fridayStartTime)} - ${convert24HoursTo12Hours(row?.fridayEndTime)}` : <>N/A</>,
      conditionalCellStyles: [
        {
          when: row => row?.fridayStartTime > 0 && row?.fridayEndTime > 0,
          style: {
            color: 'black',
          }
        },
        {
          when: row => row.fridayStartTime <= 0 || row.fridayEndTime <= 0,
          style: {
            backgroundColor: '#b7b3b3',
            color: 'black',
            borderRight: "1px solid white"
          }
        }
      ]
    },
    {
      name: <span style={{ fontSize: "15px", fontWeight: "600" }}>Sat</span>,
      grow: 2,
      selector: row => row?.saturdayStartTime > 0 && row?.saturdayEndTime > 0 ? `${convert24HoursTo12Hours(row?.saturdayStartTime)} - ${convert24HoursTo12Hours(row?.saturdayEndTime)}` : <>N/A</>,
      conditionalCellStyles: [
        {
          when: row => row?.saturdayStartTime > 0 && row?.saturdayEndTime > 0,
          style: {
            color: 'black',
          }
        },
        {
          when: row => row?.saturdayStartTime <= 0 || row?.saturdayEndTime <= 0,
          style: {
            backgroundColor: '#b7b3b3',
            color: 'black',
            borderRight: "1px solid white"
          }
        }
      ]
    },
    {
      name: <span style={{ fontSize: "15px", fontWeight: "600" }}>Sun</span>,
      grow: 2,
      selector: row => row?.sundayStartTime > 0 && row?.sundayEndTime > 0 ? `${convert24HoursTo12Hours(row?.sundayStartTime)} - ${convert24HoursTo12Hours(row?.sundayEndTime)}` : <>N/A</>,
      conditionalCellStyles: [
        {
          when: row => row?.sundayStartTime > 0 && row?.sundayEndTime > 0,
          style: {
            color: 'black',
          }
        },
        {
          when: row => row?.sundayStartTime <= 0 || row?.sundayEndTime <= 0,
          style: {
            backgroundColor: '#b7b3b3',
            color: 'black',
            borderRight: "1px solid white"
          }
        }
      ]
    },
    {
      name: <span style={{ fontSize: "15px", fontWeight: "600" }}>Control</span>,
      cell: (row) => (
        <>
          <button className="btn btn-xs btn-infoss me-2 mt-1" style={{ paddibg: "0" }} title="View" onClick={() => viewTeacherData(row._id)}><i className="fa-solid fa-eye" style={{ color: "white" }}></i></button>
          <button className="btn btn-xxs btn-dangers mt-1" title="Delete" onClick={() => UserDataDelete(row._id)}><i className="fa-solid fa-xmark" style={{ color: "white" }}></i></button>
        </>
      )
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
    setSelectLanguages(
      typeof value === "string" ? value.split(",") : value
    );
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
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeFour = (event) => {
    const {
      target: { value },
    } = event;
    setSelectGrades(
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
  const userDataGet = async () => {
    try {
      await axios.get(`${BACKEND_URI}/User_Data`).then((resdata) => {
        let arr = [];
        for (var i = 0; i <= resdata.data.length; i++) {
          if (resdata?.data[i]?.role === "Teacher" && resdata?.data[i]?.activeStatus === "true") {
            arr.push(resdata?.data[i]);
          }
        }
        setTeacherId(arr);
      });
    } catch (e) {
      console.log("e", e);
    }
  };
  const handleChangetTeacher = (event) => {
    try {
      let techerid = event.target.value;
      localStorage.setItem("teacherSelect", JSON.stringify(techerid));
      setTeacherSelect(event.target.value);
    } catch (e) {
      console.log("e", e);
    }
  };
  const handleData = async () => {
    try {
      let teacherSelectssss = JSON.parse(localStorage.getItem("teacherSelect"));
      await axios.get(`${BACKEND_URI}/User_Data`).then((resss) => {

        resss.data.forEach((element) => {
          if (teacherSelectssss == element._id) {
            teacherId.forEach((text) => {
              if (teacherSelectssss == text._id) {
                localStorage.setItem("teacherName", JSON.stringify(text));
              }
            });
            setTeacherSelect("")
            navigate("/sidebar/newschedule");
            window.location.reload();
          } else {
            toast.error("please enter Schedule from User");
          }
        });
      });
    } catch (e) {
      console.log("e", e);
    }
  };
  const viewTeacherData = async (ids) => {
    try {
      setLoadingActive(true)
      localStorage.setItem("teacherSelect", JSON.stringify(ids));
      await axios.get(`${BACKEND_URI}/User_Data`).then((resss) => {
        resss.data.forEach((element) => {
          if (ids == element._id) {
            teacherId.forEach((text) => {
              if (ids === text._id) {
                localStorage.setItem("teacherName", JSON.stringify(text));
              }
            });
            setTeacherSelect("")
            setLoadingActive(false)
            navigate("/sidebar/newschedule");
            window.location.reload();
          } else {
            toast.error("please enter Schedule from User");
          }
        });
      });
    } catch (e) {
      setLoadingActive(false)
      toast.error("please enter Schedule from User");
      console.log("e", e);
    }
  }
  const handleChangesix = (event) => {
    setAge(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
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
          if (subjectsElement.active == "true") {
            subjectArray.push(subjectsElement)
          }
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
  const scheduleShowData = async () => {
    try {
      setTableLoading(true)
      setSckelton(true)
      // console.log("gggg");
      document.getElementById("Abble").style.display = "none"
      await axios.get(`${BACKEND_URI}/User_Data`).then((userREs) => {
        // console.log("userREs",userREs?.data);
        let arr = [];
        userREs?.data?.forEach((elementRR) => {
          if (elementRR.activeStatus == "true" && elementRR.role == "Teacher") {
            arr.push(elementRR);
          }
        })
        setSessionData(arr.length)
        setScheduleTableData(arr);
        setFilterSearchInactive(arr)
        setTableLoading(false)
        setSckelton(false)
        setTimeout(() => {
          document.getElementById("Abble").style.display = "block"
        }, 2000);
      });
    } catch (e) {
      console.log("e", e);
      setSpiner(false)
      setSckelton(false)
    }
  };
  let mondayStartTime;
  let mondayEndTime;
  const filterData = async () => {
    
    try {
      
      setLoadingActive(true)
      let fetchdata = []
       mondayStartTime = toSeconds(mondayStartTimes)
       mondayEndTime = toSeconds(mondayEndTimes)
  // console.log("ffff");
      await axios.get(`${BACKEND_URI}/User_Data_Filter/personName=${personName}&selectPrograms=${selectPrograms}&selectLanguages=${selectLanguages}&selectSchools=${selectSchools}&selectGrades=${selectGrades}&selectSubjects=${selectSubjects}&Day=${age}&StartTime=${mondayStartTime}&EndTime=${mondayEndTime}`).then((filtersss) => {
        // console.log("filtersss", filtersss);
        // console.log("gggg");
        filtersss?.data.forEach(async (userAAA, index) => {
          // console.log("filtersss", userAAA);
          // console.log("lllll");
            if (userAAA.activeStatus == "true" && userAAA.role == "Teacher") {
              
                let teacherId = userAAA._id;
                let resSchedule = await axios.get(`${BACKEND_URI}/schedule_googles_filter/Day=${age}&StartTime=${mondayStartTime}&EndTime=${mondayEndTime}&teacherId=${teacherId}&OrignalTimeStart=${mondayStartTimes}&OrignalTimeEnd=${mondayEndTimes}&year=${years}&month=${month}&dates=${datess}`)
                console.log("resSchedule", resSchedule.data);
                // console.log("qqqqq");
                if (resSchedule?.data?.length) {
                    if (teacherId === resSchedule?.data[index]?.teacherSelect) {
                      } else {
                        // setLoadingActive(false)
                setScheduleTableData(userAAA)
                // setFilterSearchInactive(userAAA)
              }
            } else {
              // setLoadingActive(false)
              fetchdata.push(userAAA)
              setSpiner(true)
              setSpiner(false)
              setDataError(false)
            }
          }
        })
      })
      setTimeout(() => {
        setSessionData(fetchdata.length)
        setScheduleTableData(fetchdata)
        setFilterSearchInactive(fetchdata)
        setLoadingActive(false)
      }, 2000);
        
    } catch (e) {
      console.log("e", e);
      setLoadingActive(false)
      toast.error("May be Server Error! Please Refresh Page")
    }
  }
  const UserDataDelete = async (ids) => {
    try {
      setscheduleTableId(ids)
      setModalShowOne(true)
    } catch (e) {
      console.log("e", e);
    }
  }
  const handleDataDelete = async () => {
    try {
      let data = new Date()
      let dateTime = data.toDateString();
      let stuent_data = JSON.parse(localStorage.getItem("studentNest"));
      let First_Name = stuent_data.firstName
      let Last_Name = stuent_data.lastName
      let status = `Tutor Schedule parmanently Deleted by ${First_Name} ${Last_Name}`
      await axios.delete(`${BACKEND_URI}/delete_Student_All_Data/${scheduleTableId}`).then(async (resDelete) => {
        scheduleShowData();
        setModalShowOne(false);
        if (resDelete) {
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
    }
  }

//  Csv File Export \
 
const CsvToExport = async()=>{
  try{
    // setLoadingActive(true)
    // document.getElementById("Abble").style.display = "none"
    await axios.get(`${BACKEND_URI}/User_Data`).then((userREs) => { 
      let arr = [];
      let recurrenceRulesss;
      userREs?.data?.forEach(async(elementRR) => {
        if (elementRR.activeStatus == "true" && elementRR.role == "Teacher") {
          let firstName = elementRR?.firstName
          let lastName = elementRR?.lastName;
          let ids = elementRR?._id
           await axios.get(`${BACKEND_URI}/schedule_student_CSV/${ids}`).then((scheduleData)=>{
             if(scheduleData?.data.length >0){
               scheduleData?.data.forEach((secheduleTwo)=>{
                 if(secheduleTwo?.recurrenceRule?.length >0){
                  recurrenceRulesss =  secheduleTwo.recurrenceRule
                   let text = secheduleTwo.text
                   let startTimee = secondsToHmsssss(secheduleTwo.startTime)
                   const [hourString, minute] = startTimee.split(":");
                    const hour = +hourString % 24;
                    let time_Chnage = (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
                   let endTime = secondsToHmsssss(secheduleTwo.endTIme);
                   const [hourStrings, minutes] = endTime.split(":");
                    const hours = +hourStrings % 24;
                    let time_Chnage_End = (hours % 12 || 12) + ":" + minutes + (hours < 12 ? " AM" : " PM");
                   let status = "Repeat"
                      arr.push({firstName: firstName,lastName: lastName, text: text, startTimee: time_Chnage,endTime: time_Chnage_End, status: status , recurrenceRulesss:recurrenceRulesss })
                 } else{
                  let text = secheduleTwo.text
                  let startTimee = secondsToHmsssss(secheduleTwo.startTime)
                  const [hourString_else, minute_else] = startTimee.split(":");
                  const hour_else = +hourString_else % 24;
                  let time_Chnage_else = (hour_else % 12 || 12) + ":" + minute_else + (hour_else < 12 ? " AM" : " PM");
                  let endTime = secondsToHmsssss(secheduleTwo.endTIme);
                  const [hourStrings_else, minutes_else] = endTime.split(":");
                  const hours_else = +hourStrings_else % 24;
                  let time_Chnages_else = (hours_else % 12 || 12) + ":" + minutes_else + (hours_else < 12 ? " AM" : " PM");
                  recurrenceRulesss =  secheduleTwo.day
                  arr.push({firstName: firstName,lastName: lastName, text: text, startTimee: time_Chnage_else,endTime: time_Chnages_else, recurrenceRulesss:recurrenceRulesss})
                 }
                })
              }
              setCSVShow(arr)
          })
        }
      })
      
      setLoadingActive(false)
    })
    // setTimeout(()=>{
    //   document.getElementById("Abble").style.display = "block"
    // }, 3000)
  }catch(e){

  }
}

const headers = [
  {
    label : "Teacher F-Name", key: "firstName",
  },
  { 
    label: "Teacher L-Name" , key: "lastName"
  },
  {
    label: "Day" , key: "recurrenceRulesss"
  },
  {
    label: "Title" , key: "text"
  },
  {
    label: "Start Time" , key: "startTimee"
  },
  {
    label: "End Time" , key : "endTime"
  },
  {
    label: "Status", key: "status"
  }
]
const csvLink = {
  filename: "Schedule.csv",
  headers: headers,
  data: csvShow
 }

  useEffect(() => {
    const result = scheduleTableData?.filter((country) => {
      return country.firstName.toLowerCase().match(search.toLowerCase());
    })
    setFilterSearchInactive(result)
  }, [search])
  useEffect(()=>{
    CsvToExport()
  },[])
  useEffect(() => {
    userDataGet();
  }, []);
  useEffect(() => {
    scheduleShowData();
  }, []);
  useEffect(() => {
    allApiData();
  }, []);

  const [weekDates, setWeekDates] = useState([]);
  useEffect(() => {
    const dates = [];
    const startDate = moment().startOf('week');
    for (let i = 0; i < 7; i++) {
      dates.push(startDate.clone().add(i, 'day').format('YYYY-MM-DD'));
    }
    setWeekDates(dates);
  }, []);

  const handleDropdownChange = (event) => {
    const dateStr =event.target.value;
    // console.log("dateStr", dateStr);
    let datssasasa = new Date(dateStr)
    let days = datssasasa.getDay()
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let getDays = weekday[days];
    let yearssss = datssasasa.getFullYear();
    setYears(yearssss)
    let datessss = datssasasa.getDate();
    setDatess(datessss)
    let monthss = datssasasa.getMonth();
    setMonth(monthss)

    setAge(getDays)
  }
//  console.log("filterSearchInactive", filterSearchInactive);
  return (
    <div className="container">
      {loadingActive == true ? <div className="d-flex justify-content-center align-items-center " style={{ height: "100vh", width: "70%", position: "fixed", zIndex: "20000" }}><div className="loader-container">
        <div className="spinner"></div>
      </div></div> : <div></div>}
      <Toaster position="top-right" reverseOrder={false} />
      <div className="row user-box-1">
        <div className="col-lg-12 col-12  d-flex justify-content-center  justify-content-between align-items-center pt-3 pb-3">
          <h4 className="user-h4 mt-2">Schedule</h4>
            <CSVLink className="btn btn-dangerexcel mt-2" id="Abble" {...csvLink}>Export to CSV</CSVLink>
        </div>
      </div>
      <div
        className="row d-flex justify-content-center justify-content-between pt-3 pb-3 align-items-center"
        style={{ background: "#c7d7df" }}
      >
        <div className="col-lg-5 text-md-start mt-2">
          <button
            className="btn btn-primaryadd me-md-3 mt-2"
            onClick={() => setModalShow(true)}
          >
            <i className="fa-solid fa-plus"></i> Add New Session
          </button>
        </div>
        <div className="col-lg-7  ">
        </div>
      </div>
      <div className="row " style={{ background: "#c7d7df" }}>
        <div className="col-lg-4 mt-2">
          <FormControl className="select-width" size="small">
            <InputLabel id="demo-multiple-name-label">Select Agency</InputLabel>
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
              {agencyData.map((name) => (
                <MenuItem
                  key={name.id}
                  value={name.title}
                  style={getStyles(name, personName, theme)}
                >
                  {name.title}
                </MenuItem>
              ))}
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
              {languageGet.map((name) => (
                <MenuItem
                  key={name.id}
                  value={name.language}
                  style={getStylesone(name, selectLanguages, theme)}
                >
                  {name.language}
                </MenuItem>
              ))}
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
              {programData.map((name) => (
                <MenuItem
                  key={name.id}
                  value={name.title}
                  style={getStylesTwo(name, selectPrograms, theme)}
                >
                  {name.title}
                </MenuItem>
              ))}
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
              {schoolsData.map((name) => (
                <MenuItem
                  key={name.id}
                  value={name.title}
                  style={getStylesThree(name, selectSchools, theme)}
                >
                  {name.title}
                </MenuItem>
              ))}
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
              {gradeData.map((name) => (
                <MenuItem
                  key={name.id}
                  value={name.title}
                  style={getStylesFour(name, selectGrades, theme)}
                >
                  {name.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col-lg-4 mt-2">
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
              {subjectData.map((name) => (
                <MenuItem
                  key={name.id}
                  value={name.title}
                  style={getStylesFive(name, selectSubjects, theme)}
                >
                  {name.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="col-lg-4 mt-2">
          <FormControl className="select-width" size="small">
            <InputLabel id="demo-controlled-open-select-label">Days</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              // value={age}
              label="Days"
              className="text-start"

              onChange={handleDropdownChange}
            >
              {weekDates.map((date) => (

        <MenuItem key={date} value={moment(date).format('dddd, YYYY-MM-DD')}>{moment(date).format('dddd')}</MenuItem>
      ))}

            </Select>
          </FormControl>
        </div>
     
        <div className="col-lg-3 mt-2">
          <TimeInput value={mondayStartTimes} eachInputDropdown onChange={(dateString) => setMondayStartTime(dateString)} />
          
        </div>
        <div className="col-lg-4 mt-2">
          <TimeInput value={mondayEndTimes} eachInputDropdown onChange={(dateString) => setMondayEndTime(dateString)} />
          
        </div>
        <div className="col-lg-4 col-11 mb-3">
          <div className="d-grid gap-2">
            <button
              className="btn btn-info"
              size="lg"
              onClick={filterData}
              style={{ color: "white" }}
            >
              <i className="fa-solid fa-magnifying-glass"></i> Search
            </button>
          </div>
        </div>
      </div>
      <div
        className="row d-flex justify-content-center"
        style={{ background: "#c7d7df", borderBottomLeftRadius: "10px" , borderBottomRightRadius: "10px" }}
      >
        <span className="text-start mt-3">Total Sessions: {sckelton == true ? <Placeholder as="s" animation="glow"><Placeholder xs={1} /></Placeholder>: <span>{sessionData}</span>}</span>

        <div className="col-lg-12 pb-3">
          {tableLoading == true ? <div className="d-flex justify-content-center align-items-center mt-4" style={{ width: "75%", position: "fixed", zIndex: "20000" }}>
            <div className="spinner"></div>
          </div> : <div className="responsive-table">
            <DataTable
              columns={columns}
              data={filterSearchInactive}
              pagination
              fixedHeader
              fixedHeaderScrollHeight='600px'
              highlightOnHover
              subHeader
              rowKey="Id"
              theme="solarized"
              striped
              subHeaderComponent={
                <input type="text" placeholder='Search Tutor' className=' form-control' style={{ width: '28%' }} value={search} onChange={(e) => setSearch(e.target.value)} />
              }
            />
          </div>}
        </div>
      </div>
      {
        modalShowOne ? (
          <Modal
            show={modalShowOne}
            onHide={() => setModalShowOne(false)}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Delete Confirmation
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete session. This will be remove all student in this Session!
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-danger" onClick={handleDataDelete}>
                Done
              </button>
            </Modal.Footer>
          </Modal>
        ) : (<>
        </>)
      }
      {modalShow ? (
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Select Tutor
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Select
              aria-label="Default select example"
              value={teacherSelect}
              onChange={handleChangetTeacher}
              required
            >
              <option>Open this select menu</option>
              {teacherId.map((name, index) => {
                return (
                  <>
                    <option
                      key={index}
                      value={name._id}
                    >{`${name.firstName} ${name.lastName}`}</option>
                  </>
                );
              })}
            </Form.Select>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-primary" onClick={handleData}>
              Done
            </button>
          </Modal.Footer>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Schedule;