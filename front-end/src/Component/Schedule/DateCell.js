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

export default function DateCell(props) {
  const { currentView, date, text } = props.itemData;
  const isDisabled = currentView === 'month'
    ? isWeekend(date)
    : isDisableDate(date);
  return (
    <div className={isDisabled ? 'disable-date' : null}>
      <div>{text}</div>
    </div>
  );
}