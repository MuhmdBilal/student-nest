import React from 'react';
import DataCell from './DataCell.js';
export default function DataCellMonth({ itemData }) {
  const day = itemData.startDate.getDate();
  console.log("day", day);
  return (
    <DataCell
      itemData={itemData}
      className='dx-scheduler-date-table-cell-text'
    >
      {day}
    </DataCell>
  );
}