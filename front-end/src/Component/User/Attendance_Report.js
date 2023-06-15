import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import { GoPlus, GoX } from 'react-icons/go';
import { BACKEND_URI } from '../../config/config';
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
function Attendance_Report({programSelectData,reportSelect,handleClose,idsTeacher, setShow, getAttendanceReport, image, program }) {
    const [date, setDate] = useState('')
    const [studentName, setStudentName] = useState("")
    const [grade, setGrade] = useState('')
    const [tutorName, setTutorName] = useState('')
    const [tutoringStartDate, setTutoringStartDate] = useState('')
    const [projectEndDate, setProjectEndDate] = useState("")
    const [caregiverName, setCaregiverName] = useState('')
    const [caregiverTelephoneNumber, setCaregiverTelephoneNumber] = useState('')
    const [PreviousHoursTutored, setPreviousHoursTutored] = useState('')
    const [hoursTutoredThisMonth, setHoursTutoredThisMonth] = useState('')
    const [inputList, setInputList] = useState([{ Date: "", Start_Time: "" , End_Time : '', Hours: "", Goal_from_SLP : "" }]);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { Date: "", Start_Time: "" , End_Time : '', Hours: "", Goal_from_SLP : "" }]);
    };
   const handleAttendanceData = async()=>{
    try{
    // console.log(programSelectData,reportSelect, idsTeacher, date, studentName, grade,tutorName, tutoringStartDate , projectEndDate,caregiverName,caregiverTelephoneNumber, PreviousHoursTutored, inputList );
    await axios.post(`${BACKEND_URI}/attendance_Report_Data`, {
        Teacher_Id: idsTeacher,
        Pragram_Value: programSelectData,
        Report_Value : reportSelect,
        date: date,
        student_Name: studentName,
        Grade: grade,
        tutor_Name: tutorName,
        tutoring_Start_Date: tutoringStartDate,
        project_End_Date: projectEndDate,
        caregiver_Name: caregiverName,
        caregiver_Telephone_Number: caregiverTelephoneNumber,
        Previous_Hours_Tutored: PreviousHoursTutored,
        Attendance_value: inputList,
        hoursTutoredThisMonth:hoursTutoredThisMonth,
        image: image,
        program: program
    }).then((response)=>{
        console.log("response", response);
        toast.success("Attendance Data Submit sucessfully")
        setShow(false)
        getAttendanceReport()
    })
    }catch(e){
        console.log("e", e);
    }
   }
    return (
        <div>
            <div className='row d-flex justify-content-center'>
                <div className='col-md-8'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='lable-text'>Reporting for Month and Years: </Form.Label>
                        <Form.Control type="date" placeholder="Name of Student" value={date} onChange={(e) => setDate(e.target.value)} />
                    </Form.Group>
                </div>
                <div className='col-md-8'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='lable-text'>Name of Student</Form.Label>
                        <Form.Control type="text" placeholder="Name of Student" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
                    </Form.Group>
                </div>
                <div className='col-md-4'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='lable-text'>Grade</Form.Label>
                        <Form.Control type="text" placeholder="grade... " value={grade} onChange={(e) => setGrade(e.target.value)} />
                    </Form.Group>
                </div>
                <div className='col-md-4'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='lable-text'>Tutoring Start Date </Form.Label>
                        <Form.Control type="date" placeholder="Tutoring Start Date " value={tutoringStartDate} onChange={(e) => setTutoringStartDate(e.target.value)} />
                    </Form.Group>
                </div>
                <div className='col-md-4'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='lable-text'>Projected End Date:</Form.Label>
                        <Form.Control type="date" placeholder="Projected End Date" value={projectEndDate} onChange={(e) => setProjectEndDate(e.target.value)} />
                    </Form.Group>
                </div>
                <div className='col-md-4'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='lable-text'>Tutor’s Full Name </Form.Label>
                        <Form.Control type="text" placeholder="Tutor’s Name " value={tutorName} onChange={(e) => setTutorName(e.target.value)} />
                    </Form.Group>
                </div>
                <div className='col-md-6'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='lable-text'>Caregiver's Name</Form.Label>
                        <Form.Control type="text" placeholder="Caregiver's Name " value={caregiverName} onChange={(e) => setCaregiverName(e.target.value)} />
                    </Form.Group>
                </div>
                <div className='col-md-6'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='lable-text'>Caregiver Telephone Number</Form.Label>
                        <Form.Control type="text" placeholder="(000) - 000 - 0000 " value={caregiverTelephoneNumber} onChange={(e) => setCaregiverTelephoneNumber(e.target.value)} />
                    </Form.Group>
                </div>
                <div className='col-md-4'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='lable-text'>Previous Hours Tutored</Form.Label>
                        <Form.Control type="text" placeholder="Previous Hours Tutored" value={PreviousHoursTutored} onChange={(e) => setPreviousHoursTutored(e.target.value)} />
                    </Form.Group>
                </div>
                <div className='col-md-8'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='lable-text'>Hours Tutored This Month</Form.Label>
                        <Form.Control type="text" placeholder="Previous Hours Tutored" value={hoursTutoredThisMonth} onChange={(e) => setHoursTutoredThisMonth(e.target.value)} />
                    </Form.Group>
                </div>
                <div className='row mt-3 d-flex justify-content-center'>
                    <div className='col-12' style={{ borderTop: "1px solid black" }}></div>
                    <h5 className='mt-3'>Week 1</h5>
                    {
                        inputList.map((x, i) => {
                            return (
                                <>
                                    <div className='col-md-2'>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className='lable-text'>Date</Form.Label>
                                            <Form.Control type="date" name="Date" placeholder="Date" value={x.Date} onChange={e => handleInputChange(e, i)} />
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-2'>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className='lable-text'>Start Time </Form.Label>
                                            <Form.Control type="time" name="Start_Time" placeholder="Start Time " value={x.Start_Time} onChange={e => handleInputChange(e, i)} />
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-2'>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className='lable-text'>End Time </Form.Label>
                                            <Form.Control type="time" name="End_Time" placeholder="End Time " value={x.End_Time} onChange={e => handleInputChange(e, i)} />
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-2'>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className='lable-text'># Hours  </Form.Label>
                                            <Form.Control type="text" name="Hours" placeholder="# Hours" value={x.Hours} onChange={e => handleInputChange(e, i)} />
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-3'>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className='lable-text'>Goal from SLP</Form.Label>
                                            <Form.Control type="text" name="Goal_from_SLP" placeholder="Goal from SLP " value={x.Goal_from_SLP} onChange={e => handleInputChange(e, i)} />
                                        </Form.Group>
                                    </div>
                                    <div className='col-1 mt-4'>
                                        {inputList.length !== 1 && <GoX
                                            className="mr10"
                                            color="red"
                                            onClick={() => handleRemoveClick(i)} />}
                                        {inputList.length - 1 === i && <GoPlus onClick={handleAddClick}/>}
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                <div>
                    <button className='btn btn-primary' onClick={handleAttendanceData}>
                        save
                    </button>
                    <button className='btn btn-secondary ms-2' onClick={handleClose}>
                        Close
                    </button>
                </div>
            </div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    )
}

export default Attendance_Report