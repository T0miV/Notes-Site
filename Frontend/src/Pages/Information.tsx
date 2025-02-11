import React, { useEffect, useState } from "react";
import { AppBar, Box, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import { PieChart, Pie, Tooltip, Cell, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import axios from "axios";
import "../styles/Information.css"; // Tuodaan CSS-tiedosto

const Information = () => {
  const [stats, setStats] = useState<{
    totalNotes: number;
    colorStats: { color: string; colorCount: number }[];
    notesLast7Days: { date: string; count: number }[];
    latestNotes: { title: string; timestamp: string }[];
    boldNotesCount: number;
    italicNotesCount: number;
    underlinedNotesCount: number;
    topColors: { color: string; count: number }[];
    notesPerUser: { username: string; count: number }[];
  }>({
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

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token'); // Oletetaan, että token on tallennettu localStorageen
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/stats`, {
       
      });
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
          Notes Dashboard
        </Typography>
      </AppBar>

      <Grid container spacing={3}>
        {/* Ruutu 1: Kokonaismäärä muistiinpanoja */}
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" sx={{ color: "#555", textAlign: "center" }}>
                Total Notes
              </Typography>
              <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", color: "#4caf50" }}>
                {stats.totalNotes}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Ruutu 2: Värijakauma */}
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" sx={{ color: "#555", textAlign: "center" }}>
                Color Distribution
              </Typography>
              <PieChart width={300} height={200}>
                <Pie
                  data={stats.colorStats}
                  dataKey="colorCount"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {stats.colorStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </CardContent>
          </Card>
        </Grid>

        {/* Ruutu 3: Muistiinpanojen määrä viimeisen 7 päivän aikana */}
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" sx={{ color: "#555", textAlign: "center" }}>
                Notes Last 7 Days
              </Typography>
              <BarChart width={300} height={200} data={stats.notesLast7Days}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#4caf50" />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>

        {/* Ruutu 4: Viimeisimmät muistiinpanot */}
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" sx={{ color: "#555", textAlign: "center" }}>
                Latest Notes
              </Typography>
              {stats.latestNotes && stats.latestNotes.length > 0 ? (
                <Box sx={{ maxHeight: 200, overflowY: "auto" }}>
                  {stats.latestNotes.map((note, index) => (
                    <Box key={index} sx={{ marginBottom: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {note.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#888" }}>
                        {new Date(note.timestamp).toLocaleString()}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body1" sx={{ color: "#888", textAlign: "center" }}>
                  No latest notes available.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Ruutu 5: Lihavoidut muistiinpanot */}
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" sx={{ color: "#555", textAlign: "center" }}>
                Bold Notes
              </Typography>
              <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", color: "#FF8042" }}>
                {stats.boldNotesCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Ruutu 6: Kursivoidut muistiinpanot */}
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" sx={{ color: "#555", textAlign: "center" }}>
                Italic Notes
              </Typography>
              <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", color: "#00C49F" }}>
                {stats.italicNotesCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Ruutu 7: Alleviivatut muistiinpanot */}
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" sx={{ color: "#555", textAlign: "center" }}>
                Underlined Notes
              </Typography>
              <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", color: "#0088FE" }}>
                {stats.underlinedNotesCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Ruutu 8: Suosituimmat värit */}
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" sx={{ color: "#555", textAlign: "center" }}>
                Top Colors
              </Typography>
              {stats.topColors && stats.topColors.length > 0 ? (
                <Box sx={{ maxHeight: 200, overflowY: "auto" }}>
                  {stats.topColors.map((color, index) => (
                    <Box key={index} sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          backgroundColor: color.color,
                          marginRight: 2,
                          borderRadius: "50%",
                        }}
                      />
                      <Typography variant="body1">
                        {color.color}: {color.count}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body1" sx={{ color: "#888", textAlign: "center" }}>
                  No color data available.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Ruutu 9: Muistiinpanojen määrä käyttäjäkohtaisesti */}
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" sx={{ color: "#555", textAlign: "center" }}>
                Notes Per User
              </Typography>
              {stats.notesPerUser && stats.notesPerUser.length > 0 ? (
                <BarChart width={300} height={200} data={stats.notesPerUser}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="username" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#A28BE3" />
                </BarChart>
              ) : (
                <Typography variant="body1" sx={{ color: "#888", textAlign: "center" }}>
                  No user data available.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Päivitä tilastot -nappi */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#4caf50", ":hover": { backgroundColor: "#388e3c" } }}
          onClick={fetchStats}
        >
          Refresh Stats
        </Button>
      </Box>
    </Box>
  );
};

export default Information;