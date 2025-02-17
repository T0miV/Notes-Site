import React, { useState, useEffect } from "react";
import axios from "axios";
import NoteInput from "../components/FrontpageComponents/NoteInput";
import SearchBar from "../components/FrontpageComponents/SearchBar";
import NotesGrid from "../components/FrontpageComponents/NotesGrid";
import Alert from "@mui/material/Alert";
import "../styles/Frontpage.css";

// Define the structure of a Note object
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
  // State to store the list of notes
  const [notes, setNotes] = useState<Note[]>([]);
  // State to store the search query
  const [searchQuery, setSearchQuery] = useState("");
  // State to store error messages
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // State to store success messages
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  //Function to fetch notes from the backend
  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes`);
      // Sort notes from newest to oldest based on timestamp
      setNotes(response.data.sort((a: Note, b: Note) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    } catch (error) {
      console.error("Error fetching notes", error);
      setErrorMessage("Failed to fetch notes."); 
    }
  };

  //Function to handle adding a new note
  const handleAddNote = async (title: string, text: string, color: string, isBold: boolean, isItalic: boolean, isUnderline: boolean) => {
    // Check if title and text are not empty
    if (!title.trim() || !text.trim()) {
      setErrorMessage("Both title and text must be filled to save the note.");
      return;
    }

    //Create a new note object with the current timestamp
    const timestamp = new Date().toISOString();
    const newNote = { title, text, timestamp, color, isBold, isItalic, isUnderline };

    try {
      // Send a POST request to add the new note to the backend
      await axios.post(`${process.env.REACT_APP_API_URL}/notes`, newNote);
      // Fetch the updated list of notes
      fetchNotes();

      setSuccessMessage("Note saved successfully!"); 
      setErrorMessage(null);
    } catch (error) {
      console.error("Error adding note", error);
      setErrorMessage("Failed to save the note."); 
    }
  };

  //Function to handle updating an existing note
  const handleUpdateNote = async (id: number, updatedNote: Partial<Note>) => {
    try {
      // Send a PUT request to update the note
      await axios.put(`${process.env.REACT_APP_API_URL}/notes/${id}`, updatedNote);
      fetchNotes();
      setSuccessMessage("Note updated successfully!");
      setErrorMessage(null); 
    } catch (error) {
      console.error("Error updating note", error);
      setErrorMessage("Failed to update the note.");
    }
  };

  //Function to handle deleting a note (moving it to the deleted notes page)
  const handleDeleteNote = async (id: number) => {
    try {
      // Send a PUT request to mark the note as deleted
      await axios.put(`${process.env.REACT_APP_API_URL}/notes/delete/${id}`);
      // Fetch the updated list of notes
      fetchNotes();
      setSuccessMessage("Note moved to the trash!"); 
      setErrorMessage(null);
    } catch (error) {
      console.error("Error deleting note", error);
      setErrorMessage("Failed to delete the note.");
    }
  };

  // Fetch notes when the component mounts
  useEffect(() => {
    fetchNotes();
  }, []);

  //Filter notes based on the search query
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) || note.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="frontpage-container">
      <h1 className="frontpage-title">Write Notes</h1>

      {/* Display error message if there is one */}
      {errorMessage && (
        <Alert severity="error" className="error-alert" onClose={() => setErrorMessage(null)}>
          {errorMessage}
        </Alert>
      )}

      {/* Display success message if there is one */}
      {successMessage && (
        <Alert severity="success" className="success-alert" onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      )}

      {/* Render the NoteInput component */}
      <NoteInput onAddNote={handleAddNote} />
      {/* Render the SearchBar component */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {/* Render the NotesGrid component with filtered notes */}
      <NotesGrid notes={filteredNotes} onDeleteNote={handleDeleteNote} onUpdateNote={handleUpdateNote} />
    </div>
  );
};

export default Frontpage;