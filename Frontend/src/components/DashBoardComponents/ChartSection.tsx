import React from "react";
import { Bar } from "react-chartjs-2";
import { Typography } from "@mui/material";

type ChartSectionProps = {
  chartData: { labels: string[]; datasets: any[] };
};

const ChartSection = ({ chartData }: ChartSectionProps) => (
  <div className="dashboard-section dashboard-small-box">
    <Typography variant="h6" className="dashboard-chartTitle">Note Activity</Typography>
    <Bar 
      data={chartData} 
      options={{
        scales: {
          y: { ticks: { precision: 0 } } // Ensure y-axis ticks are whole numbers
        }
      }}
    />
  </div>
);

export default ChartSection;