import React from "react";
import { Typography, Button } from "@mui/material";
import { Note } from "../../types/types";
import { useNavigate } from "react-router-dom";

type RecentNotesProps = {
  notes: Note[];
  navigate: ReturnType<typeof useNavigate>;
};

const RecentNotes = ({ notes, navigate }: RecentNotesProps) => (
  <div className="dashboard-section dashboard-small-box">
    <Typography variant="h6">Recent Notes</Typography>
    <div className="dashboard-notes-grid">
      {notes.map((note: Note) => (
        <div key={note.id} className="dashboard-note-card" style={{ backgroundColor: note.color }}>
          <Typography 
            variant="h6" 
            style={{ 
              fontWeight: note.isBold ? "bold" : "normal",
              fontStyle: note.isItalic ? "italic" : "normal",
              textDecoration: note.isUnderline ? "underline" : "none",
            }}
          >
            {note.title}
          </Typography>
          <Typography 
            variant="body2" 
            style={{ 
              fontWeight: note.isBold ? "bold" : "normal",
              fontStyle: note.isItalic ? "italic" : "normal",
              textDecoration: note.isUnderline ? "underline" : "none",
            }}
          >
            {note.text}
          </Typography>
          <Typography variant="caption">
            {new Date(note.timestamp).toLocaleString()}
          </Typography>
        </div>
      ))}
    </div>
    <Button 
      variant="contained" 
      color="primary" 
      onClick={() => navigate("/all-notes")}
      style={{ position: "absolute", top: 10, right: 10 }}
    >
      View all notes
    </Button>
  </div>
);

export default RecentNotes;