import React, { FC, useState } from "react";
import Calendar from "react-calendar"; // Install with: npm install react-calendar
import 'react-calendar/dist/Calendar.css';
import '../styles/Dashboard.css';

const CalendarPage: FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    // Optionally handle actions for the selected date
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-form">
        <h1 className="dashboard-title">Calendar</h1>
        <div className="calendar-section">
          
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;