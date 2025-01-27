import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Dashboard.css";

type Note = {
  id: number;
  title: string;
  text: string;
  timestamp: string;
  color: string;
  isDeleted?: number;
};

const Dashboard = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [deletedNotes, setDeletedNotes] = useState<Note[]>([]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes`);
      const activeNotes = response.data.filter((note: Note) => note.isDeleted === 0);
      const deletedNotes = response.data.filter((note: Note) => note.isDeleted === 1);
      setNotes(activeNotes.reverse());
      setDeletedNotes(deletedNotes.reverse());
    } catch (error) {
      console.error("Error fetching notes", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-form">
        <h1 className="dashboard-title">Notes Dashboard</h1>

        {/* All Notes Section */}
        <div className="dashboard-section">
          <h2>All Notes</h2>
          <div className="notes-grid">
            {notes.map((note) => (
              <div
                key={note.id}
                className="note-card"
                style={{ backgroundColor: note.color }}
              >
                <h3>{note.title}</h3>
                <p>{note.text}</p>
                <small>{new Date(note.timestamp).toLocaleString()}</small>
              </div>
            ))}
          </div>
        </div>

        {/* Deleted Notes Section */}
        <div className="dashboard-section">
          <h2>Deleted Notes</h2>
          <div className="notes-grid">
            {deletedNotes.map((note) => (
              <div
                key={note.id}
                className="note-card"
                style={{ backgroundColor: note.color }}
              >
                <h3>{note.title}</h3>
                <p>{note.text}</p>
                <small>{new Date(note.timestamp).toLocaleString()}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
