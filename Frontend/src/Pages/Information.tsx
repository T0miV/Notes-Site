import React, { useEffect, useState } from "react";
import { AppBar, Box, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import "../styles/Information.css";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// Define types for the stats state
interface ColorStat {
  color: string;
  colorCount: number;
}

interface NoteStat {
  date: string;
  count: number;
}

interface LatestNote {
  title: string;
  timestamp: string;
}

interface TopColor {
  color: string;
  count: number;
}

interface NotesPerUser {
  username: string;
  count: number;
}

interface Stats {
  totalNotes: number;
  colorStats: ColorStat[];
  notesLast7Days: NoteStat[];
  latestNotes: LatestNote[];
  boldNotesCount: number;
  italicNotesCount: number;
  underlinedNotesCount: number;
  topColors: TopColor[];
  notesPerUser: NotesPerUser[];
}

const Information = () => {
  const [stats, setStats] = useState<Stats>({
    totalNotes: 0,
    colorStats: [],
    notesLast7Days: [],
    latestNotes: [],
    boldNotesCount: 0,
    italicNotesCount: 0,
    underlinedNotesCount: 0,
    topColors: [],
    notesPerUser: [],
  });

  // Fetch stats from the API
  const fetchStats = async () => {
    try {
      const response = await axios.get<Stats>(`${process.env.REACT_APP_API_URL}/stats`);
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Chart data for color distribution
  const colorData = {
    labels: stats.colorStats.map((stat) => stat.color),
    datasets: [
      {
        label: 'Color Distribution',
        data: stats.colorStats.map((stat) => stat.colorCount),
        backgroundColor: stats.colorStats.map((stat) => stat.color),
        borderWidth: 1,
      },
    ],
  };

  // Chart data for notes in the last 7 days
  const notesLast7DaysData = {
    labels: stats.notesLast7Days.map((stat) => stat.date),
    datasets: [
      {
        label: 'Notes Last 7 Days',
        data: stats.notesLast7Days.map((stat) => stat.count),
        backgroundColor: '#4caf50',
        borderWidth: 1,
      },
    ],
  };

  // Chart data for notes per user
  const notesPerUserData = {
    labels: stats.notesPerUser.map((stat) => stat.username),
    datasets: [
      {
        label: 'Notes Per User',
        data: stats.notesPerUser.map((stat) => stat.count),
        backgroundColor: '#A28BE3',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box className="dashboard-container">
      <AppBar position="static" className="app-bar">
        <Typography variant="h4" align="center" className="app-bar-title">
          Statistics
        </Typography>
      </AppBar>

      <Grid container spacing={3} className="grid-container">
        {/* Card 1: Total Notes */}
        <Grid item xs={12} md={4}>
          <Card className="card">
            <CardContent>
              <Typography variant="h6" className="card-title">
                Total Notes
              </Typography>
              <Typography variant="h4" className="card-value">
                {stats.totalNotes}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 2: Color Distribution */}
        <Grid item xs={12} md={4}>
          <Card className="card">
            <CardContent>
              <Typography variant="h6" className="card-title">
                Color Distribution
              </Typography>
              <Box className="chart-container">
                <Pie data={colorData} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 3: Notes Last 7 Days */}
        <Grid item xs={12} md={4}>
          <Card className="card">
            <CardContent>
              <Typography variant="h6" className="card-title">
                Notes Last 7 Days
              </Typography>
              <Box className="chart-container">
                <Bar data={notesLast7DaysData} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 4: Underlined Notes */}
        <Grid item xs={12} md={4}>
          <Card className="card">
            <CardContent>
              <Typography variant="h6" className="card-title">
                Underlined Notes
              </Typography>
              <Typography variant="h4" className="card-value underlined">
                {stats.underlinedNotesCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        

        {/* Card 5: Bold Notes */}
        <Grid item xs={12} md={4}>
          <Card className="card">
            <CardContent>
              <Typography variant="h6" className="card-title">
                Bold Notes
              </Typography>
              <Typography variant="h4" className="card-value bold">
                {stats.boldNotesCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 6: Italic Notes */}
        <Grid item xs={12} md={4}>
          <Card className="card">
            <CardContent>
              <Typography variant="h6" className="card-title">
                Italic Notes
              </Typography>
              <Typography variant="h4" className="card-value italic">
                {stats.italicNotesCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        

        {/* Card 7: Top Colors */}
        <Grid item xs={12} md={4}>
          <Card className="card">
            <CardContent>
              <Typography variant="h6" className="card-title">
                Top Colors
              </Typography>
              {stats.topColors.length > 0 ? (
                <Box className="top-colors-container">
                  {stats.topColors.map((color, index) => (
                    <Box key={index} className="color-item">
                      <Box className="color-circle" style={{ backgroundColor: color.color }} />
                      <Typography variant="body1">
                        {color.color}: {color.count}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body1" className="no-data-text">
                  No color data available.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Card 8: Latest Notes */}
        <Grid item xs={12} md={4}>
          <Card className="card">
            <CardContent>
              <Typography variant="h6" className="card-title">
                Latest Notes
              </Typography>
              {stats.latestNotes.length > 0 ? (
                <Box className="latest-notes-container">
                  {stats.latestNotes.map((note, index) => (
                    <Box key={index} className="latest-note-item">
                      <Typography variant="body1" className="note-title">
                        {note.title}
                      </Typography>
                      <Typography variant="body2" className="note-timestamp">
                        {new Date(note.timestamp).toLocaleString()}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body1" className="no-data-text">
                  No latest notes available.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        {/* Card 9: Notes Per User */}
        <Grid item xs={12} md={4}>
          <Card className="card">
            <CardContent>
              <Typography variant="h6" className="card-title">
                Notes Per User
              </Typography>
              <Box className="chart-container">
                {stats.notesPerUser.length > 0 ? (
                  <Bar data={notesPerUserData} />
                ) : (
                  <Typography variant="body1" className="no-data-text">
                    No user data available.
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      

      {/* Refresh Button */}
      <Box className="refresh-button-container">
        <Button variant="contained" className="refresh-button" onClick={fetchStats}>
          Refresh Stats
        </Button>
      </Box>
    </Box>
  );
};

export default Information;