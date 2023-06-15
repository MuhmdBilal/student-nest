import React, { useEffect, useState } from 'react'
import { BACKEND_URI } from "../../config/config"
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { Link } from "react-router-dom"
import Spinner from 'react-bootstrap/Spinner';
import DataTable, {createTheme} from 'react-data-table-component';
import { BiLogOut } from "react-icons/bi"
import { MdDelete } from "react-icons/md"
import toast, { Toaster } from 'react-hot-toast';
import Modal from "react-bootstrap/Modal";
import Placeholder from 'react-bootstrap/Placeholder';
import Form from 'react-bootstrap/Form';
function Programs() {
    const [status, setStatus] = useState(false);
    const [active, setActive] = useState(false);
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState(false);
    const [getAgencyData, setGetAgencyData] = useState([])
    const [activeShow, setActiveShow] = useState(0)
    const [getAgencyDataFalse, setGetAgencyDataFalse] = useState([])
    const [totalAgenciesActive, setTotalAgenciesActive] = useState(0)
    const [totalAgenciesInactive, setTotalAgenciesInactive] = useState(0)
    const [loadingActive, setLoadingActive] = useState(false)
    const [lodaing, setloading] = useState(false)
    const [tableLoading, setTableLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [searchInactive, setSearchInactive] = useState("")
    const [filterSearch, setFilterSearch] = useState([])
    const [filterSearchInactive, setFilterSearchInactive] = useState([])
    const [modalShow, setModalShow] = useState(false);
    const [scheduleTableId, setscheduleTableId] = useState("");
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [sckelton,setSckelton] = useState(false);
    const [imageSource, setImageSource] = useState()
    const columns = [
        {
            name: <span style={{ fontSize: "15px", fontWeight: "600" }}>Title</span>,
            selector: row => row.title,
            sortable: true
        },
        {
            name: <span style={{ fontSize: "15px", fontWeight: "600" }}>Description</span>,
            selector: row => row.description,
            sortable: true
        },

        {
            name: <span style={{ fontSize: "15px", fontWeight: "600" }}>Create Date</span>,
            selector: row => row.currentTime,
            sortable: true
        },
        {
            name: <span style={{ fontSize: "15px", fontWeight: "600" }}>Status</span>,
            cell: (row) => row.active == "true" ? <button className='btn btn-active' size="sm">Active</button> : <button className='btn btn-Inactive' size="sm">Inactive</button>
        },
        {
            name: <span style={{ fontSize: "15px", fontWeight: "600" }}>Control</span>,
            cell: (row) => (
                <>
                    {
                        activeShow == 1 ? (
                            <>
                                <button className='btn btn-xxs btn-warnings me-2 mt-1' title="Delete" onClick={() => programsDataDelete(row._id, row.active)}><BiLogOut style={{ color: "white" }} size={20}></BiLogOut></button>
                                <button className='btn btn-xxs btn-dangers mt-1' style={{ color: "white" }} title="Delete" onClick={() => userDeletePermanent(row._id)}><MdDelete size={20} /></button>
                            </>
                        ) : (
                            <>
                                <Link to={`/sidebar/show_single_program_data/${row._id}`} style={{ textDecoration: "none" }}><button className='btn btn-xs btn-infoss me-2 mt-1' style={{ paddibg: "0" }} title="View"><i class="fa-solid fa-eye" style={{ color: "white" }}></i></button></Link>
                                <Link to={`/sidebar/update_single_program_data/${row._id}`} style={{ textDecoration: "none" }}><button className='btn btn-xs btn-warnings me-2 mt-1' style={{ paddibg: "0" }} title="Update"><i class="fa-solid fa-pencil" style={{ color: "white" }}></i></button></Link>
                                <button className='btn btn-xxs btn-dangers mt-1' title="Delete" onClick={() => programsDataDelete(row._id, row.active)}><i class="fa-solid fa-xmark" style={{ color: "white" }}></i></button>
                            </>
                        )
                    }

                </>
            )
        }

    ];

    const handleImage = (e)=>{
        let filess = e.target.files[0]
        // console.log(filess);
        setImageSource(filess)
    }
     
    createTheme('solarized', {
        background: {
          default: '#c0dfdf',
          
        },
        text: {
          primary: '#08272a',
          secondary: '#08272a',
        },
      });

    const changeAgenciews = () => {
        setStatus(!status)
    }
    const activeChange = (e) => {
        setActive(!active)
    }
    //  Programs data post
    const programsData = async () => {
        try {
            if (!title) {
                setError(true)
                return false
            }
            setloading(true)
            const formData = new FormData();
            formData.append('image', imageSource);
            await axios.post(`${BACKEND_URI}/Repeat_Logo`,formData ).then((res)=>{
                // console.log(res);
            })
            let currentTime = new Date().toLocaleString(); //Current Date
            await axios.post(`${BACKEND_URI}/programs`, {
                active,
                title,
                description,
                currentTime
            }).then((res) => {
                setTitle("")
                setDescription('')
                setStatus(false)
                setloading(false)
                toast.success("Program Add successfully")
                if (res.data.active == "true") {
                    setActive(false)
                }
                programsDataGet()
            }
            )
        } catch (e) {
            console.log("e", e);
            setloading(false)
            toast.error("May be Server Error! Please Refresh Page")
        }
    }

    const activeHandle = (e) => {
        setActiveShow(e.target.value)
    }
    // Programs data get 

    const programsDataGet = async () => {
        try {
            setTableLoading(true)
            setSckelton(true)
            let arry = []
            let arryfalse = []
            await axios.get(`${BACKEND_URI}/programs`).then((resp) => {
                for (var i = 0; i < resp.data.length; i++) {
                    let statusCheck = resp.data[i].active
                    if (activeShow == 1) {
                        if (statusCheck == "false") {
                            arryfalse.push(resp.data[i])
                        }
                    } else {
                        if (statusCheck == "true") {
                            arry.push(resp.data[i])
                        }
                    }
                }
                setGetAgencyData(arry)
                setFilterSearch(arry)
                setGetAgencyDataFalse(arryfalse)
                setFilterSearchInactive(arryfalse)
                setTotalAgenciesActive(arry?.length)
                setTotalAgenciesInactive(arryfalse?.length)
                setTableLoading(false)
                setSckelton(false)
            })
        } catch (e) {
            console.log("e", e);
            setSckelton(false)
        }
    }

    // Programs data delete 

    const programsDataDelete = async (id, ststus) => {
        let active = ""
        if (ststus == "true") {
            setLoadingActive(true)
            active = false
            await axios.put(`${BACKEND_URI}/programs_data_delete/${id}`, { active }).then((resps) => {
                if (resps) {
                    setLoadingActive(false)
                    toast.error("Program Inactive successfully")
                    programsDataGet()
                }
            })
        } else {
            setLoadingActive(true)
            active = true
            await axios.put(`${BACKEND_URI}/programs_data_delete/${id}`, { active }).then((resps) => {
                if (resps) {
                    setLoadingActive(false)
                    toast.success("Program Active successfully")
                    programsDataGet()
                }
            })
        }

    }



    //  parmanent delete program
    const userDeletePermanent = async (ids) => {
        try {
            setscheduleTableId(ids)
            setModalShow(true)
        } catch (e) {
            console.log("e", e);
        }
    }

    const handleDataDelete = async () => {
        try {
            setDeleteLoading(true)
            await axios.delete(`${BACKEND_URI}/parmanently_Delete_Program/${scheduleTableId}`).then((res) => {
                setModalShow(false);
                setDeleteLoading(false)
                programsDataGet()
                toast.success("Program Deleted Parmanently")
            })
        } catch (e) {
            console.log("e", e);
            setDeleteLoading(false)
            toast.error("May be Server Error! Please Refresh Page")
        }
    }

    //  Search by Input
    useEffect(() => {
        const result = getAgencyData.filter((country) => {
            return country.title.toLowerCase().match(search.toLowerCase());
        })
        setFilterSearch(result)
    }, [search])
    useEffect(() => {
        const result = getAgencyDataFalse.filter((country) => {
            return country.title.toLowerCase().match(searchInactive.toLowerCase());
        })
        setFilterSearchInactive(result)
    }, [searchInactive])

    useEffect(() => {
        programsDataGet()
    }, [activeShow])
    return (
        <div className='container'>
            {loadingActive == true ? <div className="d-flex justify-content-center align-items-center border" style={{ height: "100vh", width: "70%", position: "fixed", zIndex: "20000" }}><div className="loader-container">
                <div className="spinner"></div>
            </div></div> : <div>

            </div>}
            {
                status ? (
                    <div>
                        <div className='row user-box-1'>
                            <div className='col-lg-12 col-12  d-flex justify-content-center  justify-content-between align-items-center pt-3 pb-3'>
                                <h4 className='user-h4 mt-2'>NEW Programs</h4>

                            </div>
                        </div>
                        <div className='row d-flex flex-column justify-content-center justify-content-between pt-3 pb-3 align-items-center' style={{ background: "#c7d7df", borderBottomLeftRadius: "10px" , borderBottomRightRadius: "10px"}}>
                            <div className='col-lg-6 text-md-start mt-2'>
                                {error && !description && !title && <Alert key="danger" variant="danger">
                                    Please Fill Title and Description feild
                                </Alert>}
                                <div className="mb-3 d-flex align-items-center">
                                    <div className='col-md-2'>
                                        <label for="exam pleFormControlInput1" className="form-label mt-2">Title</label>
                                    </div>
                                    <input type="email" className="form-control ms-3" id="exampleFormControlInput1" placeholder="Program Name" value={title} onChange={(e) => setTitle(e.target.value)} required />
                                </div>
                            </div>
                            <div className='col-lg-6 text-md-start mt-2'>
                                <div className="mb-3 d-flex align-items-center">
                                    <div className='col-md-2'>

                                        <label for="exampleFormControlInput1" className="form-label mt-2">Description</label>
                                    </div>
                                    <input type="email" className="form-control ms-3" id="exampleFormControlInput1" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                                </div>
                            </div>
                            <div className='col-lg-6 text-md-start mt-2'>
                                <div className="mb-3 d-flex align-items-center">
                                    <div className='col-md-2'>
                                        <label for="exampleFormControlInput1" className="form-label mt-2">Report Logo</label>
                                    </div>
                                    <input type="file" className="form-control ms-3" id="exampleFormControlInput1"  onChange={handleImage} required />
                                </div>
                            </div>
                            <div className='col-lg-6 text-md-start mt-2 d-flex'>
                                <div className='col-md-2'>
                                    <label for="exampleFormControlInput1" className="form-label mt-2" value={active} onChange={activeChange}>Status</label>
                                </div>
                                <label class="switch">
                                    <input type="checkbox" id="togBtn" value={active} onChange={activeChange} />
                                    <div class="slider round">

                                        <span class="on">Active</span>
                                        <span class="off">Inactive</span>

                                    </div>
                                </label>

                            </div>

                            <div className='col-md-11 mt-4 pt-3 pb-3 mb-5' style={{ borderBottom: "1px solid #838383", borderTop: "1px solid #838383" }}>
                                <button className='btn btn-save me-2' onClick={programsData}>{lodaing == true ? <Spinner animation="border" /> : <span>Save</span>}</button>
                                <button className='btn btn-Cancel' onClick={changeAgenciews}>Cancel</button>
                            </div>

                        </div>
                    </div>
                ) :
                    (
                        <div>
                            <div className='row user-box-1'>
                                <div className='col-lg-12 col-12  d-flex justify-content-center  justify-content-between align-items-center pt-3 pb-3'>
                                    <h4 className='user-h4 mt-2'>PROGRAM</h4>
                                    {/* <div>
                                        <button className='btn btn-dangerpdf me-md-3 mt-2'>EXPORT TO PDF</button>
                                        <button className='btn btn-dangerexcel mt-2'>EXPORT TO EXCEL</button>
                                    </div> */}
                                </div>
                            </div>
                            <div className='row d-flex justify-content-center justify-content-between pt-3 pb-3 align-items-center ps-md-3 pe-md-3' style={{ background: "#c7d7df" }}>
                                <div className='col-lg-5 text-md-start d-flex align-items-center'>
                                    <button className='btn btn-primaryadd me-md-3 ' onClick={changeAgenciews}><i class="fa-solid fa-plus"></i> Add New Program</button>
                                </div>
                                <div className='col-lg-7  '>
                                    <div className='row  d-flex justify-content-lg-end mt-2'>
                                        <div className='col-lg-6 mt-2'>
                                            <select className="form-select" aria-label="Default select example" value={activeShow} onChange={activeHandle}>
                                                <option value={0}>Active</option>
                                                <option value={1}>Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='row d-flex justify-content-center' style={{ background: "#c7d7df", borderBottomLeftRadius: "10px" , borderBottomRightRadius: "10px" }}>
                            <span className='text-start  ms-md-4'>Total Programs: {sckelton == true ? <Placeholder as="s" animation="glow"><Placeholder xs={1} /></Placeholder>: <span>{activeShow == 1 ? <span>{totalAgenciesInactive}</span> : <span>{totalAgenciesActive}</span>}</span>} </span>

                                <div className='col-lg-12  pb-3'>

                                    {tableLoading == true ? <div className="d-flex justify-content-center align-items-center mt-4 " style={{ width: "75%", position: "fixed", zIndex: "20000" }}>
                                        <div className="spinner"></div>
                                    </div> : <>
                                        {
                                            
                                            activeShow == 1 ? (
                                                <div className="responsive-table">
                                                <DataTable
                                                    columns={columns}
                                                    data={filterSearchInactive}
                                                    pagination
                                                    fixedHeader
                                                    fixedHeaderScrollHeight='600px'
                                                    highlightOnHover
                                                    subHeader
                                                    theme="solarized"
                                                    striped
                                                    subHeaderComponent={
                                                        <input type="text" placeholder='Search Program' className='form-control' style={{ width: '28%' }} value={searchInactive} onChange={(e) => setSearchInactive(e.target.value)} />
                                                    }
                                                    responsive={true}
                                                />
                                                </div>
                                            ) : (
                                                <div className="responsive-table">

                                                
                                                <DataTable
                                                    columns={columns}
                                                    data={filterSearch}
                                                    pagination
                                                    fixedHeader
                                                    fixedHeaderScrollHeight='600px'
                                                    highlightOnHover
                                                    subHeader
                                                    theme="solarized"
                                                    striped
                                                    subHeaderComponent={
                                                        <input type="text" placeholder='Search Program' className=' form-control' style={{ width: '28%' }} value={search} onChange={(e) => setSearch(e.target.value)} />
                                                    }
                                                    
                                                    responsive={true}
                                                />
                                                </div>
                                            )
                                        }
                                    </>}
                                </div>
                            </div>
                        </div>
                    )
            }

            {
                modalShow ? (
                    <Modal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Delete Confirmation
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to delete Program. This will be remove Permanently !
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-danger" onClick={handleDataDelete}>
                                {deleteLoading == true ? <Spinner animation="border" /> : <span>Delete</span>}
                            </button>
                        </Modal.Footer>
                    </Modal>
                ) : (<>
                </>)
            }
            <Toaster
                position="top-right"
                reverseOrder={false}
            />

        </div>
    )
}

export default Programs