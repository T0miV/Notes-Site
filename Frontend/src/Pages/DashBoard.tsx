import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import { Container, Typography, Button } from "@mui/material";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import WelcomeBox from "../components/DashBoardComponents/WelcomeBox";

//Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

//Define the structure of a Note object
type Note = {
  id: number;
  title: string;
  text: string;
  timestamp: string;
  color: string;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isDeleted?: number; 
};

//Define the props for the MetricBox component
type MetricBoxProps = {
  title: string;
  data: string;
};

//MetricBox component to display a single metric
const MetricBox = ({ title, data }: MetricBoxProps) => (
  <div className="dashboard-metricBox">
    <Typography variant="h6" className="dashboard-metricTitle">{title}</Typography>
    <Typography variant="body1" className="dashboard-metricData">{data}</Typography>
  </div>
);

//Define the props for the Dashboard component
interface DashboardProps {
  currentUser: { username: string; role: number } | null;
  handleLogout: () => void;
}

const Dashboard = ({ currentUser, handleLogout }: DashboardProps) => {
  //State to store the latest notes (for the dashboard)
  const [notes, setNotes] = useState<Note[]>([]);
  //State to store all active notes (for statistics and calendar)
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  //State to store statistics (total notes and notes created this month)
  const [statistics, setStatistics] = useState({ totalNotes: 0, notesThisMonth: 0 });
  //State to store chart data for the bar chart
  const [chartData, setChartData] = useState<{ labels: string[]; datasets: any[] }>({ labels: [], datasets: [] });
 
  const navigate = useNavigate();

  //Function to fetch notes from the API
  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes`);
      //Filter out deleted notes
      const activeNotes = response.data.filter((note: Note) => !note.isDeleted);
      
      //Store all active notes
      setAllNotes(activeNotes);
      
      //Sort notes by timestamp (newest first) and keep only the first 3 for the dashboard
      const sortedNotes = activeNotes.sort((a: Note, b: Note) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setNotes(sortedNotes.slice(0, 3));

      //Calculate the number of notes created this month
      const currentMonth = new Date().getMonth();
      const notesThisMonth = activeNotes.filter(
        (note: Note) => new Date(note.timestamp).getMonth() === currentMonth
      ).length;
  
      //Update statistics
      setStatistics({ totalNotes: activeNotes.length, notesThisMonth });

      //Calculate notes created per day for the chart
      const notesByDay: Record<string, number> = {};
      activeNotes.forEach((note: Note) => {
        const date = new Date(note.timestamp).toLocaleDateString();
        notesByDay[date] = (notesByDay[date] || 0) + 1;
      });

      //Update chart data
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

  //Fetch notes when the component mounts
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Container maxWidth="lg" className="dashboard-container">
      {/* Dashboard title */}
      <Typography variant="h4" className="dashboard-title" gutterBottom>
        Notes Dashboard
      </Typography>
      {/* Display welcome message if a user is logged in */}
      {currentUser && <WelcomeBox username={currentUser.username} />}

      <div className="dashboard-sections">
        {/* Statistics Section */}
        <div className="dashboard-section dashboard-small-box">
          <Typography variant="h6" className="dashboard-heading">Statistics</Typography>
          <div className="dashboard-statsList">
            <div className="dashboard-statsRow">
              {/* Display total notes and notes created this month */}
              <MetricBox title="Total Notes" data={statistics.totalNotes.toString()} />
              <MetricBox title="This Month" data={statistics.notesThisMonth.toString()} />
            </div>
          </div>
          {/* Button to navigate to more statistics */}
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate("/information")}
            style={{ position: "absolute", top: 10, right: 10 }}
          >
            More statistics
          </Button>
        </div>

        {/* Chart Section */}
        <div className="dashboard-section dashboard-small-box">
          <Typography variant="h6" className="dashboard-chartTitle">Note Activity</Typography>
          {/* Display a bar chart of note creation activity */}
          <Bar 
            data={chartData} 
            options={{
              scales: {
                y: { ticks: { precision: 0 } } //Ensure y-axis ticks are whole numbers
              }
            }}
          />
        </div>

        {/* Calendar Section */}
        <div className="dashboard-section dashboard-small-box">
          <Typography variant="h6">Calendar</Typography>
          <div className="dashboard-calendar-container">
            {/* Display a calendar with notes highlighted */}
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
          {/* Button to navigate to the full calendar page */}
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
        <div className="dashboard-section dashboard-small-box">
          <Typography variant="h6">Recent Notes</Typography>
          <div className="dashboard-notes-grid">
            {/* Display the 3 most recent notes */}
            {notes.map((note: Note) => (
              <div key={note.id} className="dashboard-note-card" style={{ backgroundColor: note.color }}>
                <Typography 
                  variant="h6" 
                  style={{ 
                    fontWeight: note.isBold ? "bold" : "normal",
                    fontStyle: note.isItalic ? "italic" : "normal",
                    textDecoration: note.isUnderline ? "underline" : "none",
                  }}
                >
                  {note.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  style={{ 
                    fontWeight: note.isBold ? "bold" : "normal",
                    fontStyle: note.isItalic ? "italic" : "normal",
                    textDecoration: note.isUnderline ? "underline" : "none",
                  }}
                >
                  {note.text}
                </Typography>
                <Typography variant="caption">
                  {new Date(note.timestamp).toLocaleString()}
                </Typography>
              </div>
            ))}
          </div>
          {/* Button to navigate to the full notes page */}
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate("/all-notes")}
            style={{ position: "absolute", top: 10, right: 10 }}
          >
            View all notes
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;