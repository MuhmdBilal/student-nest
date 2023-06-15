import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import { GoPlus, GoX } from 'react-icons/go';
import { BACKEND_URI } from '../../config/config';
import axios from "axios"
function ProgressReport({ programSelectData, reportSelect, handleClose, idsTeacher, setShow, getProgressReport, image, program }) {
    const [studentName, setStudentName] = useState("")
    const [tutoringStartDate, setTutoringStartDate] = useState('')
    const [tutorName, setTutorName] = useState('')
    const [telephoneNumber, setTelephoneNumber] = useState('')
    const [date, setDate] = useState('')
    const [object1, setOnject1] = useState([])
    const [inputList, setInputList] = useState([{ Goal: "", description: "",  selectedOption : '' }]);
    const [inputListTask1, setInputListTask1] = useState([{ Goal: "", description: "" , selectedOption : '' }]);
    const [inputListTask2, setInputListTask2] = useState([{ Goal: "", description: "",  selectedOption : '' }]);
    const [inputListTask3, setInputListTask3] = useState([{ Goal: "", description: "", selectedOption : '' }]);
    const [inputListTask4, setInputListTask4] = useState([{ Goal: "", description: "" , selectedOption : ''}]);
    const [tutoringAgency, setTutoringAgency] = useState('Student Nest')
    //...........................Task 1 STart .........................//
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
        setInputList([...inputList, { Goal: "", description: "" , selectedOption : '' }]);
    };
   
 // ........................... Task 1 End .............................//


 // ........................... task2 start .............................//
 const handleInputChangeTask1 = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputListTask1];
    list[index][name] = value;
    setInputListTask1(list);
};

// handle click event of the Remove button
const handleRemoveClickTask1 = index => {
    const list = [...inputListTask1];
    list.splice(index, 1);
    setInputListTask1(list);
};

// handle click event of the Add button
const handleAddClickTask1 = () => {
    setInputListTask1([...inputListTask1, { Goal: "", description: "" , selectedOption : '' }]);
};
 
//.......................... Task 2 End ...............................//
 
// ......................... Task 3  start ............................//

const handleInputChangeTask2 = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputListTask2];
    list[index][name] = value;
    setInputListTask2(list);
};

// handle click event of the Remove button
const handleRemoveClickTask2 = index => {
    const list = [...inputListTask2];
    list.splice(index, 1);
    setInputListTask2(list);
};

// handle click event of the Add button
const handleAddClickTask2 = () => {
    setInputListTask2([...inputListTask2, { Goal: "", description: "" , selectedOption : '' }]);
};

// ......................... Task 3  End ............................//  

// ......................... Task 4  Start ............................//  
const handleInputChangeTask3 = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputListTask3];
    list[index][name] = value;
    setInputListTask3(list);
};

// handle click event of the Remove button
const handleRemoveClickTask3 = index => {
    const list = [...inputListTask3];
    list.splice(index, 1);
    setInputListTask3(list);
};

// handle click event of the Add button
const handleAddClickTask3 = () => {
    setInputListTask3([...inputListTask3, { Goal: "", description: "" , selectedOption : '' }]);
};

// ......................... Task 4  End ............................// 

// ......................... Task 5  start ............................// 

const handleInputChangeTask4 = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputListTask4];
    list[index][name] = value;
    setInputListTask4(list);
};

// handle click event of the Remove button
const handleRemoveClickTask4 = index => {
    const list = [...inputListTask4];
    list.splice(index, 1);
    setInputListTask4(list);
};

