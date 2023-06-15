import React,{useRef, useState} from 'react';
import Scheduler, { Resource } from 'devextreme-react/scheduler';
import notify from 'devextreme/ui/notify';
import "./schedule.css"
import {
  isHoliday,
  isWeekend,
  isDisableDate,
  isDinner,
  hasCoffeeCupIcon,
  isValidAppointment,
  isValidAppointmentInterval,
  isValidAppointmentDate,
} from './utils.js';
import DataCell from './DataCell.js';
import DataCellMonth from './DataCellMonth.js';
import DateCell from './DateCell.js';
import TimeCell from './TimeCell.js';
import CustomStore from 'devextreme/data/custom_store';
import { BACKEND_URI } from "../../config/config";
import { format } from 'date-fns'
import SelectBox from 'devextreme-react/select-box';
import {getTimeZones} from 'devextreme/time_zone_utils';
import { toSeconds, secondsToHmsssss } from "../../Convertor"
import {locations} from "./data"
// import moment from "moment"
import 'moment-timezone';
const currentDate = new Date();
const views = ['day','week', 'month', "agenda"];
const notifyDisableDate = () => {
  notify('User is not available this Time', 'warning', 2000);
};
function getLocations(date) {
  const timeZones = getTimeZones(date);
  return timeZones.filter((timeZone) => locations.indexOf(timeZone.id) !== -1);
}



