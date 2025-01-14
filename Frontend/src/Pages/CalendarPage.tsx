import React, { FC, useState } from "react";
import Calendar from 'react-calendar';
import '../styles/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarPage: FC = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="calendar-container">
      <div className="calendar-form">
        <h1 className="calendar-title">Calendar</h1>
        <div className="calendar-section">
          <Calendar
            onChange={onChange}
            value={value}
            className="react-calendar"
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
