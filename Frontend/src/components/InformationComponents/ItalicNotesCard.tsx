import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material"; // Tuodaan Grid

interface ItalicNotesCardProps {
  italicNotesCount: number;
}

const ItalicNotesCard: React.FC<ItalicNotesCardProps> = ({ italicNotesCount }) => (
  <Grid item xs={12} md={4}>
    <Card className="card">
      <CardContent>
        <Typography variant="h6" className="card-title">
          Italic Notes
        </Typography>
        <Typography variant="h4" className="card-value italic">
          {italicNotesCount}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
);

export default ItalicNotesCard;