const demoLocations = getLocations(currentDate);
function NewSchedule() {
const [currentView, setCurrentView] = useState(views[1]);
const [timeZone,setTimeZone] = useState(demoLocations[0].id)
const [demoLocationsState, setDemoLocations] = useState(demoLocations);


function onValueChanged(e) {
  setTimeZone(e.value);
}
function onOptionChanged(e) {
  // console.log("itemData", e);
  if (e.name === 'currentDate') {
    setDemoLocations(getLocations(e.value));
  }
}

  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }
  let teacherSelect = JSON.parse(localStorage.getItem("teacherSelect"))
  let teacherName = JSON.parse(localStorage.getItem("teacherName"))
  let stuent_data = JSON.parse(localStorage.getItem("studentNest"));
  let email = teacherName.email
  let fName = teacherName.firstName;
  let lName = teacherName.lastName;
  let First_Name = stuent_data.firstName
  let Last_Name = stuent_data.lastName
  const customDataSource = new CustomStore({
    load: () => {
      return fetch(`${BACKEND_URI}/schedule_googles/${teacherSelect}`).then(response => response.json()).catch(() => { throw 'Network error' })
    },
    insert: (values) => {
      let data = new Date(values.startDate)
      const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let startTime = format(new Date(values.startDate), 'kk:mm');
      let endTIme = format(new Date(values.EndDate), 'kk:mm')
      // console.log("startTime", startTime);
      // console.log("endTIme", endTIme);
      startTime = toSeconds(startTime)
      endTIme = toSeconds(endTIme)
      let mailSTartTime = secondsToHmsssss(startTime)
      let mailEndTime = secondsToHmsssss(endTIme)
      let day = weekday[data.getDay()]
      let text = values.text;
      let startDate = values.startDate;
      let EndDate = values.EndDate;
      let allDay = values.AllDay;
      let description = values.description;
      let recurrenceRule = values.recurrenceRule;
      let dateTime = data.toDateString();
      let value = { startDate, EndDate, allDay, description, recurrenceRule, teacherSelect, text, day, startTime, endTIme }
      let valueaaaa = { mailSTartTime, mailEndTime, email, description, text, day, recurrenceRule, fName, lName, dateTime }
      let status = `Student Schedule has been Created by ${First_Name} ${Last_Name}`
      let submitvalue = {First_Name,Last_Name,status,dateTime}
      fetch(`${BACKEND_URI}/send_Reservation_Data`, {
        method: 'POST',
        body: JSON.stringify(valueaaaa),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      fetch(`${BACKEND_URI}/activity_Log`, {
        method: 'POST',
        body: JSON.stringify(submitvalue),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return fetch(`${BACKEND_URI}/schedule_google`, {
        method: 'POST',
        body: JSON.stringify(value),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(handleErrors)
        .then(response => {
          response.json()
        })
        .catch(() => { throw 'Network error' });
    },
    remove: (key) => {
      let ids = key._id
      return fetch(`${BACKEND_URI}/schedule_google/${ids}`, {
        method: 'DELETE',

      })
        .then(handleErrors)
        .catch(() => { throw 'Network error' });
    },
    update: (key, values) => {
      // let ids = values._id
      console.log("key", key.recurrenceException);
      console.log("values", values);
      let dataUpdate = new Date(values.startDate);
      let dateTime = dataUpdate.toDateString();
      const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let startTime = format(new Date(values.startDate), 'kk:mm');
      let endTIme = format(new Date(values.EndDate), 'kk:mm')
      let data = new Date(values.startDate);
      let recurrenceRule = values.recurrenceRule;
      let text = values.text;
      let description = values.description;
      let day = weekday[data.getDay()]
      // let startDate = values.startDate;
      // let EndDate = values.EndDate;
      // let allDay = values.AllDay;
      let valueaaa = { startTime, endTIme, email, description, text, day, recurrenceRule }
      let status = `Student Schedule has been Updated by ${First_Name} ${Last_Name}`
      let submitvalue = {First_Name,Last_Name,status,dateTime}
      fetch(`${BACKEND_URI}/send_Reservation_Update_Data`, {
        method: 'POST',
        body: JSON.stringify(valueaaa),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      fetch(`${BACKEND_URI}/activity_Log`, {
        method: 'POST',
        body: JSON.stringify(submitvalue),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      fetch(`${BACKEND_URI}/schedule_google/${encodeURIComponent(key)}`, {
        method: 'PUT',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(handleErrors)
      window.location.reload();
    },

  })

  const onAppointmentFormOpening = (e) => {
    const startDate = new Date(e.appointmentData.startDate);
    let datesss = startDate.toLocaleString('en-US', {
      timeZone: timeZone,
    })
    const dateObj = new Date(datesss);
    if (!isValidAppointmentDate(dateObj)) {
      e.cancel = true;
      notifyDisableDate();
    }
    applyDisableDatesToDateEditors(e.form);
  };

  const onAppointmentAdding = (e) => {
    const isValidAppointments = isValidAppointment(e.component, e.appointmentData, timeZone);
    if (!isValidAppointments) {
      e.cancel = true;
      notifyDisableDate();
      
    }
  };

  const onAppointmentUpdating = (e) => {
    const isValidAppointments = isValidAppointment(e.component, e.newData);
    if (!isValidAppointments) {
      e.cancel = true;
      notifyDisableDate();
      
    }
  };

  const onCurrentViewChange = (value) => (setCurrentView(value));
  const applyDisableDatesToDateEditors = (form) => {
   
    // const startDateEditor = form.getEditor('startDate');
    // startDateEditor.option('disabledDates', holidays);

    // const endDateEditor = form.getEditor('endDate');
    // endDateEditor.option('disabledDates', holidays);
  };

  const renderDataCell = (itemData) => {
   
    const CellTemplate = currentView === 'month'
      ? DataCellMonth
      : DataCell;
    return <CellTemplate itemData={itemData} timeZone={timeZone}/>;
  };

  const renderDateCell = (itemData) => <DateCell itemData={itemData} currentView={currentView} timeZone={timeZone}/>;
  const renderTimeCell = (itemData) => <TimeCell itemData={itemData} timeZone={timeZone}/>;
 
// console.log("customDataSource", timeZone);
  return (
    <>
      <br />
      <div className='row mt-4 mb-3 d-flex  justify-content-between'>
        <div className='col-lg-4 d-flex align-items-center'>
          <h5>Tutor Name:</h5> &nbsp;&nbsp;
          <h6>{`${teacherName.firstName} ${teacherName.lastName}`}</h6>
        </div>
        <div className='col-lg-5 d-flex  justify-content-center' style={{ backgroundColor: "#d8e3ff", padding: "18px 0px" }}>
          <div className=' ms-md-3 d-flex align-items-center'>
            <div className='box-blue'></div>
            &nbsp;Engaged
          </div>
          <div className=' ms-md-3  d-flex align-items-center'>
            <div className='box-white'></div>
            &nbsp;Available
          </div>
          <div className='ms-md-3  d-flex align-items-center'>
            <div className='box-gray'></div>
            &nbsp;Not Available
          </div>
        </div>
        
      </div>
      <div className="option mb-3">
        <span>Time Zone</span>
        <SelectBox
          items={demoLocationsState}
          displayExpr="title"
          valueExpr="id"
          width={240}
          value={timeZone}
          onValueChanged={onValueChanged}
        />
      </div>
      <Scheduler
      // timeZone='America/Argentina/Ushuaia'
        // timeZone="America/Los_Angeles"
        dataSource={customDataSource}
        views={views}
        defaultCurrentDate={currentDate}
        currentView={currentView}
        onCurrentViewChange={onCurrentViewChange}
        height={800}
        showAllDayPanel={false}
        startDayHour={0}
        endDayHour={24}
        endDateExpr="EndDate"
        allDayExpr="AllDay"
        dataCellRender={renderDataCell}
        dateCellRender={renderDateCell}
        timeCellRender={renderTimeCell}
        filterByResources={(appointment) => appointment.resourceId === 1}
        onAppointmentFormOpening={onAppointmentFormOpening}
        onAppointmentAdding={onAppointmentAdding}
        onAppointmentUpdating={onAppointmentUpdating}
        // timeZone={timeZone}
        onOptionChanged={onOptionChanged}
        firstDayOfWeek={1}
        // recurrenceRuleExpr="recurrenceRule"
      >
      </Scheduler>
    </>
  );
}

export default NewSchedule;



// import React from 'react';
// import Scheduler from 'devextreme-react/scheduler';
// import notify from 'devextreme/ui/notify';
// import "./schedule.css"
// import Utils from './utils.js';
// import DataCell from './DataCell.js';
// import DataCellMonth from './DataCellMonth.js';
// import DateCell from './DateCell.js';
// import TimeCell from './TimeCell.js';
// import CustomStore from 'devextreme/data/custom_store';
// import { BACKEND_URI } from "../../config/config";
// import { format } from 'date-fns'
// import { toSeconds, secondsToHmsssss } from "../../Convertor"
// // import moment from "moment"
// import 'moment-timezone';
// const currentDate = new Date();
// const views = ['week', 'month'];
// const notifyDisableDate = () => {
//   notify('User is not available this Time', 'warning', 2000);
// };

// function NewSchedule() {
// const [currentView, setCurrentView] = React.useState(views[0]);
//   function handleErrors(response) {
//     if (!response.ok) {
//       throw Error(response.statusText);
//     }
//     return response;
//   }


//   let teacherSelect = JSON.parse(localStorage.getItem("teacherSelect"))
//   let teacherName = JSON.parse(localStorage.getItem("teacherName"))
//   let stuent_data = JSON.parse(localStorage.getItem("studentNest"));
//   let email = teacherName.email
//   let fName = teacherName.firstName;
//   let lName = teacherName.lastName;
//   let First_Name = stuent_data.firstName
//       let Last_Name = stuent_data.lastName
//   const customDataSource = new CustomStore({
//     load: () => {
//       return fetch(`${BACKEND_URI}/schedule_googles/${teacherSelect}`).then(response => response.json()).catch(() => { throw 'Network error' })
//     },
//     insert: (values) => {
//       let data = new Date(values.startDate)
//       const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//       let startTime = format(new Date(values.startDate), 'kk:mm');
//       let endTIme = format(new Date(values.EndDate), 'kk:mm')
//       // console.log("startTime", startTime);
//       // console.log("endTIme", endTIme);
//       startTime = toSeconds(startTime)
//       endTIme = toSeconds(endTIme)
//       let mailSTartTime = secondsToHmsssss(startTime)
//       let mailEndTime = secondsToHmsssss(endTIme)
//       let day = weekday[data.getDay()]
//       let text = values.text;
//       let startDate = values.startDate;
//       let EndDate = values.EndDate;
//       let allDay = values.AllDay;
//       let description = values.description;
//       let recurrenceRule = values.recurrenceRule;
//       let dateTime = data.toDateString();
//       let value = { startDate, EndDate, allDay, description, recurrenceRule, teacherSelect, text, day, startTime, endTIme }
//       let valueaaaa = { mailSTartTime, mailEndTime, email, description, text, day, recurrenceRule, fName, lName, dateTime }
//       let status = `Student Schedule has been Created by ${First_Name} ${Last_Name}`
//       let submitvalue = {First_Name,Last_Name,status,dateTime}
//       fetch(`${BACKEND_URI}/send_Reservation_Data`, {
//         method: 'POST',
//         body: JSON.stringify(valueaaaa),
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       })
//       fetch(`${BACKEND_URI}/activity_Log`, {
//         method: 'POST',
//         body: JSON.stringify(submitvalue),
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       })
//       return fetch(`${BACKEND_URI}/schedule_google`, {
//         method: 'POST',
//         body: JSON.stringify(value),
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       })
//         .then(handleErrors)
//         .then(response => {
//           response.json()
//         })
//         .catch(() => { throw 'Network error' });
//     },
//     remove: (key) => {
//       let ids = key._id
//       return fetch(`${BACKEND_URI}/schedule_google/${ids}`, {
//         method: 'DELETE',

//       })
//         .then(handleErrors)
//         .catch(() => { throw 'Network error' });
//     },
//     update: (key, values) => {
//       // let ids = values._id
//       let dataUpdate = new Date(values.startDate);
//       let dateTime = dataUpdate.toDateString();
//       const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//       let startTime = format(new Date(values.startDate), 'kk:mm');
//       let endTIme = format(new Date(values.EndDate), 'kk:mm')
//       let data = new Date(values.startDate);
//       let recurrenceRule = values.recurrenceRule;
//       let text = values.text;
//       let description = values.description;
//       let day = weekday[data.getDay()]
//       // let startDate = values.startDate;
//       // let EndDate = values.EndDate;
//       // let allDay = values.AllDay;
//       let valueaaa = { startTime, endTIme, email, description, text, day, recurrenceRule }
//       let status = `Student Schedule has been Updated by ${First_Name} ${Last_Name}`
//       let submitvalue = {First_Name,Last_Name,status,dateTime}
//       fetch(`${BACKEND_URI}/send_Reservation_Update_Data`, {
//         method: 'POST',
//         body: JSON.stringify(valueaaa),
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       })
//       fetch(`${BACKEND_URI}/activity_Log`, {
//         method: 'POST',
//         body: JSON.stringify(submitvalue),
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       })
//       fetch(`${BACKEND_URI}/schedule_google/${encodeURIComponent(key)}`, {
//         method: 'PUT',
//         body: JSON.stringify(values),
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       })
//         .then(handleErrors)
//         .catch(() => { throw 'Network error' });
//       window.location.reload();
//     },


//   })

//   const onAppointmentFormOpening = (e) => {
//     const startDate = new Date(e.appointmentData.startDate);
//     if (!Utils.isValidAppointmentDate(startDate)) {
//       e.cancel = true;
//       notifyDisableDate();
//     }
//     applyDisableDatesToDateEditors(e.form);
//   };

//   const onAppointmentAdding = (e) => {
//     const isValidAppointment = Utils.isValidAppointment(e.component, e.appointmentData);
//     if (!isValidAppointment) {
//       e.cancel = true;
//       notifyDisableDate();
//     }
//   };

//   const onAppointmentUpdating = (e) => {
//     const isValidAppointment = Utils.isValidAppointment(e.component, e.newData);
//     if (!isValidAppointment) {
//       e.cancel = true;
//       notifyDisableDate();
//     }
//   };

//   const onCurrentViewChange = (value) => (setCurrentView(value));


//   const applyDisableDatesToDateEditors = (form) => {
//     // const startDateEditor = form.getEditor('startDate');
//     // startDateEditor.option('disabledDates', holidays);

//     // const endDateEditor = form.getEditor('endDate');
//     // endDateEditor.option('disabledDates', holidays);
//   };

//   const renderDataCell = (itemData) => {
//     const CellTemplate = currentView === 'month'
//       ? DataCellMonth
//       : DataCell;

//     return <CellTemplate itemData={itemData} />;
//   };

//   const renderDateCell = (itemData) => <DateCell itemData={itemData} currentView={currentView} />;

//   const renderTimeCell = (itemData) => <TimeCell itemData={itemData} />;


//   return (
//     <>
//       <br />
//       <div className='row mt-4 mb-3 d-flex  justify-content-between'>
//         <div className='col-lg-4 d-flex align-items-center'>
//           <h5>Tutor Name:</h5> &nbsp;&nbsp;
//           <h6>{`${teacherName.firstName} ${teacherName.lastName}`}</h6>
//         </div>
//         <div className='col-lg-5 d-flex  justify-content-center' style={{ backgroundColor: "#d8e3ff", padding: "18px 0px" }}>
//           <div className=' ms-md-3 d-flex align-items-center'>
//             <div className='box-blue'></div>
//             &nbsp;Engaged
//           </div>
//           <div className=' ms-md-3  d-flex align-items-center'>
//             <div className='box-white'></div>
//             &nbsp;Available
//           </div>
//           <div className='ms-md-3  d-flex align-items-center'>
//             <div className='box-gray'></div>
//             &nbsp;Not Available
//           </div>
//         </div>
//       </div>
//       <Scheduler
//       // timeZone='America/Argentina/Ushuaia'
//         // timeZone="America/Los_Angeles"
//         dataSource={customDataSource}
//         views={views}
//         defaultCurrentDate={currentDate}
//         currentView={currentView}
//         onCurrentViewChange={onCurrentViewChange}
//         height={600}
//         showAllDayPanel={false}
//         startDayHour={0}
//         endDayHour={24}
//         endDateExpr="EndDate"
//         allDayExpr="AllDay"
//         dataCellRender={renderDataCell}
//         dateCellRender={renderDateCell}
//         timeCellRender={renderTimeCell}
//         filterByResources={(appointment) => appointment.resourceId === 1}
//         onAppointmentFormOpening={onAppointmentFormOpening}
//         onAppointmentAdding={onAppointmentAdding}
//         onAppointmentUpdating={onAppointmentUpdating}
//       />

//     </>
//   );
// }

// export default NewSchedule;



