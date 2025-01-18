import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css"; // Käytetään samaa CSS-tiedostoa kuin aiemmin

type DeletedNote = {
  id: number;
  title: string;
  text: string;
  timestamp: string;
  color: string;
};

const DeletedNotesPage: FC = () => {
  const [deletedNotes, setDeletedNotes] = useState<DeletedNote[]>([]);

  // Hae poistetut muistiinpanot
  const fetchDeletedNotes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes/deleted`);
      setDeletedNotes(response.data.reverse());
    } catch (error) {
      console.error("Error fetching deleted notes", error);
    }
  };

  // Palauta muistiinpano
  const handleRestoreNote = async (id: number) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/notes/restore/${id}`);
      fetchDeletedNotes(); // Päivitä lista
    } catch (error) {
      console.error("Error restoring note", error);
    }
  };

  // Poista muistiinpano pysyvästi
  const handlePermanentDelete = async (id: number) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/notes/${id}`);
      fetchDeletedNotes(); // Päivitä lista
    } catch (error) {
      console.error("Error permanently deleting note", error);
    }
  };

  useEffect(() => {
    fetchDeletedNotes();
  }, []);

  return (
    <div className="allnotes-container"> {/* Sama asettelu kuin AllNotesPage */}
      <h1 className="allnotes-title">Deleted Notes</h1> {/* Otsikko */}
      <div className="notes-grid"> {/* Muistiinpanojen ruudukko */}
        {deletedNotes.map((note) => (
          <div
            key={note.id}
            className="note-card"
            style={{ backgroundColor: note.color }} /* Muistiinpanon väri */
          >
            <div className="note-timestamp">
              {new Date(note.timestamp).toLocaleString()}
            </div>
            <h3 className="note-title">{note.title}</h3>
            <p className="note-text">{note.text}</p>
            <div className="note-buttons"> {/* Toimintopainikkeet */}
              <button
                onClick={() => handleRestoreNote(note.id)}
                className="edit-button" /* Käytetään samaa tyyliä kuin muokkausnapilla */
              >
                Restore
              </button>
              <button
                onClick={() => handlePermanentDelete(note.id)}
                className="delete-button" /* Poistonappi */
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
