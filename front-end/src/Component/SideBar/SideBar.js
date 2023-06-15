import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import "./SideBar.css"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AiOutlineHome } from "react-icons/ai"
import { HiMenuAlt4 } from "react-icons/hi"
import { RiAccountCircleFill } from "react-icons/ri"
import logo1 from "../../Assets/std-logo.png"
import NotificationsIcon from '@mui/icons-material/Notifications';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { GiGears, GiTruce } from "react-icons/gi"
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { FaClipboard } from "react-icons/fa"
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FiEdit } from "react-icons/fi"
import { MdSwitchAccount } from "react-icons/md"
import axios from 'axios';
import { AiFillDashboard } from "react-icons/ai"
import { HiUserGroup } from "react-icons/hi"
import Dashboard from '../Dashboard/Dashboard';
import User from '../User/User';
import Schedule from '../Schedule/Schedule';
import Collapse from '@material-ui/core/Collapse'
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import Agencies from '../Agencies/Agencies';
import Programs from '../Program/Programs';
import Schools from '../Schools/Schools';
import Grade from '../Grade/Grade';
import Subject from '../Subject/Subject';
import EmailNotification from '../EmailNotification/EmailNotification';
import ActivityLog from '../ActivityLog/ActivityLog';
import ShowSingleAgencyData from '../Agencies/ShowSingleAgencyData';
import UpdateSingleAgencyData from '../Agencies/UpdateSingleAgencyData';
import ShowSingleProgramData from '../Program/ShowSingleProgramData';
import UpdateSingleProgramData from '../Program/UpdateSingleProgramData';
import ShowSingleSchoolData from '../Schools/ShowSingleSchoolData';
import UpdateSingleSchoolData from '../Schools/UpdateSingleSchoolData';
import ShowSingleGradeData from '../Grade/ShowSingleGradeData';
import UpdateSingleGradeData from '../Grade/UpdateSingleGradeData';
import ShowSingleSubjectData from '../Subject/ShowSingleSubjectData';
import UpdateSingleSubjectData from '../Subject/UpdateSingleSubjectData';
import ViewSingleUserData from '../User/ViewSingleUserData';
import UpdateSingleUserData from '../User/UpdateSingleUserData';
import NewSchedule from '../Schedule/NewSchedule';
import Dropdown from 'react-bootstrap/Dropdown';
import { BACKEND_URI } from "../../config/config";
import admin_pic from "../../Assets/94592.png";
import { FaSuitcase } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io"
import { FiKey } from "react-icons/fi"
import AdminShowData from '../Admin/AdminShowData';
import AdminUpdate from '../Admin/AdminUpdate';
import PasswordReset from '../Admin/PasswordReset';
const drawerWidth = 240;

interface Props {

