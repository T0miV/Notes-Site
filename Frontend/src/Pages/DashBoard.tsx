import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import { Container, Typography } from "@mui/material";
import "../styles/Dashboard.css";

type Note = {
  id: number;
  title: string;
  text: string;
  timestamp: string;
  color: string;
  isDeleted?: number;
};

type MetricBoxProps = {
  title: string;
  data: string;
};

const MetricBox = ({ title, data }: MetricBoxProps) => (
  <div className="dashboard-metricBox">
    <Typography variant="h6" className="dashboard-metricTitle">{title}</Typography>
    <Typography variant="body1" className="dashboard-metricData">{data}</Typography>
  </div>
);

const Dashboard = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [statistics, setStatistics] = useState({
    totalNotes: 0,
    notesThisMonth: 0,
  });

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes`);
      const activeNotes = response.data.filter((note: Note) => !note.isDeleted);
      setNotes(activeNotes.reverse().slice(0, 3)); // Get the 3 most recent notes

      // Calculate statistics
      const currentMonth = new Date().getMonth();
      const notesThisMonth = activeNotes.filter(
        (note: Note) => new Date(note.timestamp).getMonth() === currentMonth
      ).length;

      setStatistics({
        totalNotes: response.data.length,
        notesThisMonth,
      });
    } catch (error) {
      console.error("Error fetching notes", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Container maxWidth="lg" className="dashboard-container">
      <Typography variant="h4" className="dashboard-title" gutterBottom>
        Notes Dashboard
      </Typography>

      <div className="dashboard-sections">
        {/* Statistics Section */}
        <div className="dashboard-section dashboard-small-box">
          <Typography variant="h6" className="dashboard-heading">Statistics</Typography>
          <Typography variant="body2" className="dashboard-description">
            Quick insights into your notes activity
          </Typography>
          <div className="dashboard-statsList">
            <div className="dashboard-statsRow">
              <MetricBox title="Total Notes" data={statistics.totalNotes.toString()} />
              <MetricBox title="This Month" data={statistics.notesThisMonth.toString()} />
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="dashboard-section dashboard-small-box">
          <Typography variant="h6" className="dashboard-chartTitle">Note Activity</Typography>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/016d696dcf2ad9f0d1db59e1c66efbb776c5b18075a2d07ed58fb537fcd72dce"
            className="dashboard-chartImage"
            alt="Notes activity chart"
          />
        </div>

        {/* Calendar Section */}
        <div className="dashboard-section dashboard-small-box">
          <Typography variant="h6">Calendar</Typography>
          <div className="dashboard-calendar-container">
            <Calendar onChange={() => {}} value={new Date()} tileClassName={({ date }) => ""} />
          </div>
        </div>

        {/* Recent Notes Section */}
        <div className="dashboard-section dashboard-small-box">
          <Typography variant="h6">Recent Notes</Typography>
          <div className="dashboard-notes-grid">
            {notes.map((note: Note) => (
              <div
                key={note.id}
                className="dashboard-note-card"
                style={{ backgroundColor: note.color }}
              >
                <Typography variant="h6">{note.title}</Typography>
                <Typography variant="body2">{note.text}</Typography>
                <Typography variant="caption">
                  {new Date(note.timestamp).toLocaleString()}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
