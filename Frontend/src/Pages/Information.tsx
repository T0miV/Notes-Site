import React, { useEffect, useState } from "react";
import { AppBar, Box, Button, Grid, Typography } from "@mui/material"; // Tuodaan Typography
import axios from "axios";
import "../styles/Information.css";
import TotalNotesCard from "../components/InformationComponents/TotalNotesCard";
import ColorDistributionCard from "../components/InformationComponents/ColorDistributionCard";
import NotesLast7DaysCard from "../components/InformationComponents/NotesLast7DaysCard";
import UnderlinedNotesCard from "../components/InformationComponents/UnderlinedNotesCard";
import BoldNotesCard from "../components/InformationComponents/BoldNotesCard";
import ItalicNotesCard from "../components/InformationComponents/ItalicNotesCard";
import TopColorsCard from "../components/InformationComponents/TopColorsCard";
import LatestNotesCard from "../components/InformationComponents/LatestNotesCard";
import NotesPerUserCard from "../components/InformationComponents/NotesPerUserCard";

import Footer from "./Footer";

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

  return (
    <Box className="dashboard-container">
      <AppBar position="static" className="app-bar">
        <Typography variant="h4" align="center" className="app-bar-title">
          Statistics
        </Typography>
      </AppBar>

      <Grid container spacing={3} className="grid-container">
        {/* Card 1: Total Notes */}
        <TotalNotesCard totalNotes={stats.totalNotes} />

        {/* Card 2: Color Distribution */}
        <ColorDistributionCard colorStats={stats.colorStats} />

        {/* Card 3: Notes Last 7 Days */}
        <NotesLast7DaysCard notesLast7Days={stats.notesLast7Days} /> 

        {/* Card 4: Underlined Notes */}
        <UnderlinedNotesCard underlinedNotesCount={stats.underlinedNotesCount} />

        {/* Card 5: Bold Notes */}
        <BoldNotesCard boldNotesCount={stats.boldNotesCount} />

        {/* Card 6: Italic Notes */}
        <ItalicNotesCard italicNotesCount={stats.italicNotesCount} />

        {/* Card 7: Top Colors */}
        <TopColorsCard topColors={stats.topColors} />

        {/* Card 8: Latest Notes */}
        <LatestNotesCard latestNotes={stats.latestNotes} />

        {/* Card 9: Notes Per User */}
        <NotesPerUserCard notesPerUser={stats.notesPerUser} />
      </Grid>

      {/* Refresh Button */}
      <Box className="refresh-button-container">
        <Button variant="contained" className="refresh-button" onClick={fetchStats}>
          Refresh Stats
        </Button>
        
      </Box>
      <Footer /> {/* Add the Footer component */}
    </Box>

    
  );
};

export default Information;