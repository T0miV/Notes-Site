import React from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material"; // Tuodaan Grid
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface NotesLast7DaysCardProps {
  notesLast7Days: { date: string; count: number }[]; // Oikea propsi
}

const NotesLast7DaysCard: React.FC<NotesLast7DaysCardProps> = ({ notesLast7Days }) => {
  const notesLast7DaysData = {
    labels: notesLast7Days.map((stat) => stat.date),
    datasets: [
      {
        label: "Notes Last 7 Days",
        data: notesLast7Days.map((stat) => stat.count),
        backgroundColor: "#4caf50",
        borderWidth: 1,
      },
    ],
  };

  return (
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
  );
};

export default NotesLast7DaysCard;