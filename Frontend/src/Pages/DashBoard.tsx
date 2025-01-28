import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
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
    <div className="dashboard-metricTitle">{title}</div>
    <div className="dashboard-metricData">{data}</div>
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
      const activeNotes = response.data.filter((note: Note) => note.isDeleted === 0);
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
    <div className="dashboard-container">
      <div className="dashboard-form">
        <h1 className="dashboard-title">Notes Dashboard</h1>

        {/* 2x2 Grid Layout */}
        <div className="dashboard-sections">
          {/* Statistics Section */}
          <div className="dashboard-section dashboard-small-box">
            <div className="dashboard-metricDetails">
              <div className="dashboard-heading">Statistics</div>
              <div className="dashboard-description">
                Quick insights into your notes activity
              </div>
            </div>
            <div className="dashboard-statsList">
              <div className="dashboard-statsRow">
                <MetricBox
                  title="Total Notes"
                  data={statistics.totalNotes.toString()}
                />
                <MetricBox
                  title="This Month"
                  data={statistics.notesThisMonth.toString()}
                />
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="dashboard-section dashboard-small-box">
            <div className="dashboard-chartBox">
              <div className="dashboard-chartTitle">Note Activity</div>
              <div className="dashboard-yAxisLabel">Notes Created</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/016d696dcf2ad9f0d1db59e1c66efbb776c5b18075a2d07ed58fb537fcd72dce"
                className="dashboard-chartImage"
                alt="Notes activity chart"
              />
              <div className="dashboard-xAxisLabel">Week</div>
            </div>
          </div>

          {/* Calendar Section */}
          <div className="dashboard-section dashboard-small-box">
            <h2>Calendar</h2>
            <div className="dashboard-calendar-container">
              <Calendar
                onChange={() => {}}
                value={new Date()}
                tileClassName={({ date }) => ""}
              />
            </div>
          </div>

          {/* Recent Notes Section */}
          <div className="dashboard-section dashboard-small-box">
            <h2>Recent Notes</h2>
            <div className="dashboard-notes-grid">
              {notes.map((note: Note) => (
                <div
                  key={note.id}
                  className="dashboard-note-card"
                  style={{ backgroundColor: note.color }}
                >
                  <h3>{note.title}</h3>
                  <p>{note.text}</p>
                  <small>{new Date(note.timestamp).toLocaleString()}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
