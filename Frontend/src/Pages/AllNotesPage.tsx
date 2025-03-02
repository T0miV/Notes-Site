import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/FrontpageComponents/SearchBar";
import NotesGrid from "../components/FrontpageComponents/NotesGrid";
import Alert from "@mui/material/Alert";
import "../styles/AllNotesPage.css";

type Note = {
  id: number;
  title: string;
  text: string;
  timestamp: string;
  color: string;
  isEditing: boolean;
};

const AllNotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes`);
      setNotes(response.data.sort((a: Note, b: Note) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    } catch (error) {
      console.error("Error fetching notes", error);
      setErrorMessage("Failed to fetch notes.");
    }
  };

  const handleUpdateNote = async (id: number, updatedNote: Partial<Note>) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/notes/${id}`, updatedNote);
      fetchNotes();
      setSuccessMessage("Note updated successfully!");
      setErrorMessage(null);
    } catch (error) {
      console.error("Error updating note", error);
      setErrorMessage("Failed to update the note.");
    }
  };

  const handleDeleteNote = async (id: number) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/notes/delete/${id}`);
      fetchNotes();
      setSuccessMessage("Note moved to the trash!");
      setErrorMessage(null);
    } catch (error) {
      console.error("Error deleting note", error);
      setErrorMessage("Failed to delete the note.");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="allnotes-container">
      <h1 className="allnotes-title">All Notes</h1>

      {/* Virheilmoitus */}
      {errorMessage && (
        <Alert severity="error" className="custom-alert" onClose={() => setErrorMessage(null)}>
          {errorMessage}
        </Alert>
      )}

      {/* Onnistumisilmoitus */}
      {successMessage && (
        <Alert severity="success" className="custom-alert" onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      )}

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <NotesGrid notes={filteredNotes} onDeleteNote={handleDeleteNote} onUpdateNote={handleUpdateNote} />
      
    </div>
    
  );
};

export default AllNotesPage;
