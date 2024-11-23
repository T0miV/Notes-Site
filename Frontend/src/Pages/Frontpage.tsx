import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteInput from '../components/FrontpageComponents/NoteInput';
import SearchBar from '../components/FrontpageComponents/SearchBar';
import NotesGrid from '../components/FrontpageComponents/NotesGrid';
import '../styles/Frontpage.css';

type Note = {
  id: number;
  title: string;
  text: string;
  timestamp: string;
  color: string;
  isEditing: boolean;
};

const Frontpage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/notes');
      setNotes(response.data.reverse());
    } catch (error) {
      console.error('Error fetching notes', error);
    }
  };

  const handleAddNote = async (title: string, text: string, color: string) => {
    if (title.trim() && text.trim()) {
      const timestamp = new Date().toISOString();
      const newNote = { title, text, timestamp, color };

      try {
        await axios.post('http://localhost:5000/notes', newNote);
        fetchNotes();
      } catch (error) {
        console.error('Error adding note', error);
      }
    }
  };

  const handleUpdateNote = async (id: number, updatedNote: Partial<Note>) => {
    try {
      await axios.put(`http://localhost:5000/notes/${id}`, updatedNote);
      fetchNotes(); // Fetch notes again to update the UI
    } catch (error) {
      console.error('Error updating note', error);
    }
  };

  const handleDeleteNote = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) || note.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="frontpage-container">
      <h1 className="frontpage-title">Write notes</h1>
      <NoteInput onAddNote={handleAddNote} />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <NotesGrid notes={filteredNotes} onDeleteNote={handleDeleteNote} onUpdateNote={handleUpdateNote} />
    </div>
  );
};

export default Frontpage;
