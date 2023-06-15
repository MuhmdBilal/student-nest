import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "./Component/SideBar/SideBar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./Component/Login/Login"
import PrivateComponent from './Component/PrivateComponent/PrivateComponent';
import Dashboard from './Component/Dashboard/Dashboard';
import User from './Component/User/User';
import Schedule from './Component/Schedule/Schedule';
import Agencies from './Component/Agencies/Agencies';
import Programs from './Component/Program/Programs';
import Schools from './Component/Schools/Schools';
import Grade from './Component/Grade/Grade';
import Subject from './Component/Subject/Subject';
import EmailNotification from './Component/EmailNotification/EmailNotification';
import ActivityLog from './Component/ActivityLog/ActivityLog';
import ShowSingleAgencyData from './Component/Agencies/ShowSingleAgencyData';
import UpdateSingleAgencyData from './Component/Agencies/UpdateSingleAgencyData';
import ShowSingleProgramData from './Component/Program/ShowSingleProgramData';
import UpdateSingleProgramData from './Component/Program/UpdateSingleProgramData';
import ShowSingleSchoolData from './Component/Schools/ShowSingleSchoolData';
import UpdateSingleSchoolData from './Component/Schools/UpdateSingleSchoolData';
import ShowSingleGradeData from './Component/Grade/ShowSingleGradeData';
import UpdateSingleGradeData from "./Component/Grade/UpdateSingleGradeData"
import ShowSingleSubjectData from './Component/Subject/ShowSingleSubjectData';
import UpdateSingleSubjectData from './Component/Subject/UpdateSingleSubjectData';
import ViewSingleUserData from './Component/User/ViewSingleUserData';
import UpdateSingleUserData from './Component/User/UpdateSingleUserData';
import NewSchedule from './Component/Schedule/NewSchedule';
import AdminShowData from './Component/Admin/AdminShowData';
import AdminUpdate from './Component/Admin/AdminUpdate';
import PasswordReset from './Component/Admin/PasswordReset';
import ProgressCustomPDF from './Component/User/ProgressCustomPDF';
import axios from 'axios';
function App() {
  const [state, setstate] = useState(false);
  
  return (
    <div className="App ">
      {/* <ProgressCustomPDF data={state}/> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login setstate={setstate} state={state} />} />
          <Route element={<PrivateComponent state={state} />}>
            <Route exact path="/sidebar/*" element={<Sidebar />} >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path='user' element={<User />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="agencies" element={<Agencies />} />
              <Route path="program" element={<Programs />} />
              <Route path="schools" element={<Schools />} />
              <Route path="grade" element={<Grade />} />
              <Route path="subject" element={<Subject />} />
              <Route path="notification" element={<EmailNotification />} />
              <Route path="activity" element={<ActivityLog />} />
              <Route path='show_single_agency_data/:id' element={<ShowSingleAgencyData />} />
              <Route path="update_single_agency_data/:id" element={<UpdateSingleAgencyData />} />
              <Route path='show_single_program_data/:id' element={<ShowSingleProgramData/>}/>
              <Route path='update_single_program_data/:id' element={<UpdateSingleProgramData/>}/>
              <Route path="show_single_school_data/:id" element={<ShowSingleSchoolData/>} />
              <Route path='update_single_school_data/:id' element={<UpdateSingleSchoolData/>}/>
              <Route path='show_single_Grade_data/:id' element={<ShowSingleGradeData/>}/>
              <Route path='update_single_Grade_data/:id' element={<UpdateSingleGradeData/>}/>
              <Route path='show_single_subject_data/:id' element={<ShowSingleSubjectData/>}/>
              <Route path="update_single_subject_data/:id" element={<UpdateSingleSubjectData/>}/>
              <Route path='view_single_User_Data/:id' element={<ViewSingleUserData/>}/>
              <Route path='update_single_user_data/:id' element={<UpdateSingleUserData/>}/>
              <Route path='newschedule' element={<NewSchedule/>}/>
              <Route path='newscheduless/:id' element={<NewSchedule/>}/>
              <Route path="admin_show_data/:id" element={<AdminShowData/>} />
              <Route path="admin_Update_Data/:id" element={<AdminUpdate/>} />
              <Route path="reset_password/:id"  element={<PasswordReset/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
