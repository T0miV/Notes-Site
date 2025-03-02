import React from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material"; // Tuodaan Grid
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface NotesPerUserCardProps {
  notesPerUser: { username: string; count: number }[];
}

const NotesPerUserCard: React.FC<NotesPerUserCardProps> = ({ notesPerUser }) => {
  const notesPerUserData = {
    labels: notesPerUser.map((stat) => stat.username),
    datasets: [
      {
        label: "Notes Per User",
        data: notesPerUser.map((stat) => stat.count),
        backgroundColor: "#A28BE3",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Grid item xs={12} md={4}>
      <Card className="card">
        <CardContent>
          <Typography variant="h6" className="card-title">
            Notes Per User
          </Typography>
          <Box className="chart-container">
            {notesPerUser.length > 0 ? (
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
  );
};

export default NotesPerUserCard;