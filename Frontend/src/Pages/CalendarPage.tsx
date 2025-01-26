import React, { useEffect, useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import axios from 'axios';
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

  // Hakee muistiinpanot backendistä
  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes`);
      const activeNotes = response.data.filter((note: Note) => note.isDeleted === 0);
      setNotes(activeNotes.reverse());
    } catch (error) {
      console.error("Error fetching notes", error);
    }
  };

  // Käynnistää muistiinpanojen haun komponentin mountissa
  useEffect(() => {
    fetchNotes();
  }, []);

  // Päivämäärän käsittely
  const handleDateChange: CalendarProps['onChange'] = (value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    } else if (Array.isArray(value)) {
      setSelectedDate(value[0]);
    } else {
      setSelectedDate(null);
    }
  };

  // Muistiinpanot valitulle päivämäärälle
  const notesForSelectedDate = notes.filter(
    (note) =>
      selectedDate &&
      note.timestamp.split('T')[0] === selectedDate.toLocaleDateString('en-CA') // käytetään ISO 8601 -muotoa
  );

  // Tarkistaa, onko päivällä muistiinpanoja
  const hasNotes = (date: Date) => {
    const dateString = date.toLocaleDateString('en-CA'); // Käytetään paikallista päivämäärämuotoa
    return notes.some((note) => note.timestamp.split('T')[0] === dateString);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-wrapper">
        <div className="calendar-header">
          <h1>Calendar</h1>
        </div>

        <div className="calendar-section">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileClassName={({ date }) => (hasNotes(date) ? 'tile-with-note' : '')}
          />
        </div>

        {selectedDate && (
          <div className="selected-date-section">
            <h2>Selected day: {selectedDate.toLocaleDateString()}</h2>
            <div className="notes-section">
              <h3>Notes:</h3>
              <ul>
                {notesForSelectedDate.length > 0 ? (
                  notesForSelectedDate.map((note) => (
                    <li key={note.id}>
                      <div
                        className="note-item"
                        style={{ backgroundColor: note.color }}
                      >
                        <strong>{note.title}</strong>
                        <p>{note.text}</p>
                      </div>
                    </li>
                  ))
                ) : (
                  <li>No notes on this day</li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;
