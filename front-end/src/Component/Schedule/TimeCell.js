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

export default function TimeCell(props) {
 
  let time = props.timeZone
  const { date, text } = props.itemData;
  const isDinners = isDinner(date, time);

  const hasCoffeeCupIcons = hasCoffeeCupIcon(date);

  return (
    <div className={isDinners ? 'dinner' : null}>
      {text}
      {hasCoffeeCupIcons ? <div className='cafe' /> : null}
    </div>
  );
}
