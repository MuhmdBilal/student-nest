import React, { useEffect, useState } from 'react'
import { BACKEND_URI } from "../../config/config";
import axios from 'axios';
import { useNavigate, useParams, Link } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
import Alert from 'react-bootstrap/Alert';


function PasswordReset() {
    const [oldPassword, setOldPassword] = useState("")
    const [password, setPassword] = useState("")
    const [newRePassword, setNewRePassword] = useState("")
    const [passwordError, setPasswordError] = useState(false);
    const [dataError, setDataError] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    const UpdateData = async () => {
        try {
            if (!oldPassword || !password || !newRePassword) {
                setDataError(true)

                return false;
            }
            setDataError(false)
            if (password !== newRePassword) {
                setPasswordError(true);
                return false;
            }

            setPasswordError(false);
            await axios.put(`${BACKEND_URI}/reset_password/${params.id}`, {
                oldPassword,
                password
            }).then((updatePassword) => {
                console.log(updatePassword.data.result);
                if (updatePassword.data.result == "Old password not exist! please enter correct old password") {
                    toast.error("Old password not exist! please enter correct old password")
                } else {
                    navigate("/")
                }
            })
        } catch (e) {
            console.log("e", e);
        }
    }
    return (
        <div className='container mt-5'>
            <div className='row user-box-1'>
                <div className='col-lg-12 col-12  d-flex justify-content-center  justify-content-between align-items-center pt-3 pb-3'>
                    <h4 className='user-h4 mt-2'>Admin Update</h4>
                </div>
            </div>
            <div className='row d-flex flex-column justify-content-center justify-content-between pt-3 pb-3 align-items-center' style={{ background: "#c7d7df", borderBottomLeftRadius: "10px" , borderBottomRightRadius: "10px" }}>
                <div className='col-lg-6 text-md-start mt-2'>
                    <div className='ms-5'>
                        {dataError == true ? (
                            <Alert key="danger" variant="danger">
                                Input Field Not Empty
                            </Alert>
                        ) : (<></>)}
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                        <div className='col-md-3'>
                            <label htmlFor="exampleFormControlInput1" className="form-label mt-2">Old Password</label>
                        </div>
                        <input type="password" className="form-control ms-3" id="exampleFormControlInput1" placeholder="Old Password ..." value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required /><br />
                    </div>
                </div>

                <div className='col-lg-6 text-md-start mt-2'>
                    <div className="mb-3 d-flex align-items-center">
                        <div className='col-md-3'>
                            <label htmlFor="exampleFormControlInput1" className="form-label mt-2">New Password</label>
                        </div>
                        <input type="password" className="form-control ms-3" id="exampleFormControlInput1" placeholder="New Password ..." value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
                    </div>
                </div>
                <div className='col-lg-6 text-md-start mt-2'>
                    <div className="mb-3 d-flex align-items-center">
                        <div className='col-md-3'>
                            <label htmlFor="exam pleFormControlInput1" className="form-label mt-2">Re-enter Passowrd</label>
                        </div>
                        <input type="password" className="form-control ms-3" id="exampleFormControlInput1" placeholder="Re-enter Passowrd ..." value={newRePassword} onChange={(e) => setNewRePassword(e.target.value)} required />
                        <br />

                    </div>
                    <div className='ms-5'>
                        {passwordError && (
                            <div className="text-start" style={{ color: "red" }}>
                                Re-Type Password is not metched
                            </div>
                        )}
                    </div>
                </div>

                <div className='col-md-11 mt-4 pt-3 pb-3 mb-5' style={{ borderBottom: "1px solid #838383", borderTop: "1px solid #838383" }}>
                    <button className='btn btn-save me-2' onClick={UpdateData}>Save</button>
                    <button className='btn btn-Cancel' onClick={() => navigate("/sidebar/dashboard")}>Cancel</button>
                </div>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
        </div>
    )
}

export default PasswordReset