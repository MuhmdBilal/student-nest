import React, { useEffect, useState } from 'react'
import { BACKEND_URI } from "../../config/config";
import axios from 'axios';
import { useNavigate, useParams, Link } from "react-router-dom"

function AdminUpdate() {
    const params = useParams();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEMail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [address, setAddress] = useState("");
    const showData = async () => {
        try {
            await axios.get(`${BACKEND_URI}/admin_data_show/${params.id}`).then((adminRes) => {
                setFirstName(adminRes.data?.firstName)
                setLastName(adminRes.data?.lastName)
                setEMail(adminRes.data?.email)
                setMobileNumber(adminRes.data?.mobileNumber)
                setAddress(adminRes.data?.address)
            })
        } catch (e) {
            console.log("e", e);
        }
    }


    const UpdateData = async()=>{
        try{
         await axios.put(`${BACKEND_URI}/admin_update_data/${params.id}`, {
            firstName,lastName, email,mobileNumber,address
         }).then(()=>{
            navigate("/sidebar/dashboard")
         })
        }catch(e){
            console.log("e", e);
        }
    }
    
    useEffect(() => {
        showData()
    }, [])
  return (
    <div className='container mt-5'>
            <div className='row user-box-1'>
                <div className='col-lg-12 col-12  d-flex justify-content-center  justify-content-between align-items-center pt-3 pb-3'>
                    <h4 className='user-h4 mt-2'>Admin Update</h4>
                </div>
            </div>
            <div className='row d-flex flex-column justify-content-center justify-content-between pt-3 pb-3 align-items-center' style={{ background: "#c7d7df", borderBottomLeftRadius: "10px" , borderBottomRightRadius: "10px" }}>
            <div className='col-lg-6 text-md-start mt-2'>
                    <div className="mb-3 d-flex align-items-center">
                        <div className='col-md-2'>
                            <label htmlFor="exampleFormControlInput1" className="form-label mt-2">First Name</label>
                        </div>
                        <input type="text" className="form-control ms-3" id="exampleFormControlInput1" placeholder="First Name ..." value={firstName} onChange={(e) => setFirstName(e.target.value)} required /><br />
                    </div>
                </div>
               
                <div className='col-lg-6 text-md-start mt-2'>
                    <div className="mb-3 d-flex align-items-center">
                        <div className='col-md-2'>
                            <label htmlFor="exampleFormControlInput1" className="form-label mt-2">Last Name</label>
                        </div>
                        <input type="text" className="form-control ms-3" id="exampleFormControlInput1" placeholder="Last Name ..." value={lastName} onChange={(e) => setLastName(e.target.value)} required /><br />
                    </div>
                </div>
                <div className='col-lg-6 text-md-start mt-2'>
                    <div className="mb-3 d-flex align-items-center">
                        <div className='col-md-2'>
                            <label htmlFor="exam pleFormControlInput1" className="form-label mt-2">Email</label>
                        </div>
                        <input type="email" className="form-control ms-3" id="exampleFormControlInput1" placeholder="Email ..." value={email} onChange={(e) => setEMail(e.target.value)} required />
                        <br />
                    </div>
                </div>
                <div className='col-lg-6 text-md-start mt-2'>
                    <div className="mb-3 d-flex align-items-center">
                        <div className='col-md-2'>
                            <label htmlFor="exampleFormControlInput1" className="form-label mt-2">Mobile No.</label>
                        </div>
                        <input type="text" className="form-control ms-3" id="exampleFormControlInput1" placeholder="Mobile No." value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required /><br />
                    </div>
                </div>
                <div className='col-lg-6 text-md-start mt-2'>
                    <div className="mb-3 d-flex align-items-center">
                        <div className='col-md-2'>
                            <label htmlFor="exampleFormControlInput1" className="form-label mt-2">Address</label>
                        </div>
                        <input type="text" className="form-control ms-3" id="exampleFormControlInput1" placeholder="Address ..." value={address} onChange={(e) => setAddress(e.target.value)} required /><br />
                    </div>
                </div>
                <div className='col-md-11 mt-4 pt-3 pb-3 mb-5' style={{ borderBottom: "1px solid #838383", borderTop: "1px solid #838383" }}>
                    <button className='btn btn-save me-2' onClick={UpdateData}>Save</button>
                    <button className='btn btn-Cancel' onClick={() => navigate("/sidebar/dashboard")}>Cancel</button>
                </div>

            </div>
        </div>
  )
}

export default AdminUpdate