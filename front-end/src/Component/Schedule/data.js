
import axios from "axios"
import {BACKEND_URI} from "../../config/config"

let teacherSelect = JSON.parse(localStorage.getItem("teacherSelect"))
let myarray = [];

 function getTime (){ 
    try{
     axios.get(`${BACKEND_URI}/User_Data`).then((res)=>{
        res.data.forEach((element) => {
            if(element._id===teacherSelect){
                let start_time0 = element.sundayStartTime;
                let end_time0 =  element.sundayEndTime;
                let start_time1 = element.mondayStartTime;
                let end_time1 = element.mondayEndTime;
                let start_time2 = element.tuesdayStartTime;
                let end_time2 = element.tuesdayEndTime;
                let start_time3 = element.wednesdayStartTime;
                let end_time3 = element.wednesdayEndTime;
                let start_time4 = element.thursdayStartTime;
                let end_time4 = element.thursdayEndTime;
                let start_time5 = element.fridayStartTime;
                let end_time5 = element.fridayEndTime;
                let start_time6 = element.saturdayStartTime;
                let end_time6 = element.saturdayEndTime;
                for (let i = 0; i < 7; i++) {
                    myarray.push({
                         date: i,
                         from : eval(`start_time${i}`),
                         to:eval(`end_time${i}`) 
                    }) 
                 }
            } 
        });
    })
    return myarray;
    
    }catch(e){
        console.log("e", e);
    }
}
export const dinnerTime =  getTime();
// export const holidays =  getTime();
export const holidays = [

];

export const data = [

];

export const locations = ['US/Eastern', 'US/Central', 'US/Mountain', 'US/Pacific'];