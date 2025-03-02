import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material"; // Tuodaan Grid

interface UnderlinedNotesCardProps {
  underlinedNotesCount: number;
}

const UnderlinedNotesCard: React.FC<UnderlinedNotesCardProps> = ({ underlinedNotesCount }) => (
  <Grid item xs={12} md={4}>
    <Card className="card">
      <CardContent>
        <Typography variant="h6" className="card-title">
          Underlined Notes
        </Typography>
        <Typography variant="h4" className="card-value underlined">
          {underlinedNotesCount}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
);

export default UnderlinedNotesCard;