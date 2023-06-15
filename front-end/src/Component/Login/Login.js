import React, { useState } from 'react'
import "./Login.css"
import logo1 from "../../Assets/std-logo.png"
import { useNavigate } from "react-router-dom"
import { BACKEND_URI } from "../../config/config";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
function Login({ setstate, state }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loadingActive, setLoadingActive] = useState(false)
  const Navigate = useNavigate()
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoadingActive(true)
      await axios.post(`${BACKEND_URI}/login`, {
        email,
        password
      }).then((res) => {
        if (res.data.result == "E-mail and password are required") {
          toast.error("E-mail and password are required")
          setLoadingActive(false)
        } else if (res.data.result == "Invalid credentials") {
          toast.error("E-mail are not correct")
          setLoadingActive(false)
        } else if (res.data.result == "Invalid credentials password") {
          toast.error("Password are not correct")
          setLoadingActive(false)
        } else {
          toast.success("Login Successfully")
          setLoadingActive(false)
          setstate(!state)
          Navigate("/sidebar/dashboard")
          localStorage.setItem("studentNest", JSON.stringify(res.data.status))
        }

      })
    } catch (e) {
      toast.error("May be Server Error! Please Refresh Page")
      setLoadingActive(false)
      console.log("e", e);
    }
  }

  return (
    <div className="wrapper">
      {loadingActive == true ? <div className="d-flex justify-content-center align-items-center loader-containerssss" style={{ height: "100vh", width: "100%", position: "fixed", zIndex: "20000" }}><div className="">
        <div className="spinner"></div>
      </div></div> : <div></div>}

      <div className="sct brand ">
        <img src={logo1}  className='logo-width' />
      </div>
      <div className="sct login">
        <form onSubmit={handleSubmit}>
          <h3>SIGN IN NOW</h3>
          <input type="email" placeholder="Email" className='mb-3 ' value={email} onChange={(e) => setEmail(e.target.value)} style={{padding: "1rem 1rem"}} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{padding: "1rem 1rem"}}/>
          <input type="submit" value="SIGN IN" />
        </form>
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  )
}

export default Login