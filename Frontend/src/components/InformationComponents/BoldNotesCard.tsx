import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material"; // Tuodaan Grid

interface BoldNotesCardProps {
  boldNotesCount: number;
}

const BoldNotesCard: React.FC<BoldNotesCardProps> = ({ boldNotesCount }) => (
  <Grid item xs={12} md={4}>
    <Card className="card">
      <CardContent>
        <Typography variant="h6" className="card-title">
          Bold Notes
        </Typography>
        <Typography variant="h4" className="card-value bold">
          {boldNotesCount}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
);

export default BoldNotesCard;