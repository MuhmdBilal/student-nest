import React, { useEffect, useState } from 'react'
import { BACKEND_URI } from "../../config/config";
import axios from 'axios';
import { useNavigate, useParams, Link } from "react-router-dom"
import admin_pic from "../../Assets/94592.png";
function AdminShowData() {
    const params = useParams();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEMail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [address, setAddress] = useState("");
    const [objectId, setObjectId] = useState("")
    const showData = async () => {
        try {
            await axios.get(`${BACKEND_URI}/admin_data_show/${params.id}`).then((adminRes) => {
                setFirstName(adminRes.data?.firstName)
                setLastName(adminRes.data?.lastName)
                setEMail(adminRes.data?.email)
                setMobileNumber(adminRes.data?.mobileNumber)
                setAddress(adminRes.data?.address)
                setObjectId(adminRes?.data?._id)
            })
        } catch (e) {
            console.log("e", e);
        }
    }
    useEffect(() => {
        showData()
    }, [])
    return (
        <div>
            <div className='conatiner'>
                <div className='row user-box-1 mt-5'>
                    <div className='col-lg-12 col-12  d-flex justify-content-center  justify-content-between align-items-center pt-3 pb-3'>
                        <h4 className='user-h4 mt-2'>{firstName} {lastName}</h4>

                    </div>
                </div>
                <div className='row d-flex justify-content-center justify-content-between pt-3 pb-3 align-items-center' >
                    <div className='col-lg-7 clo-heightg' style={{ background: "#c7d7df" }}>

                        <div className='row ' >
                            <div className='col-lg-5 text-md-start mt-4 ps-md-4'>
                                <h6>First Name</h6>
                            </div>
                            <div className='col-lg-7 text-md-start mt-4'>
                                <span>{firstName}</span>
                            </div>
                            <div className='col-lg-5 text-md-start  ps-md-4 mt-3'>
                                <h6>Last Name</h6>
                            </div>
                            <div className='col-lg-7 text-md-start  mt-3'>
                                <span>{lastName}</span>
                            </div>
                            <div className='col-lg-5 text-md-start  ps-md-4 mt-3'>
                                <h6>Email</h6>
                            </div>
                            <div className='col-lg-7 text-md-start mt-3'>
                                <span>{email}</span>
                            </div>
                            <div className='col-lg-5 text-md-start  ps-md-4 mt-3'>
                                <h6>Mobole No.</h6>
                            </div>
                            <div className='col-lg-7 text-md-start mt-3'>
                                <span>{mobileNumber}</span>
                            </div>
                            <div className='col-lg-5 text-md-start  ps-md-4 mt-3'>
                                <h6>Address</h6>
                            </div>
                            <div className='col-lg-7 text-md-start mt-3'>
                                <span>{address}</span>
                            </div>
                            <div className='col-lg-5 text-md-start  ps-md-4 mt-3'>
                                <h6>Role</h6>
                            </div>
                            <div className='col-lg-7 text-md-start mt-3'>
                                <span>Admin</span>
                            </div>
                            <div className='col-md-11 mt-4 pt-3 pb-3 mb-5 ms-md-4 text-start' style={{ borderBottom: "1px solid #838383", borderTop: "1px solid #838383" }}>
                                <Link to={`/sidebar/admin_Update_Data/${objectId}`} style={{ textDecoration: "none" }}><button className='btn btn-Edit me-2' >Edit</button></Link>
                                <button className='btn btn-Cancel' onClick={() => navigate("/sidebar/dashboard")}>Cancel</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-5 clo-heightg d-flex justify-content-center align-items-center' style={{ backgroundColor: "#c0dfdf" }}>
                      
                       <img  src={admin_pic} className="image-adim" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminShowData