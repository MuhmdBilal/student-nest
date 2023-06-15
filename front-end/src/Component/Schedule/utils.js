import { dinnerTime, holidays } from "./data.js";
import {secondsToHmsssss, secondsToHms, secondsToHmsssssasasa} from "../../Convertor"



function isHoliday(date) {
  // implementation
}

function isWeekend(date) {
  // implementation
}

function isDisableDate(date) {
  let datesss = date.toLocaleString('en-US', {
    timeZone: 'US/Pacific',
  })
  return isHoliday(datesss) || isWeekend(datesss);
}

function isDinner(date, timeZone) {
  var datesss ; 
  // if(timeZone === "US/Hawaii") {
  //   datesss = date.toLocaleString('en-US', {
  //     timeZone: "US/Hawaii",
  //   })
    
  // } 
  // else if(timeZone === "US/Pacific"){
  //   datesss = date.toLocaleString('en-US', {
  //     timeZone: "US/Pacific",
  //   })
  // } 
  // else if(timeZone === "US/Mountain"){
  //   datesss = date.toLocaleString('en-US', {
  //     timeZone: "US/Mountain",
  //   })
  // }
  // else if(timeZone === "US/Central"){
  //   datesss = date.toLocaleString('en-US', {
  //     timeZone: "US/Central",
  //   })
  // }
  // else if(timeZone === "US/Eastern"){
  //   datesss = date.toLocaleString('en-US', {
  //     timeZone: "US/Eastern",
  //   })
  // }

  datesss = date.toLocaleString('en-US', {
        timeZone: timeZone,
      })
  const dateObj = new Date(datesss);
    const hours = dateObj.getHours();
    const minute = dateObj.getMinutes();
    const day = dateObj.getDay();
    return dinnerTime.filter((lol)=> {
      let fromTime = secondsToHmsssss(lol.from);
      let toTime = secondsToHmsssss(lol.to)
      if(fromTime!==''){
        var fhrs = parseInt(fromTime.split(':')[0]);
        var fmins = parseInt(fromTime.split(':')[1]);
      }
      if(toTime!==''){
        var thrs = parseInt(toTime.split(':')[0]);
        var tmins = parseInt(toTime.split(':')[1]);
      }
      return  !(hours > fhrs && hours < thrs) && !(hours >=  fhrs && hours < thrs  && minute >= fmins ) && !( hours == thrs  && minute < tmins) && (lol.date === day)
    }
    ).length > 0
  // const hours = dateObj.getHours();
  // const day = dateObj.getDay();

  // return dinnerTime.filter((lol) => !(hours >= lol.from && hours < lol.to) && (lol.date === day)).length > 0;
}

function hasCoffeeCupIcon(date) {
  let datesss = date.toLocaleString('en-US', {
    timeZone: 'US/Pacific',
  })
  const dateObj = new Date(datesss);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  return hours === dinnerTime.from && minutes === 0;
}

function isValidAppointment(component, appointmentData, timeZone) {
  const startDate = new Date(appointmentData.startDate, timeZone);
  let Startdatesss = startDate.toLocaleString('en-US', {
    timeZone: timeZone,
  })
  const endDate = new Date(appointmentData.endDate);
  let enddatesss = startDate.toLocaleString('en-US', {
    timeZone: timeZone,
  })
  const cellDuration = component.option("cellDuration");
  return isValidAppointmentInterval(Startdatesss, enddatesss, cellDuration);
}

function isValidAppointmentInterval(startDate, endDate, cellDuration) {
  const dateObj = new Date(endDate);
  const edgeEndDate = new Date(dateObj.getTime() - 1);

  if (!isValidAppointmentDate(edgeEndDate)) {
    return false;
  }

  const durationInMs = cellDuration * 60 * 1000;
  const dateObjs = new Date(startDate);
  const date = dateObjs;
  while (date <= endDate) {
    if (!isValidAppointmentDate(date)) {
      return false;
    }
    const newDateTime = date.getTime() + durationInMs - 1;
    date.setTime(newDateTime);
  }

  return true;
}

function isValidAppointmentDate(date, timeZone) {
  // console.log("ffff", timeZone);
  let datesss = date.toLocaleString('en-US', {
    timeZone: timeZone,
  })
  const dateObj = new Date(datesss)
  return (
    !isHoliday(datesss) && !isDinner(datesss) && !isWeekend(datesss)
  );
}

