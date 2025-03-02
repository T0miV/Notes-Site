import React from "react";
import { Card, CardContent, Typography, Box , Grid} from "@mui/material";

interface LatestNotesCardProps {
  latestNotes: { title: string; timestamp: string }[];
}

const LatestNotesCard: React.FC<LatestNotesCardProps> = ({ latestNotes }) => (
  <Grid item xs={12} md={4}>
    <Card className="card">
      <CardContent>
        <Typography variant="h6" className="card-title">
          Latest Notes
        </Typography>
        {latestNotes.length > 0 ? (
          <Box className="latest-notes-container">
            {latestNotes.map((note, index) => (
              <Box key={index} className="latest-note-item">
                <Typography variant="body1" className="note-title">
                  {note.title}
                </Typography>
                <Typography variant="body2" className="note-timestamp">
                  {new Date(note.timestamp).toLocaleString()}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography variant="body1" className="no-data-text">
            No latest notes available.
          </Typography>
        )}
      </CardContent>
    </Card>
  </Grid>
);

export default LatestNotesCard;