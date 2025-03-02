import React from "react";
import Calendar from "react-calendar";
import { Typography, Button } from "@mui/material";
import { Note } from "../../types/types";
import { useNavigate } from "react-router-dom";

type CalendarSectionProps = {
  allNotes: Note[];
  navigate: ReturnType<typeof useNavigate>;
};

const CalendarSection = ({ allNotes, navigate }: CalendarSectionProps) => (
  <div className="dashboard-section dashboard-small-box">
    <Typography variant="h6">Calendar</Typography>
    <div className="dashboard-calendar-container">
      <Calendar 
        onChange={() => {}} 
        value={new Date()} 
        tileClassName={({ date }: { date: Date }) =>
          allNotes.some((note) => new Date(note.timestamp).toDateString() === date.toDateString()) 
            ? "tile-with-note" 
            : ""
        }
      />
    </div>
    <Button 
      variant="contained" 
      color="primary" 
      onClick={() => navigate("/calendar")}
      style={{ position: "absolute", top: 10, right: 10 }}
    >
      Go to Calendar
    </Button>
  </div>
);

export default CalendarSection;