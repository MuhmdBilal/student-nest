import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
function PrivateComponent({state}) {
  let auths = localStorage.getItem("studentNest")
  return auths? <Outlet/> : <Navigate to="/"/>
}

export default PrivateComponent