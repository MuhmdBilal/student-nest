import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useNavigate,useParams,Link } from "react-router-dom"
import {BACKEND_URI} from "../../config/config"
function ShowSingleSubjectData() {
    const navigate = useNavigate();
    const params = useParams();
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [createDate,setCreateDate] = useState('');
    const [active, setActive] = useState("");
    const singleDataAgency = async()=>{
        try{
            await axios.get(`${BACKEND_URI}/single_person_subjects_data/${params.id}`).then((res1)=>{
            setTitle(res1.data.title)
            setDescription(res1.data.description)
            setCreateDate(res1.data.currentTime);
            setActive(res1.data.active)
            })
        }catch(e){
            console.log("e",e);
        }
    }
    useEffect(()=>{
        singleDataAgency()
    },[])
    return (
        <div className='conatiner'>
            <div className='row user-box-1 mt-5'>
                <div className='col-lg-12 col-12  d-flex justify-content-center  justify-content-between align-items-center pt-3 pb-3'>
                    <h4 className='user-h4 mt-2'>{title}</h4>

                </div>
            </div>
            <div className='row d-flex justify-content-center justify-content-between pt-3 pb-3 align-items-center' style={{ background: "#c7d7df", borderBottomLeftRadius: "10px" , borderBottomRightRadius: "10px"  }}>

                <div className='col-lg-2 text-md-start mt-2 ps-md-4'>
                    <h6>Title</h6>
                </div>
                <div className='col-lg-10 text-md-start mt-2'>
                    <span>{title}</span>
                </div>
                <div className='col-lg-2 text-md-start mt-2 ps-md-4 mt-3'>
                    <h6>Description</h6>
                </div>
                <div className='col-lg-10 text-md-start mt-2 '>
                    <span>{description}</span>
                </div>
                <div className='col-lg-2 text-md-start mt-2 ps-md-4 mt-3'>
                    <h6>Create Date</h6>
                </div>
                <div className='col-lg-10 text-md-start mt-2'>
                    <span>{createDate}</span>
                </div>
                <div className='col-lg-2 text-md-start mt-2 ps-md-4 mt-4'>
                    <h6>Status</h6>
                </div>
                <div className='col-lg-10 text-md-start mt-4'>
                    {active == "true" ? <button className='btn btn-active' size="sm">Active</button> : <button className='btn btn-Inactive' size="sm">Inactive</button>}
                </div>

                <div className='col-md-11 mt-4 pt-3 pb-3 mb-5 ms-md-4 text-start' style={{ borderBottom: "1px solid #838383", borderTop: "1px solid #838383" }}>
                    <Link to={`/sidebar/update_single_subject_data/${params.id}`} style={{ textDecoration: "none" }}><button className='btn btn-Edit me-2' >Edit</button></Link>
                    <button className='btn btn-Cancel' onClick={() => navigate("/sidebar/subject")}>Cancel</button>
                </div>

            </div>
        </div>
    )
}

export default ShowSingleSubjectData