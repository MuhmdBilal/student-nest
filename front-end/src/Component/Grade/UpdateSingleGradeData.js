import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios';
import { BACKEND_URI } from "../../config/config"
import Spinner from 'react-bootstrap/Spinner';
import toast, { Toaster } from 'react-hot-toast';
function UpdateSingleUpdateData() {
    const [active, setActive] = useState(false);
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [currentTime, setCurrentTime] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const activeChange = (e) => {
        setActive(!active)
    }
    const singleDataAgency = async () => {
        try {
            await axios.get(`${BACKEND_URI}/single_person_grades_data/${params.id}`).then((res1) => {
                setTitle(res1.data.title)
                setDescription(res1.data.description)
                setCurrentTime(res1.data.currentTime);
                setActive(res1.data.active)
            })
        } catch (e) {
            console.log("e", e);
        }
    }

    const UpdateData = async () => {
        try {
            setLoading(true)
            await axios.put(`${BACKEND_URI}/update_single_person_grades_data/${params.id}`, {
                active,
                title,
                description,
                currentTime,
            }).then((res2) => {
                setLoading(false)
                navigate("/sidebar/grade")
                toast.success("Grade Updated successfully")
            })
        } catch (e) {
            console.log(e);
            setLoading(false)
            toast.error("May be Server Error! Please Refresh Page")
        }
    }
    useEffect(() => {
        singleDataAgency()
    }, [])
    return (
        <div className='container'>
            <div className='row user-box-1'>
                <div className='col-lg-12 col-12  d-flex justify-content-center  justify-content-between align-items-center pt-3 pb-3'>
                    <h4 className='user-h4 mt-2'>Update GRADE</h4>

                </div>
            </div>
            <div className='row d-flex flex-column justify-content-center justify-content-between pt-3 pb-3 align-items-center' style={{ background: "#c7d7df", borderBottomLeftRadius: "10px" , borderBottomRightRadius: "10px"  }}>

                <div className='col-lg-6 text-md-start mt-2'>

                    <div className="mb-3 d-flex align-items-center">
                        <div className='col-md-2'>
                            <label htmlFor="exam pleFormControlInput1" className="form-label mt-2">Title</label>
                        </div>
                        <input type="email" className="form-control ms-3" id="exampleFormControlInput1" placeholder="Agency Name" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        <br />
                    </div>

                </div>
                <div className='col-lg-6 text-md-start mt-2'>
                    <div className="mb-3 d-flex align-items-center">
                        <div className='col-md-2'>

                            <label htmlFor="exampleFormControlInput1" className="form-label mt-2">Description</label>
                        </div>
                        <input type="email" className="form-control ms-3" id="exampleFormControlInput1" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required /><br />


                    </div>
                </div>
                <div className='col-lg-6 text-md-start mt-2 d-flex'>
                    <div className='col-md-2'>
                        <label htmlFor="exampleFormControlInput1" className="form-label mt-2">Status</label>
                    </div>
                    <label className="switch">
                        <input type="checkbox" id="togBtn" value={active} onChange={activeChange} />
                        <div className="slider round">

                            <span className="on" value="on">Active</span>
                            <span className="off" value="off">Inactive</span>

                        </div>
                    </label>

                </div>

                <div className='col-md-11 mt-4 pt-3 pb-3 mb-5' style={{ borderBottom: "1px solid #838383", borderTop: "1px solid #838383" }}>
                    <button className='btn btn-save me-2' onClick={UpdateData}>{loading == true ? <Spinner animation="border" /> : <span>Update</span>}</button>
                    <button className='btn btn-Cancel' onClick={() => navigate("/sidebar/grade")}>Cancel</button>
                </div>
                <Toaster
                position="top-right"
                reverseOrder={false}
            />
            </div>
        </div>
    )
}

export default UpdateSingleUpdateData