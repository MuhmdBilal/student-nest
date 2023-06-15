import React from 'react';
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

function DataCell(props) {
  let time = props.timeZone
  const { startDate } = props.itemData;
  const isDinners = isDinner(startDate, time);
  // console.log("isDinner", props);
  let cssClasses = props.className
    ? props.className
    : '';

  if (isDisableDate(startDate)) {
    cssClasses += ' disable-date';
  } 
  else if (isDinners) {
    cssClasses += ' dinner';
  }
  return (
    <div className={cssClasses}>
      {props.children}
    </div>
  );
}

export default DataCell