import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import { Container, Typography, Button } from "@mui/material";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/Dashboard.css";
import WelcomeBox from "../components/DashBoardComponents/WelcomeBox";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

interface DashboardProps {
  currentUser: { username: string; role: number } | null;
  handleLogout: () => void;
}

const Dashboard = ({ currentUser, handleLogout }: DashboardProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [statistics, setStatistics] = useState({ totalNotes: 0, notesThisMonth: 0 });
  const [chartData, setChartData] = useState<{ labels: string[]; datasets: any[] }>({ labels: [], datasets: [] });
  const navigate = useNavigate(); // Initialize useNavigate

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes`);
      const activeNotes = response.data.filter((note: Note) => !note.isDeleted);
      setNotes(activeNotes.reverse().slice(0, 3));

      // Calculate statistics
      const currentMonth = new Date().getMonth();
      const notesThisMonth = activeNotes.filter(
        (note: Note) => new Date(note.timestamp).getMonth() === currentMonth
      ).length;

      setStatistics({ totalNotes: response.data.length, notesThisMonth });

      // Process data for the chart
      const notesByDay: Record<string, number> = {};
      activeNotes.forEach((note: Note) => {
        const date = new Date(note.timestamp).toLocaleDateString();
        notesByDay[date] = (notesByDay[date] || 0) + 1;
      });

      setChartData({
        labels: Object.keys(notesByDay),
        datasets: [
          {
            label: "Notes Created",
            data: Object.values(notesByDay),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
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

      {currentUser && <WelcomeBox username={currentUser.username} />}

      <div className="dashboard-sections">
        {/* Statistics Section */}
        <div className="dashboard-section dashboard-small-box" style={{ position: "relative" }}>
          <Typography variant="h6" className="dashboard-heading">Statistics</Typography>
          <div className="dashboard-statsList">
            <div className="dashboard-statsRow">
              <MetricBox title="Total Notes" data={statistics.totalNotes.toString()} />
              <MetricBox title="This Month" data={statistics.notesThisMonth.toString()} />
            </div>
          </div>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate("/information")}
            style={{ position: "absolute", top: 10, right: 10 }}
          >
            Go to Information
          </Button>
        </div>

        {/* Chart Section */}
        <div className="dashboard-section dashboard-small-box" style={{ position: "relative" }}>
          <Typography variant="h6" className="dashboard-chartTitle">Note Activity</Typography>
          <Bar 
            data={chartData} 
            options={{
              scales: {
                y: {
                  ticks: {
                    precision: 0 // Poistaa desimaalit pystyakselilta
                  }
                }
              }
            }}
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate("/information")}
            style={{ position: "absolute", top: 10, right: 10 }}
          >
            Go to Information
          </Button>
        </div>

        {/* Calendar Section */}
        <div className="dashboard-section dashboard-small-box" style={{ position: "relative" }}>
          <Typography variant="h6">Calendar</Typography>
          <div className="dashboard-calendar-container">
            <Calendar onChange={() => {}} value={new Date()} tileClassName={({ date }: { date: Date }) => ""} />
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

        {/* Recent Notes Section */}
        <div className="dashboard-section dashboard-small-box" style={{ position: "relative" }}>
          <Typography variant="h6">Recent Notes</Typography>
          <div className="dashboard-notes-grid">
            {notes.map((note: Note) => (
              <div key={note.id} className="dashboard-note-card" style={{ backgroundColor: note.color }}>
                <Typography variant="h6">{note.title}</Typography>
                <Typography variant="body2">{note.text}</Typography>
                <Typography variant="caption">{new Date(note.timestamp).toLocaleString()}</Typography>
              </div>
            ))}
          </div>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate("/all-notes")}
            style={{ position: "absolute", top: 10, right: 10 }}
          >
            Go to All Notes
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;