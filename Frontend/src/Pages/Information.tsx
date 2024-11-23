import React, { FC, useEffect, useState } from "react";
import { AppBar, Box, Stack, Typography, Button, Paper } from "@mui/material";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
import axios from "axios";

const Information: FC = () => {
  const [stats, setStats] = useState<{
    totalNotes: number;
    colorStats: { color: string; colorCount: number }[];
  }>({
    totalNotes: 0,
    colorStats: [],
  });

  const fetchStats = async () => {
    try {
      const response = await axios.get("http://localhost:5000/notes");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const COLORS = ["#FF8042", "#00C49F", "#FFBB28", "#0088FE", "#D0ED57", "#A28BE3"];

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <AppBar position="static" sx={{ marginBottom: 4, backgroundColor: "#4caf50" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333" }}>
          Notes Statistics
        </Typography>
      </AppBar>

      <Paper elevation={3} sx={{ padding: 3, maxWidth: 1200, margin: "0 auto", backgroundColor: "#ffffff" }}>
        <Stack spacing={4} alignItems="center">
          <Typography variant="h6" sx={{ color: "#555" }}>
            Total Notes: {stats.totalNotes}
          </Typography>
          {stats.colorStats && stats.colorStats.length > 0 ? (
            <PieChart width={500} height={300}>
              <Pie
                data={stats.colorStats}
                dataKey="colorCount"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                label={(entry) => `${entry.colorCount}`}
              >
                {stats.colorStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          ) : (
            <Typography variant="body1" sx={{ color: "#888" }}>
              No data available for chart.
            </Typography>
          )}
          <Button
            variant="contained"
            sx={{ backgroundColor: "#4caf50", ":hover": { backgroundColor: "#388e3c" } }}
            onClick={fetchStats}
          >
            Refresh Stats
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Information;
