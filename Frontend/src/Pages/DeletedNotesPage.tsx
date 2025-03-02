import React, { useEffect, useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Footer from "./Footer";
import "../styles/DeletedNotesPage.css"; 

//Define the Note type
type DeletedNote = {
  id: number;
  title: string;
  text: string;
  timestamp: string;
  color: string;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
};

const DeletedNotesPage = () => {
  const [deletedNotes, setDeletedNotes] = useState<DeletedNote[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  //Fetch deleted notes from the database
  const fetchDeletedNotes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes/deleted`);
      setDeletedNotes(response.data.sort((a: DeletedNote, b: DeletedNote) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ));
    } catch (error) {
      setErrorMessage("Error fetching deleted notes");
    }
  };

  //Restore a note back to the main list
  const handleRestoreNote = async (id: number) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/notes/restore/${id}`, { isDeleted: false });
      setSuccessMessage("Note restored successfully!");
      fetchDeletedNotes();
    } catch (error) {
      setErrorMessage("Error restoring note");
    }
  };

  //Permanently delete a note from the database
  const handlePermanentDelete = async (id: number) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/notes/${id}`);
      setSuccessMessage("Note permanently deleted!");
      fetchDeletedNotes();
    } catch (error) {
      setErrorMessage("Error permanently deleting note");
    }
  };

  //Hide or show success and error messages after 3 seconds
  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
        setErrorMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    fetchDeletedNotes();
  }, []);

  return (
    <div className="allnotes-container">
      <h1 className="allnotes-title">Deleted Notes</h1>


          {/* Display success and error messages */}
          {successMessage && (
            <Alert severity="success" className="custom-alert">{successMessage}</Alert>
          )}
          {errorMessage && (
            <Alert severity="error" className="custom-alert">{errorMessage}</Alert>
          )}

      <div className="notes-grid">
        {deletedNotes.map((note) => (
          <div
            key={note.id}
            className="note-card"
            style={{ backgroundColor: note.color }}
          >
            <div className="note-timestamp">
              {new Date(note.timestamp).toLocaleString()}
            </div>
            <h3 className="note-title">{note.title}</h3>
            <p
              className="note-text"
              style={{
                fontWeight: note.isBold ? "bold" : "normal",
                fontStyle: note.isItalic ? "italic" : "normal",
                textDecoration: note.isUnderline ? "underline" : "none",
              }}
            >
              {note.text}
            </p>
            <div className="note-buttons">
              <button onClick={() => handleRestoreNote(note.id)} className="edit-button">
                Restore
              </button>
              <button onClick={() => handlePermanentDelete(note.id)} className="delete-button">
                Delete Permanently
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer /> {/* Add the Footer component */}
    </div>
  );
};

export default DeletedNotesPage;
