import React, { useState, useEffect } from "react";
import axios from "axios";
import NoteInput from "../components/FrontpageComponents/NoteInput";
import SearchBar from "../components/FrontpageComponents/SearchBar";
import NotesGrid from "../components/FrontpageComponents/NotesGrid";
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

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes`);
      // Sort notes by newest first
      setNotes(response.data.sort((a: Note, b: Note) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    } catch (error) {
      console.error("Error fetching notes", error);
    }
  };

  const handleAddNote = async (title: string, text: string, color: string, isBold: boolean, isItalic: boolean, isUnderline: boolean) => {
    if (title.trim() && text.trim()) {
      const timestamp = new Date().toISOString();
      const newNote = { title, text, timestamp, color, isBold, isItalic, isUnderline };

      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/notes`, newNote);
        fetchNotes();
      } catch (error) {
        console.error("Error adding note", error);
      }
    }
  };

  const handleUpdateNote = async (id: number, updatedNote: Partial<Note>) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/notes/${id}`, updatedNote);
      fetchNotes();
    } catch (error) {
      console.error("Error updating note", error);
    }
  };

  const handleDeleteNote = async (id: number) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/notes/delete/${id}`);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) || note.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="frontpage-container">
      <h1 className="frontpage-title">Write Notes</h1>
      <NoteInput onAddNote={handleAddNote} />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <NotesGrid notes={filteredNotes} onDeleteNote={handleDeleteNote} onUpdateNote={handleUpdateNote} />
    </div>
  );
};

export default Frontpage;