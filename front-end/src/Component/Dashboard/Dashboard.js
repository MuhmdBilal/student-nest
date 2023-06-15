import React, { useEffect, useState } from 'react';
import "./Dashboard.css";
import { BACKEND_URI } from "../../config/config"
import Placeholder from 'react-bootstrap/Placeholder';
import axios from 'axios';
import {HiUsers,HiUser} from "react-icons/hi"
import {FaCertificate} from "react-icons/fa" 
// import graduates from "../../Assets/graduates.png"
function Dashboard({sessionData}) {
    const [teacher,setTeacher] = useState(0)
    const [student,setStudent] = useState(0)
    const [developer,setDeveloper] = useState(0)
    const [manager,setManager] = useState(0);
    const [employee,setEmployee] = useState(0);
    const [sckelton,setSckelton] = useState(false);
    const getData = async()=>{
        try{
            setSckelton(true)
            await axios.get(`${BACKEND_URI}/User_Data`).then((resdata)=>{
                let teacherarry = []
                let studentarry = []
                let developerarry = []
                let managerArry = [];
                let employeeArry = [];
                
                for(var i = 0;  i<= resdata.data.length;i++){
                    if(resdata?.data[i]?.role == "Teacher"){
                        let teacherData = resdata?.data[i]
                        teacherarry.push(teacherData);
                    }else if(resdata?.data[i]?.role == "Student"){
                        let studentData = resdata?.data[i]
                        studentarry.push(studentData)
                    } else if(resdata?.data[i]?.role == "Developer"){
                        let developerData = resdata?.data[i]
                        developerarry.push(developerData)
                    } else if(resdata?.data[i]?.role == "Manager"){
                        let managerData = resdata?.data[i];
                        managerArry.push(managerData)
                    } else if(resdata?.data[i]?.role == "Employee"){
                        let employeeData = resdata?.data[i];
                        employeeArry.push(employeeData)
                    }
                }
                setStudent(studentarry.length)
                setTeacher(teacherarry.length)
                setDeveloper(developerarry.length)
                setManager(managerArry.length)
                setEmployee(employeeArry.length)
                setSckelton(false)
              })
        }catch(e){
            console.log("e", e);
            setSckelton(false)
        }
    }
    useEffect(()=>{
        getData()
    },[])
    return (
        <div className='mt-4'>
            <div className='container  mt-4' style={{height: "80vh" , backgroundColor: "#c7d7df", borderRadius: "10px"}}>
                <div className='row d-flex justify-content-md-start justify-content-center'>
                    <div className='col-lg-3 col-11 m-md-4 dashboard-box pt-4 pb-4 text-start d-flex mt-2'>
                        <div className='min-box ms-3'>
                            <HiUsers size={25}/>
                        </div>
                        <div className='ms-2' style={{ lineHeight: "1.5rem" }}>
                            <span className="two-span">
                               {sckelton == true ? <Placeholder as="s" animation="glow"><Placeholder xs={12} /></Placeholder>: <span>{student}</span>} 
                            </span><br/>
                            <span className='Order-span'>Total Student</span>
                        </div>
                    </div>
                    <div className='col-lg-3 col-11 m-md-4 dashboard-box-1 pt-4 pb-4 text-start d-flex mt-2'>
                        <div className='min-box1 ms-3'>
                            <FaCertificate size={25} />
                        </div>
                        <div className='ms-2' style={{ lineHeight: "1.5rem" }}>
                            <span className="two-span">
                            {sckelton == true ? <Placeholder as="s" animation="glow"><Placeholder xs={12} /></Placeholder>: <span>{teacher}</span>} 
                                
                            </span><br/>
                            <span className='Order-span'>Total Tutor</span>
                        </div>
                    </div>
                    <div className='col-lg-3 col-11 m-md-4 dashboard-box pt-4 pb-4 text-start d-flex mt-2'>
                        <div className='min-box2 ms-3'>
                            <HiUser size={25}/>
                        {/* <i className="fa-solid fa-user"></i> */}
                        </div>
                        <div className='ms-2 ' style={{ lineHeight: "1.5rem" }}>
                            <span className="two-span">
                            {sckelton == true ? <Placeholder as="s" animation="glow"><Placeholder xs={12} /></Placeholder>: <span>{sessionData}</span>} 
                            </span><br/>
                            <span className='Order-span'>Total Sessions</span>
                        </div>
                    </div>
                    <div className='col-lg-3 col-11 m-md-4 dashboard-box-1 pt-4 pb-4 text-start d-flex mt-2'>
                        <div className='min-box2 ms-3'>
                        <HiUser size={25}/>
                        </div>
                        <div className='ms-2 ' style={{ lineHeight: "1.5rem" }}>
                            <span className="two-span">
                            {sckelton == true ? <Placeholder as="s" animation="glow"><Placeholder xs={12} /></Placeholder>: <span>{manager}</span>}     
                            </span><br/>
                            <span className='Order-span'>Total Managers</span>
                        </div>
                    </div>
                    <div className='col-lg-3 col-11 m-md-4 dashboard-box pt-4 pb-4 text-start d-flex mt-2'>
                        <div className='min-box2 ms-3'>
                        <HiUser size={25}/>
                        </div>
                        <div className='ms-2' style={{ lineHeight: "1.5rem" }}>
                            <span className="two-span">
                            {sckelton == true ? <Placeholder as="s" animation="glow"><Placeholder xs={12} /></Placeholder>: <span>{employee}</span>}     
                                
                            </span><br/>
                            <span className='Order-span'>Total Admin Staff</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard