import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from "react-router-dom"
import { BACKEND_URI } from "../../config/config"
import { secondsToHmsssss } from "../../Convertor"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { GoPlus } from "react-icons/go"
import ProgressReport from './ProgressReport';
import Secondrport from './Secondrport';
import Attendance_Report from './Attendance_Report';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DataTable, { createTheme } from 'react-data-table-component';
import { FaDownload } from "react-icons/fa"
import { saveAs } from 'file-saver';
import ProgressCustomPDF from "./ProgressCustomPDF"
import { Page, Text, View, Document, StyleSheet, pdf } from '@react-pdf/renderer';
import AttendanceCustomePDF from './AttendanceCustomePDF';
import { element } from 'prop-types';
// import _ProgressCustomPDF__WEBPACK_IMPORTED_MODULE_8__ from '_ProgressCustomPDF__WEBPACK_IMPORTED_MODULE_8__';

function ViewSingleUserData() {
    const navigate = useNavigate();
    const params = useParams();
    const [dataShowSingle, setDataShowSingle] = useState([])
    const [agency, setAgency] = useState([])
    const [programs, setPrograms] = useState([]);
    const [school, setSchools] = useState([])
    let [timeZone, setimeZone] = useState();
    const [status, setstatus] = useState();
    const [mondayStartTime, setMondayStartTime] = useState()
    const [mondayEndTime, setMondayEndTime] = useState("")
    const [tuesdayStartTime, setTuesdayStartTime] = useState('')
    const [tuesdayEndTime, setTuesdayEndTime] = useState('');
    const [wednesdayStartTime, setWednesdayStartTime] = useState('');
    const [wednesdayEndTime, setWednesdayEndTime] = useState('');
    const [thursdayStartTime, setThursdayStartTime] = useState('');
    const [thursdayEndTime, setThursdayEndTime] = useState('');
    const [fridayStartTime, setFridayStartTime] = useState("");
    const [fridayEndTime, setFridayEndTime] = useState("");
    const [saturdayStartTime, setSaturdayStartTime] = useState('');
    const [saturdayEndTime, setSaturdayEndTime] = useState('');
    const [sundayStartTime, setSundayStartTime] = useState('');
    const [sundayEndTime, setSundayEndTime] = useState('');
    const [reportSelect, setReportSelect] = useState('')
    const [show, setShow] = useState(false);
    const [programData, setProgramData] = useState([])
    const [programSelectData, setProgramSelectData] = useState('')
    const [getProgressData, setGetProgressData] = useState([])
    const [getattendanceData, setGetAttendanceData] = useState([])
    const [checkRole,setCheckRole] = useState([])
    const [role,setRole] = useState('')
    const [image, setImage] = useState('')
    const [program, setProgram] = useState('')
    let idsTeacher = params.id;
    const progressColumns = [
        {
            name: <span style={{ fontSize: "15px", fontWeight: "600" }}>Report Type</span>,
            selector: row => row.Report_Value,
            sortable: true
        },
        {
            name: <span style={{ fontSize: "15px", fontWeight: "600" }}>Program</span>,
            selector: row => row.program,
            sortable: true
        },
        {
            name: <span style={{ fontSize: "15px", fontWeight: "600" }}>Status</span>,
            selector: (row) => (
                <>

                    <button className='btn btn-xs btn-infoss me-2 mt-1' onClick={() => progressdownloadPDF(row._id)}><FaDownload color="#fff" /></button>
                </>
            ),
        },
    ]
   console.log("getattendanceData", getattendanceData);
    const attendanceColumns = [
        {
            name: <span style={{ fontSize: "15px", fontWeight: "600" }}>Report Type</span>,
            selector: row => row.Report_Value,
            sortable: true
        },
        {
            name: <span style={{ fontSize: "15px", fontWeight: "600" }}>Program</span>,
            selector: row => row.program,
            sortable: true
        },
        {
            name: <span style={{ fontSize: "15px", fontWeight: "600" }}>Status</span>,
            selector: (row) => (
                <>
                    <button className='btn btn-xs btn-infoss me-2 mt-1' onClick={() => attendancedownloadPDF(row._id)}><FaDownload color="#fff" /></button>
                </>
            ),
        },
    ]


    createTheme('solarized', {
        background: {
            default: '#c0dfdf',

        },
        text: {
            primary: '#08272a',
            secondary: '#08272a',
        },
    });

    const singleDataView = async () => {
        try {
            let userDataId;
            await axios.get(`${BACKEND_URI}/user_single_data_find/${params.id}`).then((res) => {
                // console.log(res.data.role);
                setRole(res.data.role)
                setAgency(res.data.personNameEnter)
                setDataShowSingle(res.data)
                setSchools(res.data.selectSchoolsEnter)
                setPrograms(res.data.selectProgramsEnter)
                setimeZone(res.data.timeZone);
                setstatus(res.data.active)
                userDataId = res.data._id
                if (res.data.mondayStartTime > 0) {
                    let monday_Start_time = secondsToHmsssss(res.data.mondayStartTime);
                    const [hourString, minute] = monday_Start_time.split(":");
                    const hour = +hourString % 24;
                    let monday_time_Chnage = (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
                    setMondayStartTime(monday_time_Chnage);
                }
                else {
                    setMondayStartTime("Null");
                }

                if (res.data.mondayEndTime > 0) {
                    let monday_End_time = secondsToHmsssss(res.data.mondayEndTime);
                    const [hourStrings, minutes] = monday_End_time.split(":");
                    const hours = +hourStrings % 24;
                    let monday_End_time_Chnage = (hours % 12 || 12) + ":" + minutes + (hours < 12 ? " AM" : " PM");
                    setMondayEndTime(monday_End_time_Chnage);
                }
                else {
                    setMondayEndTime("Null");
                }

                if (res.data.tuesdayStartTime > 0) {
                    let Tuesday_start_time = secondsToHmsssss(res.data.tuesdayStartTime);
                    const [hourStringTuesday_start_time, minuteTuesday_start_time] = Tuesday_start_time.split(":");
                    const hourTuesday_start_time = +hourStringTuesday_start_time % 24;
                    let Tuesday_start_time_Chnage = (hourTuesday_start_time % 12 || 12) + ":" + minuteTuesday_start_time + (hourTuesday_start_time < 12 ? " AM" : " PM")
                    setTuesdayStartTime(Tuesday_start_time_Chnage)
                }
                else {
                    setTuesdayStartTime("Null");
                }

                if (res.data.tuesdayEndTime > 0) {
                    let Tuesday_End_time = secondsToHmsssss(res.data.tuesdayEndTime);
                    const [hourStringTuesday_End_time, minuteTuesday_End_time] = Tuesday_End_time.split(":");
                    const hourTuesday_End_time = +hourStringTuesday_End_time % 24;
                    let Tuesday_End_time_Chnage = (hourTuesday_End_time % 12 || 12) + ":" + minuteTuesday_End_time + (hourTuesday_End_time < 12 ? " AM" : " PM")
                    setTuesdayEndTime(Tuesday_End_time_Chnage);
                }
                else {
                    setTuesdayEndTime("Null");
                }

                if (res.data.wednesdayStartTime > 0) {
                    let Wednesday_start_Time = secondsToHmsssss(res.data.wednesdayStartTime);
                    const [hourStringWednesday_start_Time, minuteWednesday_start_Time] = Wednesday_start_Time.split(":");
                    const hourWednesday_start_Time = +hourStringWednesday_start_Time % 24;
                    let Wednesday_start_Time_Chnage = (hourWednesday_start_Time % 12 || 12) + ":" + minuteWednesday_start_Time + (hourWednesday_start_Time < 12 ? " AM" : " PM")
                    setWednesdayStartTime(Wednesday_start_Time_Chnage);
                }
                else {
                    setWednesdayStartTime("Null");
                }

                if (res.data.wednesdayEndTime > 0) {
                    let Wednesday_End_Time = secondsToHmsssss(res.data.wednesdayEndTime);
                    const [hourStringWednesday_End_Time, minuteWednesday_End_Time] = Wednesday_End_Time.split(":");
                    const hourWednesday_End_Time = +hourStringWednesday_End_Time % 24;
                    let Wednesday_End_Time_Chnage = (hourWednesday_End_Time % 12 || 12) + ":" + minuteWednesday_End_Time + (hourWednesday_End_Time < 12 ? " AM" : " PM")
                    setWednesdayEndTime(Wednesday_End_Time_Chnage);
                }
                else {
                    setWednesdayEndTime("Null");
                }

                if (res.data.thursdayStartTime > 0) {
                    let Thursday_Start_Time = secondsToHmsssss(res.data.thursdayStartTime);
                    const [hourStringThursday_Start_Time, minuteThursday_Start_Time] = Thursday_Start_Time.split(":");
                    const hourThursday_Start_Time = +hourStringThursday_Start_Time % 24;
                    let Thursday_Start_Time_Chnage = (hourThursday_Start_Time % 12 || 12) + ":" + minuteThursday_Start_Time + (hourThursday_Start_Time < 12 ? " AM" : " PM")
                    setThursdayStartTime(Thursday_Start_Time_Chnage)
                }
                else {
                    setThursdayStartTime("Null");
                }

                if (res.data.thursdayEndTime > 0) {
                    let Thursday_End_Time = secondsToHmsssss(res.data.thursdayEndTime);
                    const [hourStringThursday_End_Time, minuteThursday_End_Time] = Thursday_End_Time.split(":");
                    const hourThursday_End_Time = +hourStringThursday_End_Time % 24;
                    let Thursday_End_Time_Chnage = (hourThursday_End_Time % 12 || 12) + ":" + minuteThursday_End_Time + (hourThursday_End_Time < 12 ? " AM" : " PM")
                    setThursdayEndTime(Thursday_End_Time_Chnage);
                }
                else {
                    setThursdayEndTime("Null");
                }

                if (res.data.fridayStartTime > 0) {
                    let Friday_Start_Time = secondsToHmsssss(res.data.fridayStartTime);
                    const [hourStringFriday_Start_Time, minuteFriday_Start_Time] = Friday_Start_Time.split(":");
                    const hourFriday_Start_Time = +hourStringFriday_Start_Time % 24;
                    let Friday_Start_Time_Chnage = (hourFriday_Start_Time % 12 || 12) + ":" + minuteFriday_Start_Time + (hourFriday_Start_Time < 12 ? " AM" : " PM")
                    setFridayStartTime(Friday_Start_Time_Chnage)
                }
                else {
                    setFridayStartTime("Null");
                }

                if (res.data.fridayEndTime > 0) {
                    let Friday_End_Time = secondsToHmsssss(res.data.fridayEndTime);
                    const [hourStringFriday_End_Time, minuteFriday_End_Time] = Friday_End_Time.split(":");
                    const hourFriday_End_Time = +hourStringFriday_End_Time % 24;
                    let Friday_End_Time_Chnage = (hourFriday_End_Time % 12 || 12) + ":" + minuteFriday_End_Time + (hourFriday_End_Time < 12 ? " AM" : " PM")
                    setFridayEndTime(Friday_End_Time_Chnage);
                }
                else {
                    setFridayEndTime("Null");
                }

                if (res.data.saturdayStartTime > 0) {
                    let Saturday_Start_Time = secondsToHmsssss(res.data.saturdayStartTime);
                    const [hourStringSaturday_Start_Time, minuteSaturday_Start_Time] = Saturday_Start_Time.split(":");
                    const hourSaturday_Start_Time = +hourStringSaturday_Start_Time % 24;
                    let Saturday_Start_Time_Chnage = (hourSaturday_Start_Time % 12 || 12) + ":" + minuteSaturday_Start_Time + (hourSaturday_Start_Time < 12 ? " AM" : " PM")
                    setSaturdayStartTime(Saturday_Start_Time_Chnage);
                }
                else {
                    setSaturdayStartTime("Null");
                }

                if (res.data.saturdayEndTime > 0) {
                    let Saturday_End_Time = secondsToHmsssss(res.data.saturdayEndTime);
                    const [hourStringSaturday_End_Time, minuteSaturday_End_Time] = Saturday_End_Time.split(":");
                    const hourSaturday_End_Time = +hourStringSaturday_End_Time % 24;
                    let Saturday_End_Time_Chnage = (hourSaturday_End_Time % 12 || 12) + ":" + minuteSaturday_End_Time + (hourSaturday_End_Time < 12 ? " AM" : " PM")
                    setSaturdayEndTime(Saturday_End_Time_Chnage);

                }
                else {
                    setSaturdayEndTime("Null");
                }

                if (res.data.sundayStartTime > 0) {
                    let Sunday_Start_Time = secondsToHmsssss(res.data.sundayStartTime);
                    const [hourStringSunday_Start_Time, minuteSunday_Start_Time] = Sunday_Start_Time.split(":");
                    const hourSunday_Start_Time = +hourStringSunday_Start_Time % 24;
                    let Sunday_Start_Time_Chnage = (hourSunday_Start_Time % 12 || 12) + ":" + minuteSunday_Start_Time + (hourSunday_Start_Time < 12 ? " AM" : " PM")
                    setSundayStartTime(Sunday_Start_Time_Chnage);

                }
                else {
                    setSundayStartTime("Null");
                }

                if (res.data.sundayEndTime > 0) {
                    let Sunday_End_Time = secondsToHmsssss(res.data.sundayEndTime);
                    const [hourStringSunday_End_Time, minuteSunday_End_Time] = Sunday_End_Time.split(":");
                    const hourSunday_End_Time = +hourStringSunday_End_Time % 24;
                    let Sunday_End_Time_Chnage = (hourSunday_End_Time % 12 || 12) + ":" + minuteSunday_End_Time + (hourSunday_End_Time < 12 ? " AM" : " PM")
                    setSundayEndTime(Sunday_End_Time_Chnage);
                }
                else {
                    setSundayEndTime("Null");
                }
            })

        } catch (e) {
            console.log("e", e);
        }
    }
    useEffect(() => {
        singleDataView()
    }, [])
    const handleReportValue = (event) => {
        setReportSelect(event.target.value)
    }

    const handleModelShow = () => { setShow(true) }
    const handleClose = () => {
        setReportSelect('')
        setProgramData('')
        setShow(false)
    };

    const handleProgram = async () => {
        try {
            let array = []
            await axios.get(`${BACKEND_URI}/programs`).then((res) => {
                res.data.forEach((element) => {
                    if (element.active == "true") { array.push(element) }
                })
                setProgramData(array)
            })
        } catch (e) {
            console.log("e", e)
        }
    }

    const handleReportData = () => {

    }

    const getProgressReport = async () => {
        try {
            let array = []
            await axios.get(`${BACKEND_URI}/Progress_Report`).then((res) => {
                res?.data?.forEach((element)=>{
                    if(element.Teacher_Id === idsTeacher){
                       array.push(element)
                   }
                })
                setGetProgressData(array)
            })
        } catch (e) {
            console.log("e", e);
        }
    }

    const getAttendanceReport = async () => {
        try {
            let array = []
            await axios.get(`${BACKEND_URI}/attendance_Report_Data`).then((res) => {
                res?.data?.forEach((element)=>{
                    if(element.Teacher_Id === idsTeacher){
                        array.push(element)
                    }
                })
                setGetAttendanceData(array)
            })
        } catch (e) {
            console.log("e", e);
        }
    }
    const progressdownloadPDF = async (id) => {
        await axios.get(`${BACKEND_URI}/ProgressReport/${id}`).then(async (res) => {

            let data = res.data
            const pdfBlob = await pdf(<ProgressCustomPDF data={data} />).toBlob();
            saveAs(pdfBlob, `Proress Report-${Date.now()}.pdf`);
            // const pdfBlob = await ProgressCustomPDF.renderToBlob(<ProgressCustomPDF data={data} />);
            // saveAs(pdfBlob, 'data.pdf');    
        })
    }
    const attendancedownloadPDF = async (id) => {
        
        try{
        await axios.get(`${BACKEND_URI}/attendance_Report/${id}`).then(async(res)=>{
            let data= res.data
            const pdfBlob = await pdf(<AttendanceCustomePDF data={data} />).toBlob();
            saveAs(pdfBlob, `Attendance Report-${Date.now()}.pdf`);
        })
        }catch(e){
            console.log("e", e);
        }
    }

   const getUserSingleData = async()=>{
    try{
       await axios.get(`${BACKEND_URI}/user_single_data_find/${idsTeacher}`).then((res)=>{
        setCheckRole(res.data)
       })
    }catch(e){
        console.log("e", e);
    }
   }
    useEffect(()=>{
        getUserSingleData()
    },[])
    useEffect(() => {
        handleProgram()
    }, [])
    useEffect(() => {
        getProgressReport()
    }, [])
    useEffect(() => {
        getAttendanceReport()
    }, [])
    const getProgramValue = ()=>{
        if(programSelectData.length >0){
            let itemss = JSON.parse(programSelectData)
            setImage(itemss?.image)
             setProgram(itemss?.title)
        }
    }

    useEffect(()=>{
        getProgramValue()
    },[programSelectData])
    // 
    // console.log("programSelectData", programSelectData.length);
    // setImage(itemss?.image)
    // setProgram(itemss?.title)
    return (
        <div className='conatiner'>
            <div className='row user-box-1 mt-5'>
                <div className='col-lg-12 col-12  d-flex justify-content-center  justify-content-between align-items-center pt-3 pb-3'>
                    <h4 className='user-h4 mt-2'>{dataShowSingle.firstName} {dataShowSingle.lastName}</h4>
                </div>
            </div>
            <div className='row d-flex justify-content-center justify-content-between pt-3 pb-3 align-items-center' style={{ background: "#c7d7df", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>

                <div className='col-lg-2 text-md-start mt-2 ps-md-4'>
                    <h6>First name</h6>
                </div>
                <div className='col-lg-10 text-md-start mt-2'>
                    <span>{dataShowSingle.firstName}</span>
                </div>
                <div className='col-lg-2 text-md-start mt-2 ps-md-4 mt-3'>
                    <h6>Last Name</h6>
                </div>
                <div className='col-lg-10 text-md-start mt-2 '>
                    <span>{dataShowSingle.lastName}</span>
                </div>
                <div className='col-lg-2 text-md-start mt-2 ps-md-4 mt-3'>
                    <h6>Email</h6>
                </div>
                <div className='col-lg-10 text-md-start mt-2'>
                    <span>{dataShowSingle.email}</span>
                </div>
                <div className='col-lg-2 text-md-start mt-2 ps-md-4 mt-4'>
                    <h6>Mobile</h6>
                </div>
                <div className='col-lg-10 text-md-start mt-2'>
                    <span>{dataShowSingle.mobileNumber}</span>
                </div>
                <div className='col-lg-2 text-md-start mt-2 ps-md-4 mt-4'>
                    <h6>Agency</h6>
                </div>
                <div className='col-lg-10 text-md-start mt-2'>
                    <div>{agency.map((agency) => {
                        return (
                            <>{agency} ,</>
                        )
                    })}</div>
                </div>
                <div className='col-lg-2 text-md-start mt-2 ps-md-4 mt-4'>
                    <h6>Program</h6>
                </div>
                <div className='col-lg-10 text-md-start mt-2'>
                    <div>{programs.map((agency) => {
                        return (
                            <>{agency} ,</>
                        )
                    })}</div>
                </div>
                <div className='col-lg-2 text-md-start mt-2 ps-md-4 mt-4'>
                    <h6>School</h6>
                </div>
                <div className='col-lg-10 text-md-start mt-2'>
                    <div>{school.map((agency) => {
                        return (
                            <>{agency} ,</>
                        )
                    })}</div>
                </div>
                <div className='col-lg-2 text-md-start mt-2 ps-md-4 mt-4'>
                    <h6>Address</h6>
                </div>
                <div className='col-lg-10 text-md-start mt-2'>
                    <span>{dataShowSingle.address}</span>
                </div>
                <div className='col-lg-2 text-md-start mt-2 ps-md-4 mt-4'>
                    <h6>Role</h6>
                </div>
                <div className='col-lg-10 text-md-start mt-2'>
                    <span>{dataShowSingle.role}</span>
                </div>
                <div className='col-lg-2 text-md-start mt-2 ps-md-4 mt-4'>
                    <h6>TimeZone</h6>
                </div>
                <div className='col-lg-10 text-md-start mt-2'>
                    <span>{timeZone}
                    </span>
                </div>
                <div className='row d-flex justify-content-center'>

                    <div className='col-md-6'>
                        {
                            status == "true" && role == "Teacher" ? (
                                <div className='col-md-12  ms-2 mt-4' >
                                    <div className='' style={{ borderBottom: "1px solid gray" }}>
                                        <div className='col-lg-12 col-12  d-flex justify-content-center  justify-content-between align-items-center pt-3 pb-3'>
                                            <h4 className='user-h4 mt-2 ' style={{ color: "black" }}>Schedule</h4>
                                        </div>
                                    </div>
                                    <div className='row d-flex justify-content-start' >
                                        <div className='col-md-12 mt-4'>
                                            <table className="table text-start">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Days</th>
                                                        <th scope="col">Start Time</th>
                                                        <th scope="col">End Time</th>
                                                    </tr>
                                                </thead>
                                                <tbody >
                                                    <tr>
                                                        <th scope="row">Monday</th>
                                                        <td>{mondayStartTime}</td>
                                                        <td>{mondayEndTime}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Tuesday</th>
                                                        <td>{tuesdayStartTime}</td>
                                                        <td>{tuesdayEndTime}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Wednesday</th>
                                                        <td>{wednesdayStartTime}</td>
                                                        <td>{wednesdayEndTime}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Thursday</th>
                                                        <td>{thursdayStartTime}</td>
                                                        <td>{thursdayEndTime}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Friday</th>
                                                        <td>{fridayStartTime}</td>
                                                        <td>{fridayEndTime}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Saturday</th>
                                                        <td>{saturdayStartTime}</td>
                                                        <td>{saturdayEndTime}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Sunday</th>
                                                        <td>{sundayStartTime}</td>
                                                        <td>{sundayEndTime}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                </>
                            )
                        }

                    </div>
                    <div className='col-md-6 mt-5'>
                        {
                            checkRole.role == "Teacher" && (
                                <>
                                <h4>Report</h4>
                        <div className='row d-flex justify-content-end mt-2 '>
                            <div className='col-md-8 text-end'>
                                <button className='btn btn-Cancel' onClick={handleModelShow}>Add Report</button>
                                {
                                    show === true && (
                                        <Modal
                                            show={show}
                                            onHide={handleClose}
                                            backdrop="static"
                                            keyboard={false}
                                            aria-labelledby="contained-modal-title-vcenter"
                                            centered
                                            size="lg"
                                            className='ms-md-5'
                                            style={{ paddingTop: "100px" }}

                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title>Report Type</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body >
                                                <div className='row d-flex justify-content-center'>
                                                    <div className='col-md-8'>
                                                        <label className='text-start mb-1 lable-text'>Report Type</label>
                                                        <Form.Select aria-label="Default select example" value={reportSelect} onChange={handleReportValue}>
                                                            <option>Select Report</option>
                                                            <option value="Progress_Report">Progress Report</option>
                                                            <option value="Attendance_Report">Attendance Report </option>
                                                        </Form.Select>
                                                        {
                                                            reportSelect && <div className='mt-3'>
                                                                <label className='text-start mb-1 lable-text'>Program</label>
                                                                <Form.Select aria-label="Default select example" value={programSelectData} onChange={(e) => setProgramSelectData(e.target.value)}>
                                                                    <option>Open this select menu</option>
                                                                    {
                                                                        programData?.map((item) => {
                                                                            // console.log(item);
                                                                            return (
                                                                                <option value={JSON.stringify(item)}>{item.title}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </Form.Select>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className='row d-flex justify-content-center mt-4'>
                                                    <div className='col-12'>
                                                        {
                                                            reportSelect == "Progress_Report" && programSelectData ? (
                                                                // <Secondrport/>
                                                                <ProgressReport handleReportData={handleReportData} programSelectData={programSelectData} reportSelect={reportSelect} handleClose={handleClose} idsTeacher={idsTeacher} setShow={setShow} getProgressReport={getProgressReport} image={image} program={program} />
                                                            ) : reportSelect == "Attendance_Report" && programSelectData ? (
                                                                <>
                                                                    <Attendance_Report programSelectData={programSelectData} reportSelect={reportSelect} handleClose={handleClose} idsTeacher={idsTeacher} setShow={setShow} getAttendanceReport={getAttendanceReport} image={image} program={program}/>
                                                                </>
                                                            ) : (
                                                                <>
                                                                </>
                                                            )
                                                        }
                                                    </div>

                                                </div>
                                            </Modal.Body>
                                        </Modal>
                                    )
                                }
                            </div>
                            <div className='col-11 mt-3'>
                                <Tabs
                                    defaultActiveKey="home"
                                    transition={false}
                                    id="noanim-tab-example"
                                    className="mb-3"
                                >
                                    <Tab eventKey="home" title="Progress Report">
                                        <DataTable
                                            columns={progressColumns}
                                            data={getProgressData}
                                            pagination
                                            fixedHeader
                                            fixedHeaderScrollHeight='600px'
                                            highlightOnHover
                                            subHeader
                                            theme="solarized"
                                            striped
                                        />
                                    </Tab>
                                    <Tab eventKey="profile" title="Attendance Report ">
                                        <DataTable
                                            columns={attendanceColumns}
                                            data={getattendanceData}
                                            pagination
                                            fixedHeader
                                            fixedHeaderScrollHeight='600px'
                                            highlightOnHover
                                            subHeader
                                            theme="solarized"
                                            striped
                                        />
                                    </Tab>

                                </Tabs>
                            </div>
                        </div>
                                </>
                            )
                        }
                        
                    </div>
                </div>

                <div className='col-md-11 mt-4 pt-3 pb-3 mb-5 ms-md-4 text-start' style={{ borderBottom: "1px solid #838383", borderTop: "1px solid #838383" }}>
                    <Link to={`/sidebar/update_single_user_data/${params.id}`} style={{ textDecoration: "none" }}><button className='btn btn-Edit me-2' >Edit</button></Link>
                    <button className='btn btn-Cancel' onClick={() => navigate("/sidebar/user")}>Cancel</button>
                </div>

            </div>
        </div>
    )
}

export default ViewSingleUserData