export {
  isHoliday,
  isWeekend,
  isDisableDate,
  isDinner,
  hasCoffeeCupIcon,
  isValidAppointment,
  isValidAppointmentInterval,
  isValidAppointmentDate,
}






// export default class Utils {
// static isHoliday(date) {
//   const localeDate = date.toLocaleDateString();
//   return (
//     holidays.filter((holiday) => holiday.toLocaleDateString() === localeDate)
//       .length > 0
//   );
//   }

//   static isWeekend(date) {
//     const day = date.getDay();
//     return ;
//   }

//   static isDisableDate(date) {
//     return Utils.isHoliday(date) || Utils.isWeekend(date);
//   }



//   static isDinner(date) {
//     const hours = date.getHours();
//     const minute = date.getMinutes();
//     const day = date.getDay();
//     return dinnerTime.filter((lol)=> {
//       let fromTime = secondsToHmsssss(lol.from);
//       let toTime = secondsToHmsssss(lol.to)
//       if(fromTime!==''){
//         var fhrs = parseInt(fromTime.split(':')[0]);
//         var fmins = parseInt(fromTime.split(':')[1]);
//       }
//       if(toTime!==''){
//         var thrs = parseInt(toTime.split(':')[0]);
//         var tmins = parseInt(toTime.split(':')[1]);
//       }
//       return  !(hours > fhrs && hours < thrs) && !(hours >=  fhrs && hours < thrs  && minute >= fmins ) && !( hours == thrs  && minute < tmins) && (lol.date === day)
//     }
//     ).length > 0
//   }


// static hasCoffeeCupIcon(date) {
//   const hours = date.getHours();
//   const minutes = date.getMinutes();

//   return hours === dinnerTime.from && minutes === 0;
// }

// static isValidAppointment(component, appointmentData) {
//   const startDate = new Date(appointmentData.startDate);
//   const endDate = new Date(appointmentData.endDate);
//   const cellDuration = component.option("cellDuration");
//   return Utils.isValidAppointmentInterval(startDate, endDate, cellDuration);
// }

// static isValidAppointmentInterval(startDate, endDate, cellDuration) {
//   const edgeEndDate = new Date(endDate.getTime() - 1);

//   if (!Utils.isValidAppointmentDate(edgeEndDate)) {
//     return false;
//   }

//   const durationInMs = cellDuration * 60 * 1000;
//   const date = startDate;
//   while (date <= endDate) {
//     if (!Utils.isValidAppointmentDate(date)) {
//       return false;
//     }
//     const newDateTime = date.getTime() + durationInMs - 1;
//     date.setTime(newDateTime);
//   }

//   return true;
// }

// static isValidAppointmentDate(date) {
//   return (
//     !Utils.isHoliday(date) && !Utils.isDinner(date) && !Utils.isWeekend(date)
//   );
// }
// }







// !(hours >= fhrs && hours < thrs) && !(hours <= fhrs  && minute >= fmins ) && !( hours == thrs  && minute < tmins) && (lol.date === day)
    // && !( hours == thrs  && minute < tmins)
//..........today ..................//

// !(hours == fhrs && hours == thrs && minute >= fmins && minute < tmins)





















//   static hasCoffeeCupIcon(date) {
//     const hours = date.getHours();
//     const minutes = date.getMinutes();
//     return hours === dinnerTime.from && minutes === 0;
//   }

//   static isValidAppointment(component, appointmentData) {
//     const startDate = new Date(appointmentData.startDate);
//     const endDate = new Date(appointmentData.endDate);
//     const cellDuration = component.option("cellDuration");
//     return Utils.isValidAppointmentInterval(startDate, endDate, cellDuration);
//   }

//   static isValidAppointmentInterval(startDate, endDate, cellDuration) {
//     const edgeEndDate = new Date(endDate.getTime() - 1);

//     if (!Utils.isValidAppointmentDate(edgeEndDate)) {
//       return false;
//     }

//     const durationInMs = cellDuration * 60 * 1000;
//     const date = startDate;
//     while (date <= endDate) {
//       if (!Utils.isValidAppointmentDate(date)) {
//         return false;
//       }
//       const newDateTime = date.getTime() + durationInMs - 1;
//       date.setTime(newDateTime);
//     }

//     return true;
//   }

//   static isValidAppointmentDate(date) {
//     return (
//       !Utils.isHoliday(date) && !Utils.isDinner(date) && !Utils.isWeekend(date)
//     );
//   }
// }
