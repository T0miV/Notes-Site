import React, { useEffect, useState } from "react";
import { AppBar, Box, Stack, Typography, Button, Paper, FormControl, Select, MenuItem } from "@mui/material";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
import axios from "axios";
import "../styles/Information.css"; // Tuodaan CSS-tiedosto

const Information = () => {
  const [stats, setStats] = useState<{
    totalNotes: number;
    colorStats: { color: string; colorCount: number }[];
  }>({
    totalNotes: 0,
    colorStats: [],
  });

  const [selectedStat, setSelectedStat] = useState<string>("totalNotes");

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes/stats`); 
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
      <AppBar position="static" sx={{ marginBottom: 4, backgroundColor: "#4caf50", padding: 2 }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: "bold", color: "#fff" }}>
          Notes Statistics
        </Typography>
      </AppBar>

      <Paper elevation={3} sx={{ padding: 3, maxWidth: 800, margin: "0 auto", backgroundColor: "#ffffff" }}>
        <Stack spacing={4} alignItems="center">
          {/* Pudotusvalikko tilastojen valitsemiseen */}
          <FormControl fullWidth>
            <Select
              value={selectedStat}
              onChange={(e) => setSelectedStat(e.target.value)}
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="totalNotes">Total Notes</MenuItem>
              <MenuItem value="colorStats">Color Distribution</MenuItem>
            </Select>
          </FormControl>

          {/* Näytä kokonaismäärä muistiinpanoja */}
          {selectedStat === "totalNotes" && (
            <Typography variant="h6" sx={{ color: "#555" }}>
              Total Notes: <strong>{stats.totalNotes}</strong>
            </Typography>
          )}

          {/* Näytä värijakauma */}
          {selectedStat === "colorStats" && (
            stats.colorStats && stats.colorStats.length > 0 ? (
              <PieChart width={500} height={300}>
                <Pie
                  data={stats.colorStats}
                  dataKey="colorCount"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  label={(entry) => `${entry.color}: ${entry.colorCount}`}
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
                No data available for color distribution.
              </Typography>
            )
          )}

          {/* Päivitä tilastot -nappi */}
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