  window?: () => Window;
}
const useStyles = makeStyles(theme =>
  createStyles({
    appMenu: {
      width: '100%',
    },
    navList: {
      width: drawerWidth,
    },
    menuItem: {
      width: drawerWidth,
    },
    menuItemIcon: {
      color: 'red',
    },
  }),
)
export default function ResponsiveDrawer(props: Props, { setData }) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isColor, setIsColor] = useState("Dashboard")
  const [teacherSelect, setTeacherSelect] = useState("")
  const { pathname } = useLocation();
  let [sessionData, setSessionData] = useState(0)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [openOne, setOpenOne] = React.useState(false)
  function handleClick() {
    setOpen(!open)
    // setMobileOpen(!mobileOpen);
  }
  function handleClicks() {
    setOpen(!open)
  }
  function handleClickOne() {
    setOpenOne(!openOne)
    // setMobileOpen(!mobileOpen);
  }
  function handleClickOnes() {
    setOpenOne(!openOne)

  }
  const [fName, setFName] = useState("");
  const [lname, setLName] = useState("")
  const [objectId, setObjectId] = useState("")
  const admin_Data = async () => {
    try {
      await axios.get(`${BACKEND_URI}/admin_data`).then((res) => {
        setFName(res?.data[0]?.firstName);
        setLName(res?.data[0]?.lastName)
        setObjectId(res?.data[0]?._id)
      })
    } catch (e) {
      console.log("e", e);
    }
  }

  const changeRoute = () => {
    try {
      // console.log("pathname", pathname);
      if (pathname) {
        if (pathname == "/sidebar/dashboard") {
          setIsColor("Dashboard")
        } else if (pathname == "/sidebar/user") {
          setIsColor("Users")
        } else if (pathname == "/sidebar/schedule") {
          setIsColor("Schedule")
        } else if (pathname == "/sidebar/newschedule") {
          setIsColor("Schedule")
        } else if (pathname == "/sidebar/agencies") {
          setIsColor("Agencies")
        } else if (pathname == "/sidebar/program") {
          setIsColor("Programs")
        } else if (pathname == "/sidebar/schools") {
          setIsColor("Schools")
        } else if (pathname == "/sidebar/grade") {
          setIsColor("Grades")
        } else if (pathname == "/sidebar/subject") {
          setIsColor("Subjects")
        } else if (pathname == "/sidebar/notification") {
          setIsColor("Email Notifications")
        } else if (pathname == "/sidebar/activity") {
          setIsColor("Activity Log")
        }
      }
    } catch (e) {
      console.log("e", e);
    }
  }
  useEffect(() => {
    changeRoute()
  })
  useEffect(() => {
    admin_Data()
  }, [])
  let stuent_data = JSON.parse(localStorage.getItem("studentNest"));
  const drawer = (
    <div className="stakenmsColor1" style={{ color: "white", zIndex: "11" }}>
      <Toolbar className="text-start d-flex align-items-center justify-content-start pb-3 pt-1" style={{ backgroundColor: "#08272a", color: "black" }}>
        <img src={logo1} width="170px" />
      </Toolbar>
      <div className=' d-flex align-items-center justify-content-center mt-4 flex-column'>
        <img src="https://media.istockphoto.com/id/1399565382/photo/young-happy-mixed-race-businessman-standing-with-his-arms-crossed-working-alone-in-an-office.jpg?b=1&s=170667a&w=0&k=20&c=ZAXJYLesh6gSd9huAgpy6rjpR4z-IFVH9MpxrKIXCrs=" alt='user' className='domi_pic' />
        <span className='pt-2'>Sunny Hassan</span>
      </div>
      <br />
      <List>

        <Link to="/sidebar/dashboard" style={{ textDecoration: "none" }} >
          <ListItem button href="#deshborad" key="Dashboard"
            onClick={() => {
              setIsColor("Dashboard");
              setMobileOpen(!mobileOpen);
            }}
            className={isColor == "Dashboard" ? "staking-btn_active pt-3 pb-3" : "staking-btn pt-3 pb-3"}
          >
            <ListItemIcon >
              <AiFillDashboard color={isColor == "Dashboard" ? "#000" : "#0f999b"}
                className='ms-3' size={25} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <Link to="/sidebar/user" style={{ textDecoration: "none" }}
        onClick={()=>window.location.reload(true)}
        >
          <ListItem button key="Users"
            className={isColor == "Users" ? "staking-btn_active pt-3 pb-3" : "staking-btn pt-3 pb-3"}
          >

            <ListItemIcon>
              <HiUserGroup color={isColor == "Users" ? "#000" : "#0f999b"}
                className='ms-3' size={25} />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        </Link>
        <Link to="/sidebar/schedule" style={{ textDecoration: "none" }}
        onClick={()=>window.location.reload()}
        >
          <ListItem button key="Schedule"
            className={isColor == "Schedule" ? "staking-btn_active pt-3 pb-3" : "staking-btn pt-3 pb-3"}>
            <ListItemIcon>
              <HiUserGroup color={isColor == "Schedule" ? "#000" : "#0f999b"}
                className='ms-3' size={25} />
            </ListItemIcon>
            <ListItemText primary="Schedule" />
          </ListItem>
        </Link>

        {stuent_data?.role === "Admin" ? (
          <>
            <ListItem button onClick={handleClicks} className="staking-btn pt-3 pb-3">
              <ListItemIcon className={classes.menuItemIcon}>
                <GiGears color='#0f999b' className='ms-3' size={25} />
              </ListItemIcon>
              <ListItemText primary="Configuration" />
              {open ? <IconExpandLess /> : <IconExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Divider />
              <List component="div" disablePadding>
                <Link to="/sidebar/agencies" style={{ textDecoration: "none" }} >
                  <ListItem button
                    className={isColor == "Agencies" ? "staking-btn-down-active pt-2 pb-2" : "staking-btn-down pt-2 pb-2"}
                  >
                    <ListItemText inset primary="Agencies" />
                  </ListItem>
                </Link>
                <Link to="/sidebar/program" style={{ textDecoration: "none" }}>
                  <ListItem button
                    className={isColor == "Programs" ? "staking-btn-down-active pt-2 pb-2" : "staking-btn-down pt-2 pb-2"}
                  >
                    <ListItemText inset primary="Programs" />
                  </ListItem>
                </Link>
                <Link to="/sidebar/schools" style={{ textDecoration: "none" }} >
                  <ListItem button
                    className={isColor == "Schools" ? "staking-btn-down-active pt-2 pb-2" : "staking-btn-down pt-2 pb-2"}
                  >
                    <ListItemText inset primary="Schools" />
                  </ListItem>
                </Link>
                <Link to="/sidebar/grade" style={{ textDecoration: "none" }}>
                  <ListItem button
                    className={isColor == "Grades" ? "staking-btn-down-active pt-2 pb-2" : "staking-btn-down pt-2 pb-2"}
                  >
                    <ListItemText inset primary="Grades" />
                  </ListItem>
                </Link>
                <Link to="/sidebar/subject" style={{ textDecoration: "none" }}>
                  <ListItem button
                    className={isColor == "Subjects" ? "staking-btn-down-active pt-2 pb-2" : "staking-btn-down pt-2 pb-2"}

                  >
                    <ListItemText inset primary="Subjects" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>

            <ListItem button onClick={handleClickOnes} className="staking-btn pt-3 pb-3">
              <ListItemIcon className={classes.menuItemIcon}>
                <FaClipboard color='#0f999b' className='ms-3' size={25} />
              </ListItemIcon>
              <ListItemText primary="Reports" />
              {openOne ? <IconExpandLess /> : <IconExpandMore />}
            </ListItem>
            <Collapse in={openOne} timeout="auto" unmountOnExit>
              <Divider />
              <Link to="/sidebar/notification" style={{ textDecoration: "none" }}>
                <ListItem button
                  className={isColor == "Email Notifications" ? "staking-btn-down-active pt-2 pb-2" : "staking-btn-down pt-2 pb-2"}

                >
                  <ListItemText inset primary="Email Notifications" />
                </ListItem>
              </Link>
              <Link to="/sidebar/activity" style={{ textDecoration: "none" }}>
                <ListItem button
                  className={isColor == "Activity Log" ? "staking-btn-down-active pt-2 pb-2" : "staking-btn-down pt-2 pb-2"}

                >
                  <ListItemText inset primary="Activity Log" />
                </ListItem>
              </Link>
            </Collapse>
          </>
        ) : (<></>)
        }
      </List>
      <div className='mt-3 mb-4 d-flex align-items-center justify-content-center'>
        <Link to="/" style={{ textDecoration: "none" }} onClick={() => localStorage.clear()}><button className='btn btn-logout mb-4'>
          Log out
        </button></Link>
      </div>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar style={{
          backgroundColor: "#08272a", width: '100%', paddingTop: "10px", paddingBottom: "10px"
        }}>

          <Typography style={{ color: "white", display: "flex", width: '100%',  zIndex: "11"  }} >
            <div style={{ width: '100%' }} >
              <Navbar collapseOnSelect sticky="top" variant="light" style={{ width: "100%", backgroundColor: '#08272a' }} >
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: 'none' } }}
                >
                  <MenuIcon style={{ color: "white" }} />
                </IconButton>
                <Navbar.Brand href="#home" className="newProject-span d-flex" >
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" >
                  <Nav className=" nav  d-flex justify-content-evenly nav-one-width" >
                  </Nav>
                  <Nav className=' d-flex align-items-center justify-content-start'>
                    <Nav.Link href="">
                      <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" className='drop-test'>
                          <img src={admin_pic} width="30px" style={{ borderRadius: "50%" }} /> <span style={{ fontSize: "13px" }}>{stuent_data.firstName} {stuent_data.lastName}</span> {
                           stuent_data?.role === "Admin" ? <span style={{ fontSize: "13px", fontWeight: "500" }}>(Admin)</span> : 
                           stuent_data?.role === "Manager" ? <span style={{ fontSize: "13px", fontWeight: "500" }}>(Manager)</span> : 
                           stuent_data?.role === "Teacher" ? <span style={{ fontSize: "13px", fontWeight: "500" }}>(Teacher)</span>: 
                           stuent_data?.role === "Employee" ? <span style={{ fontSize: "13px", fontWeight: "500" }}>(Admin Staff)</span> : 
                           stuent_data?.role === "Student" ? <span style={{ fontSize: "13px", fontWeight: "500" }}>(Student)</span> : 
                           <></>
                          } 
                          
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Link to={`/sidebar/admin_show_data/${stuent_data._id}`} style={{ textDecoration: "none" }}><Dropdown.Item href="#/action-1" className='mt-2'><FaSuitcase size={16} /> &nbsp;Profile</Dropdown.Item></Link>
                          {stuent_data?.role === "Admin" ? <Link to={`/sidebar/reset_password/${stuent_data._id}`} style={{ textDecoration: "none" }}><Dropdown.Item href="#/action-2" className='mt-2'><IoMdSettings size={17} />  &nbsp;Setting</Dropdown.Item></Link> : <></>}
                          <Link to="/" style={{ textDecoration: "none" }} onClick={() => localStorage.clear()}><Dropdown.Item href="#/action-3" className='mt-2'><FiKey size={17} /> &nbsp;Log Out</Dropdown.Item></Link>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >

        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Routes>
          <Route exact path='/dashboard' element={<Dashboard sessionData={sessionData} />} />
          <Route exact path='/user' element={<User />} />
          <Route exact path="/schedule" element={<Schedule setTeacherSelect={setTeacherSelect} teacherSelect={teacherSelect} setSessionData={setSessionData} sessionData={sessionData} />} />
          <Route exact path='/agencies' element={<Agencies />} />
          <Route exact path="/program" element={<Programs />} />
          <Route exact path='/schools' element={<Schools />} />
          <Route exact path='/grade' element={<Grade />} />
          <Route exact path='/subject' element={<Subject />} />
          <Route exact path='/notification' element={<EmailNotification />} />
          <Route exact path='/activity' element={<ActivityLog />} />
          <Route exact path="/show_single_agency_data/:id" element={<ShowSingleAgencyData />} />
          <Route exact path="/update_single_agency_data/:id" element={<UpdateSingleAgencyData />} />
          <Route exact path="/show_single_program_data/:id" element={<ShowSingleProgramData />} />
          <Route exact path="/update_single_program_data/:id" element={<UpdateSingleProgramData />} />
          <Route exact path="/show_single_school_data/:id" element={<ShowSingleSchoolData />} />
          <Route exact path="/update_single_school_data/:id" element={<UpdateSingleSchoolData />} />
          <Route exact path="/show_single_Grade_data/:id" element={<ShowSingleGradeData />} />
          <Route exact path="/update_single_Grade_data/:id" element={<UpdateSingleGradeData />} />
          <Route exact path='/show_single_subject_data/:id' element={<ShowSingleSubjectData />} />
          <Route exact path='/update_single_subject_data/:id' element={<UpdateSingleSubjectData />} />
          <Route exact path="/view_single_User_Data/:id" element={<ViewSingleUserData />} />
          <Route exact path="/update_single_user_data/:id" element={<UpdateSingleUserData />} />
          <Route exact path="/newschedule" element={<NewSchedule teacherSelect={teacherSelect} />} />
          <Route exact path="/admin_show_data/:id" element={<AdminShowData />} />
          <Route exact path="/admin_Update_Data/:id" element={<AdminUpdate />} />
          <Route exact path="/reset_password/:id" element={<PasswordReset />} />
        </Routes>
      </Box>
    </Box>
  );
}