// handle click event of the Add button
const handleAddClickTask4 = () => {
    setInputListTask4([...inputListTask4, { Goal: "", description: "" , selectedOption : '' }]);
};
// ......................... Task 5  End ............................// 
    


    const handleReportData = async () => {
        try {
            await axios.post(`${BACKEND_URI}/Progress_Report`, {
                Teacher_Id : idsTeacher,
                Pragram_Value: programSelectData,
                Report_Value: reportSelect,
                student_Name : studentName,
                tutoring_Start_Date : tutoringStartDate,
                tutor_Name: tutorName,
                telephone_Number: telephoneNumber,
                date: date,
                Task_One: inputList,
                Task_Two: inputListTask1,
                Task_Three: inputListTask2,
                Task_Four: inputListTask3,
                Task_Five: inputListTask4,
                tutoring_Agency: tutoringAgency,
                image: image,
                program: program
            }).then((res)=>{
                // console.log("res", res);
                setShow(false)
                getProgressReport()
            })
        } catch (err) {
            console.log("err", err);
        }
    }
    return (
        <div>
            <div className='row d-flex justify-content-center'>
                <div className='col-md-8'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='lable-text'>Date</Form.Label>
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
                        <Form.Label className='lable-text'>Tutoring Start Date </Form.Label>
                        <Form.Control type="date" placeholder="Tutoring Start Date " value={tutoringStartDate} onChange={(e) => setTutoringStartDate(e.target.value)} />
                    </Form.Group>
                </div>
                <div className='col-md-12'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='lable-text'>Tutoring Agency </Form.Label>
                        <Form.Control type="text" placeholder="Tutoring Agency " value={tutoringAgency} />
                    </Form.Group>
                </div>
                <div className='col-md-8'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='lable-text'>Tutor’s Name </Form.Label>
                        <Form.Control type="text" placeholder="Tutor’s Name " value={tutorName} onChange={(e) => setTutorName(e.target.value)} />
                    </Form.Group>
                </div>
                <div className='col-md-4'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='lable-text'>Telephone Number</Form.Label>
                        <Form.Control type="text" placeholder="(000) - 000 - 0000" value={telephoneNumber} onChange={(e) => setTelephoneNumber(e.target.value)} />
                    </Form.Group>
                </div>
                <div className='row mt-3 d-flex justify-content-center'>
                    <div className='col-12' style={{ borderTop: "1px solid black" }}></div>
                    <h5 className='mt-3'>Week 1</h5>
                    {
                        inputList.map((x, i) => {
                            return (
                                <>
                                    <div className='col-md-3'>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className='lable-text'>Goal/Obj. </Form.Label>
                                            <Form.Control type="text" name="Goal" placeholder="Goal/Obj..." value={x.Goal} onChange={e => handleInputChange(e, i)} />
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-5'>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className='lable-text'>Description of Objective to Meet </Form.Label>
                                            <Form.Control type="text" name="description" placeholder="Description" value={x.description} onChange={e => handleInputChange(e, i)} />
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-3'>
                                        <Form>
                                            <Form.Label className='lable-text'>Objective Met</Form.Label>
                                            <div key="radio" className="mb-3">
                                                <Form.Check inline label="Yes" name="group1" type="radio" id="radio-1" value="yes" onChange={e => handleInputChange(e, i)}/>
                                                <Form.Check inline label="No" name="group1" type="radio" id="radio-2" value="no" onChange={e => handleInputChange(e, i)}/>
                                            </div>
                                        </Form>
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
                <div className='row mt-3 d-flex justify-content-center'>
                    <div className='col-12' style={{ borderTop: "1px solid black" }}></div>
                    <h5 className='mt-3'>Week 2</h5>
                    {
                        inputListTask1.map((x, i) => {
                            return (
                                <>
                                    <div className='col-md-3'>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className='lable-text'>Goal/Obj.  </Form.Label>
                                            <Form.Control type="text" name="Goal" placeholder="Goal/Obj..." value={x.Goal} onChange={e => handleInputChangeTask1(e, i)} />
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-5'>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className='lable-text'>Description of Objective to Meet </Form.Label>
                                            <Form.Control type="text" name="description" placeholder="Description" value={x.description} onChange={e => handleInputChangeTask1(e, i)} />
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-3'>
                                        <Form>
                                            <Form.Label className='lable-text'>Objective Met</Form.Label>
                                            <div key="radio" className="mb-3">
                                                <Form.Check inline label="Yes" name="group1" type="radio" id="radio-1" value="yes" onChange={e => handleInputChangeTask1(e, i)}/>
                                                <Form.Check inline label="No" name="group1" type="radio" id="radio-2" value="no" onChange={e => handleInputChangeTask1(e, i)}/>
                                            </div>
                                        </Form>
                                    </div>
                                    <div className='col-1 mt-4'>
                                        {inputListTask1.length !== 1 && <GoX
                                            className="mr10"
                                            color="red"
                                            onClick={() => handleRemoveClickTask1(i)} />}
                                        {inputListTask1.length - 1 === i && <GoPlus onClick={handleAddClickTask1}/>}
                                    </div>
                                </>
                            )
                        })
                    }
                   
                </div>
                <div className='row mt-3 d-flex justify-content-center'>
                    <div className='col-12' style={{ borderTop: "1px solid black" }}></div>
                    <h5 className='mt-3'>Week 3</h5>

                    {
                        inputListTask2.map((x, i) => {
                            return (
                                <>
                                    <div className='col-md-3'>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className='lable-text'>Goal/Obj.  </Form.Label>
                                            <Form.Control type="text" name="Goal" placeholder="Goal/Obj..." value={x.Goal} onChange={e => handleInputChangeTask2(e, i)} />
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-5'>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className='lable-text'>Description of Objective to Meet </Form.Label>
                                            <Form.Control type="text" name="description" placeholder="Description" value={x.description} onChange={e => handleInputChangeTask2(e, i)} />
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-3'>
                                        <Form>
                                            <Form.Label className='lable-text'>Objective Met</Form.Label>
                                            <div key="radio" className="mb-3">
                                                <Form.Check inline label="Yes" name="group1" type="radio" id="radio-1" value="yes" onChange={e => handleInputChangeTask2(e, i)}/>
                                                <Form.Check inline label="No" name="group1" type="radio" id="radio-2" value="no" onChange={e => handleInputChangeTask2(e, i)}/>
                                            </div>
                                        </Form>
                                    </div>
                                    <div className='col-1 mt-4'>
                                        {inputListTask2.length !== 1 && <GoX
                                            className="mr10"
                                            color="red"
                                            onClick={() => handleRemoveClickTask2(i)} />}
                                        {inputListTask2.length - 1 === i && <GoPlus onClick={handleAddClickTask2}/>}
                                    </div>
                                </>
                            )
                        })
                    }
                   
                </div>
                <div className='row mt-3 d-flex justify-content-center'>
                    <div className='col-12' style={{ borderTop: "1px solid black" }}></div>
                    <h5 className='mt-3'>Week 4</h5>
                    {
                        inputListTask3.map((x, i) => {
                            return (
                                <>
                                    <div className='col-md-3'>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className='lable-text'>Goal/Obj.  </Form.Label>
                                            <Form.Control type="text" name="Goal" placeholder="Goal/Obj..." value={x.Goal} onChange={e => handleInputChangeTask3(e, i)} />
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-5'>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className='lable-text'>Description of Objective to Meet </Form.Label>
                                            <Form.Control type="text" name="description" placeholder="Description" value={x.description} onChange={e => handleInputChangeTask3(e, i)} />
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-3'>
                                        <Form>
                                            <Form.Label className='lable-text'>Objective Met</Form.Label>
                                            <div key="radio" className="mb-3">
                                                <Form.Check inline label="Yes" name="group1" type="radio" id="radio-1" value="yes" onChange={e => handleInputChangeTask3(e, i)}/>
                                                <Form.Check inline label="No" name="group1" type="radio" id="radio-2" value="no" onChange={e => handleInputChangeTask3(e, i)}/>
                                            </div>
                                        </Form>
                                    </div>
                                    <div className='col-1 mt-4'>
                                        {inputListTask3.length !== 1 && <GoX
                                            className="mr10"
                                            color="red"
                                            onClick={() => handleRemoveClickTask3(i)} />}
                                        {inputListTask3.length - 1 === i && <GoPlus onClick={handleAddClickTask3}/>}
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                <div className='row mt-3 d-flex justify-content-center'>
                    <div className='col-12' style={{ borderTop: "1px solid black" }}></div>
                    <h5 className='mt-3'>Week 5</h5>
                    {
                        inputListTask4.map((x, i) => {
                            return (
                                <>
                                    <div className='col-md-3'>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className='lable-text'>Goal/Obj.  </Form.Label>
                                            <Form.Control type="text" name="Goal" placeholder="Goal/Obj..." value={x.Goal} onChange={e => handleInputChangeTask4(e, i)} />
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-5'>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className='lable-text'>Description of Objective to Meet </Form.Label>
                                            <Form.Control type="text" name="description" placeholder="Description" value={x.description} onChange={e => handleInputChangeTask4(e, i)} />
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-3'>
                                        <Form>
                                            <Form.Label className='lable-text'>Objective Met</Form.Label>
                                            <div key="radio" className="mb-3">
                                                <Form.Check inline label="Yes" name="group1" type="radio" id="radio-1" value="yes" onChange={e => handleInputChangeTask4(e, i)}/>
                                                <Form.Check inline label="No" name="group1" type="radio" id="radio-2" value="no" onChange={e => handleInputChangeTask4(e, i)}/>
                                            </div>
                                        </Form>
                                    </div>
                                    <div className='col-1 mt-4'>
                                        {inputListTask4.length !== 1 && <GoX
                                            className="mr10"
                                            color="red"
                                            onClick={() => handleRemoveClickTask4(i)} />}
                                        {inputListTask4.length - 1 === i && <GoPlus onClick={handleAddClickTask4}/>}
                                    </div>
                                </>
                            )
                        })
                    }
                    
                </div>
                <div>
                    <button className='btn btn-primary' onClick={handleReportData}>
                        save
                    </button>
                    <button className='btn btn-secondary ms-2' onClick={handleClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProgressReport






// const handleAddField = (index) => {
    //     if (activeIndexes.includes(index)) {
    //         setActiveIndexes(activeIndexes.filter((i) => i !== index));
    //         console.log("activeIndexes", activeIndexes);
    //         setInputFields(activeIndexes);
    //         setOnject1((prevValues) => {
    //             const updatedValues = [...prevValues];
    //             updatedValues.splice(index, 1);
    //             return updatedValues;
    //           });
    //     } else {
    //         setActiveIndexes([...activeIndexes, index]);
    //         setInputFields([...inputFields, 1]);
    //         setOnject1((prevValues) => [...prevValues, '']);
    //     }
    // };
    // const handleAddFieldTask1 = (index) => {
    //     if (activeIndexesTask2.includes(index)) {
    //         setActiveIndexesTask2(activeIndexesTask2.filter((i) => i !== index));
    //         setInputFieldsTask1(activeIndexesTask2);
    //     } else {
    //         setActiveIndexesTask2([...activeIndexesTask2, index]);
    //         setInputFieldsTask1([...inputFieldsTask1, 1]);
    //     }
    // };
    // const handleAddFieldTask2 = (index) => {
    //     if (activeIndexesTask3.includes(index)) {
    //         setActiveIndexesTask3(activeIndexesTask3.filter((i) => i !== index));
    //         setInputFieldsTask3(activeIndexesTask3);
    //     } else {
    //         setActiveIndexesTask3([...activeIndexesTask3, index]);
    //         setInputFieldsTask3([...inputFieldsTask3, 1]);
    //     }
    // };
    // const handleAddFieldTask3 = (index) => {
    //     if (activeIndexesTask4.includes(index)) {
    //         setActiveIndexesTask4(activeIndexesTask4.filter((i) => i !== index));
    //         setInputFieldsTask4(activeIndexesTask4);
    //     } else {
    //         setActiveIndexesTask4([...activeIndexesTask4, index]);
    //         setInputFieldsTask4([...inputFieldsTask4, 1]);
    //     }
    // };
    // const handleAddFieldTask4 = (index) => {
    //     if (activeIndexesTask5.includes(index)) {
    //         setActiveIndexesTask5(activeIndexesTask5.filter((i) => i !== index));
    //         setInputFieldsTask5(activeIndexesTask5);
    //     } else {
    //         setActiveIndexesTask5([...activeIndexesTask5, index]);
    //         setInputFieldsTask5([...inputFieldsTask5, 1]);
    //     }
    // };
    // const handleGoal1 = (event, index) =>{
    //     setOnject1([...object1, event.target.value, index])
    // }
    // const handleInputChange = (newValue, index) => {
    //     setOnject1((prevValues) => {
    //       const updatedValues = [...prevValues];
    //       updatedValues[index] = newValue;
    //       return updatedValues;
    //     });
    //   };
     {/* {inputFieldsTask3.map((input, index) => (
                        <>
                            <div className='col-md-3'>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Goal/Obj.  </Form.Label>
                                    <Form.Control type="text" placeholder="Goal/Obj.  " />
                                </Form.Group>
                            </div>
                            <div className='col-md-5'>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Description of Objective to Meet </Form.Label>
                                    <Form.Control type="text" placeholder="Description" />
                                </Form.Group>
                            </div>
                            <div className='col-md-3'>
                                <Form>
                                    <Form.Label>Objective Met</Form.Label>
                                    <div key="radio" className="mb-3">
                                        <Form.Check inline label="Yes" name="group1" type="radio" id="radio-1" />
                                        <Form.Check inline label="No" name="group1" type="radio" id="radio-2" />
                                    </div>
                                </Form>
                            </div>
                            <div className='col-1 mt-4'>
                                {activeIndexesTask3.includes(index) ? (
                                    <GoX color="red" onClick={() => handleAddFieldTask2(index)} />
                                ) : (
                                    <GoPlus onClick={() => handleAddFieldTask2(index)} />
                                )}
                            </div>
                        </>
                    ))} */}
