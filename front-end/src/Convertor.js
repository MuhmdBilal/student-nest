export const  toSeconds = (timeStr) =>{
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 3600 + minutes * 60;
  }

  export const secondsToHms =(d) =>{
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var hDisplay = h > 0 ? h : "";
    var mDisplay = m > 0 ? m : "";
    return hDisplay + ":" + mDisplay; 
}

export const secondsToHmsssss =(d) =>{
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var hDisplay = h > 0 ? h : "";
  var mDisplay = m > 0 ? m : "";
  // console.log();
  var zeroHdispaly = hDisplay <= 9 ? "0" + hDisplay : hDisplay
  var dZeroMdispaly =mDisplay == 0  ?  "00" : mDisplay
  return zeroHdispaly + ":" + dZeroMdispaly;  
}



export const secondsToHmsssssasasa =(d) =>{
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var hDisplay = h > 0 ? h : "";
  var mDisplay = m > 0 ? m : "";
  return hDisplay ; 
}


export const convert24HoursTo12Hours = (data)=>{
  let monday_End_time = secondsToHmsssss(data);
  const [hourStrings, minutes] = monday_End_time.split(":");
                    const hours = +hourStrings % 24;
     return (hours % 12 || 12) + ":" + minutes + (hours < 12 ? " AM" : " PM");
}

export const convert24HoursTo12HoursWithOutAnyFunction = (data)=>{
  
  const [hourStrings, minutes] = data.split(":");
                    const hours = +hourStrings % 24;
     return (hours % 12 || 12) + ":" + minutes + (hours < 12 ? " AM" : " PM");
}