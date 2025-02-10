import React, { useState, useEffect } from "react";
import axios from "axios";
import NoteInput from "../components/FrontpageComponents/NoteInput";
import SearchBar from "../components/FrontpageComponents/SearchBar";
import NotesGrid from "../components/FrontpageComponents/NotesGrid";
import Alert from "@mui/material/Alert"; // Import Alert-komponentti
import "../styles/Frontpage.css";

type Note = {
  id: number;
  title: string;
  text: string;
  timestamp: string;
  color: string;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
};

const Frontpage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Virheilmoitus
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Onnistumisilmoitus

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes`);
      // Lajittele muistiinpanot uusimmasta vanhimpaan
      setNotes(response.data.sort((a: Note, b: Note) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    } catch (error) {
      console.error("Error fetching notes", error);
      setErrorMessage("Failed to fetch notes."); // Näytä virheilmoitus
    }
  };

  const handleAddNote = async (title: string, text: string, color: string, isBold: boolean, isItalic: boolean, isUnderline: boolean) => {
    if (!title.trim() || !text.trim()) {
      setErrorMessage("Both title and text must be filled to save the note."); // Näytä virheilmoitus
      return;
    }

    const timestamp = new Date().toISOString();
    const newNote = { title, text, timestamp, color, isBold, isItalic, isUnderline };

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/notes`, newNote);
      fetchNotes();
      setSuccessMessage("Note saved successfully!"); // Näytä onnistumisilmoitus
      setErrorMessage(null); // Tyhjennä virheilmoitus
    } catch (error) {
      console.error("Error adding note", error);
      setErrorMessage("Failed to save the note."); // Näytä virheilmoitus
    }
  };

  const handleUpdateNote = async (id: number, updatedNote: Partial<Note>) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/notes/${id}`, updatedNote);
      fetchNotes();
      setSuccessMessage("Note updated successfully!"); // Näytä onnistumisilmoitus
      setErrorMessage(null); // Tyhjennä virheilmoitus
    } catch (error) {
      console.error("Error updating note", error);
      setErrorMessage("Failed to update the note."); // Näytä virheilmoitus
    }
  };

  const handleDeleteNote = async (id: number) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/notes/delete/${id}`);
      fetchNotes();
      setSuccessMessage("Note deleted successfully!"); // Näytä onnistumisilmoitus
      setErrorMessage(null); // Tyhjennä virheilmoitus
    } catch (error) {
      console.error("Error deleting note", error);
      setErrorMessage("Failed to delete the note."); // Näytä virheilmoitus
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Suodata muistiinpanot hakusanan perusteella
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) || note.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="frontpage-container">
      <h1 className="frontpage-title">Write Notes</h1>

      {/* Virheilmoitus */}
      {errorMessage && (
        <Alert severity="error" className="error-alert" onClose={() => setErrorMessage(null)}>
          {errorMessage}
        </Alert>
      )}

      {/* Onnistumisilmoitus */}
      {successMessage && (
        <Alert severity="success" className="success-alert" onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      )}

      <NoteInput onAddNote={handleAddNote} />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <NotesGrid notes={filteredNotes} onDeleteNote={handleDeleteNote} onUpdateNote={handleUpdateNote} />
    </div>
  );
};

export default Frontpage;