import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material"; // Tuodaan Grid

interface TotalNotesCardProps {
  totalNotes: number;
}

const TotalNotesCard: React.FC<TotalNotesCardProps> = ({ totalNotes }) => (
  <Grid item xs={12} md={4}>
    <Card className="card">
      <CardContent>
        <Typography variant="h6" className="card-title">
          Total Notes
        </Typography>
        <Typography variant="h4" className="card-value">
          {totalNotes}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
);

export default TotalNotesCard;