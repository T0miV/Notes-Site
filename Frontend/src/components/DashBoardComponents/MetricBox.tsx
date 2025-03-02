import React from "react";
import { Typography } from "@mui/material";

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

export default MetricBox;