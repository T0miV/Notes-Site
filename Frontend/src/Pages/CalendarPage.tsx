import React, { useEffect, useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import '../styles/Calendar.css';

interface Note {
  id: number;
  title: string;
  text: string;
  timestamp: string;
  color: string;
  user_id: number;
  isDeleted: number;
}

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes`);
        const activeNotes = response.data.filter((note: Note) => note.isDeleted === 0);
        setNotes(activeNotes.reverse());
      } catch (error) {
        console.error('Error fetching notes', error);
      }
    };

    fetchNotes();
  }, []);

  const handleDateChange: CalendarProps['onChange'] = (value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    } else if (Array.isArray(value)) {
      setSelectedDate(value[0]);
    } else {
      setSelectedDate(null);
    }
  };

  const notesForSelectedDate = notes.filter(
    (note) =>
      selectedDate &&
      note.timestamp.split('T')[0] === selectedDate.toLocaleDateString('en-CA')
  );

  const hasNotes = (date: Date) => {
    const dateString = date.toLocaleDateString('en-CA');
    return notes.some((note) => note.timestamp.split('T')[0] === dateString);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-wrapper">
        <h1 className="calendar-header">Calendar</h1>

        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileClassName={({ date }) => (hasNotes(date) ? 'tile-with-note' : '')}
        />

        {selectedDate && (
          <div className="selected-date-section">
            <h2>{selectedDate.toLocaleDateString()}</h2>
            <div className="notes-section">
              <h3>Notes:</h3>
              {notesForSelectedDate.length > 0 ? (
                <ul>
                  {notesForSelectedDate.map((note) => (
                    <li key={note.id} className="note-item" style={{ backgroundColor: note.color }}>
                      <strong>{note.title}</strong>
                      <p>{note.text}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No notes on this day</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;
