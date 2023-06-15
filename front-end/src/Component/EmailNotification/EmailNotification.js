import React, { useState, useEffect, useMemo } from 'react'
import { BACKEND_URI } from "../../config/config";
import axios from "axios";
import "../User/User.css"
import DataTable,{createTheme} from 'react-data-table-component';
import Placeholder from 'react-bootstrap/Placeholder';
const myNewTheme= {
    rows: {
      fontSize: '25px'
    }
  }
function EmailNotification() {
    const [getEmailRecord, setGetEmailRecord] = useState([])
    const [emailLength, setEmailLength] = useState(0)
    const [search, setSearch] = useState("")
    const [filterSearch, setFilterSearch] = useState([])
    const [tableLoading, setTableLoading] = useState(false)
    const [sckelton,setSckelton] = useState(false);
    const get_Email_Data = async () => {
        try {
            setTableLoading(true)
            setSckelton(true)
            await axios.get(`${BACKEND_URI}/get_Email_Data`).then((res) => {
                setGetEmailRecord(res.data)
                setFilterSearch(res.data)
                setEmailLength(res.data.length)
                setTableLoading(false)
                setSckelton(false)
            })
        } catch (e) {
            console.log("e", e);
            setTableLoading(false)
            setSckelton(false)
        }
    }
    const columns = [
        {
            name: <span style={{fontSize: "15px", fontWeight: "600"}}>Full Name</span>,
            selector: row => `${row.fName} ${row.lName}`,
            sortable: true
        },
        {
            name: <span style={{fontSize: "15px", fontWeight: "600"}}>Email</span>,
            selector: row => row.email,
            sortable: true
        },

        {
            name: <span style={{fontSize: "15px", fontWeight: "600"}}>Send Time</span>,
            selector: row => row.dateTime,
            sortable: true
        }
       
    ];
    createTheme('solarized', {
        background: {
          default: '#c0dfdf',
          
        },
        text: {
          primary: '#08272a',
          secondary: '#08272a',
        },
      });
    useEffect(()=>{
        const result = getEmailRecord.filter((country)=>{
            // console.log("country", country);
          return country.fName.toLowerCase().match(search.toLowerCase());
        })
        setFilterSearch(result)
     },[search])
    //  const actionsMemo = useMemo(() => <Export onExport={() => downloadCSV(filterSearch)} />, []);
    useEffect(() => {
        get_Email_Data()
    }, [])
    return (
        <div className='container'>
            <div className='row user-box-1'>
                <div className='col-lg-12 col-12  d-flex justify-content-center  justify-content-between align-items-center pt-3 pb-3'>
                    <h4 className='user-h4 mt-2'>EMAIL NOTIFICATIONS</h4>
                    
                </div>
            </div>
            <div className='row d-flex justify-content-center' style={{ background: "#c7d7df", borderBottomLeftRadius: "10px" , borderBottomRightRadius: "10px" }}>
                <p className='text-start mt-3 '>Total Email: {sckelton == true ? <Placeholder as="s" animation="glow"><Placeholder xs={1} /></Placeholder>: <span> {emailLength}</span>}</p>

                <div className='col-lg-12  pb-3'>
                    {tableLoading == true ? <div className="d-flex justify-content-center align-items-center mt-4 " style={{ width: "75%", position: "fixed", zIndex: "20000" }}>
                        <div className="spinner"></div>
                    </div> : 
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
                                <input type="text" placeholder='Search here' className='w-25 form-control' value={search} onChange={(e) => setSearch(e.target.value)} />
                            }
                            customTheme={myNewTheme}
                        />
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default EmailNotification