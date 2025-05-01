import React from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material"; // Tuodaan Grid
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ColorDistributionCardProps {
  colorStats: { color: string; colorCount: number }[];
}

const ColorDistributionCard: React.FC<ColorDistributionCardProps> = ({ colorStats }) => {
  const colorData = {
    labels: colorStats.map((stat) => stat.colorCount),
    datasets: [
      {
        label: "Color Distribution",
        data: colorStats.map((stat) => stat.colorCount),
        backgroundColor: colorStats.map((stat) => stat.color),
        borderWidth: 1,
      },
    ],
  };

  return (
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
  );
};

export default ColorDistributionCard;