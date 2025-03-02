import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Button } from "@mui/material";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import WelcomeBox from "../components/DashBoardComponents/WelcomeBox";
import MetricBox from "../components/DashBoardComponents/MetricBox";
import RecentNotes from "../components/DashBoardComponents/RecentNotes";
import CalendarSection from "../components/DashBoardComponents/CalendarSection";
import ChartSection from "../components/DashBoardComponents/ChartSection";
import { Note } from "../types/types";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define the props for the Dashboard component
interface DashboardProps {
  currentUser: { username: string; role: number } | null;
  handleLogout: () => void;
}

const Dashboard = ({ currentUser, handleLogout }: DashboardProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [statistics, setStatistics] = useState({ totalNotes: 0, notesThisMonth: 0 });
  const [chartData, setChartData] = useState<{ labels: string[]; datasets: any[] }>({ labels: [], datasets: [] });

  const navigate = useNavigate();

  // Function to fetch notes from the API
  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes`);
      const activeNotes = response.data.filter((note: Note) => !note.isDeleted);
      setAllNotes(activeNotes);

      const sortedNotes = activeNotes.sort((a: Note, b: Note) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setNotes(sortedNotes.slice(0, 3));

      const currentMonth = new Date().getMonth();
      const notesThisMonth = activeNotes.filter(
        (note: Note) => new Date(note.timestamp).getMonth() === currentMonth
      ).length;

      setStatistics({ totalNotes: activeNotes.length, notesThisMonth });

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
        <div className="dashboard-section dashboard-small-box">
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
            More statistics
          </Button>
        </div>

        {/* Chart Section */}
        <ChartSection chartData={chartData} />

        {/* Calendar Section */}
        <CalendarSection allNotes={allNotes} navigate={navigate} />

        {/* Recent Notes Section */}
        <RecentNotes notes={notes} navigate={navigate} />
      </div>
    </Container>
  );
};

export default Dashboard;