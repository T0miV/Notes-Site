import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css"; // Using the same CSS file as before

type DeletedNote = {
  id: number;
  title: string;
  text: string;
  timestamp: string;
  color: string;
};

const DeletedNotesPage = () => {
  const [deletedNotes, setDeletedNotes] = useState<DeletedNote[]>([]);

  // Fetch deleted notes
  const fetchDeletedNotes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes/deleted`);
      setDeletedNotes(response.data.reverse());
    } catch (error) {
      console.error("Error fetching deleted notes", error);
    }
  };

  // Restore a note
  const handleRestoreNote = async (id: number) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/notes/restore/${id}`);
      fetchDeletedNotes(); // Update the list
    } catch (error) {
      console.error("Error restoring note", error);
    }
  };

  // Permanently delete a note
  const handlePermanentDelete = async (id: number) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/notes/${id}`);
      fetchDeletedNotes(); // Update the list
    } catch (error) {
      console.error("Error permanently deleting note", error);
    }
  };

  useEffect(() => {
    fetchDeletedNotes();
  }, []);

  return (
    <div className="allnotes-container"> {/* Same layout as AllNotesPage */}
      <h1 className="allnotes-title">Deleted Notes</h1> {/* Title */}
      <div className="notes-grid"> {/* Grid of notes */}
        {deletedNotes.map((note) => (
          <div
            key={note.id}
            className="note-card"
            style={{ backgroundColor: note.color }} /* Note color */
          >
            <div className="note-timestamp">
              {new Date(note.timestamp).toLocaleString()}
            </div>
            <h3 className="note-title">{note.title}</h3>
            <p className="note-text">{note.text}</p>
            <div className="note-buttons"> {/* Action buttons */}
              <button
                onClick={() => handleRestoreNote(note.id)}
                className="edit-button" /* Using the same style as the edit button */
              >
                Restore
              </button>
              <button
                onClick={() => handlePermanentDelete(note.id)}
                className="delete-button" /* Delete button */
              >
                Delete Permanently
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeletedNotesPage;
