import React, { useEffect, useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import Footer from './Footer';
import '../styles/Calendar.css';

interface Note {
  id: number;
  title: string;
  text: string;
  timestamp: string; // Muoto: "2025-01-31T13:03:20.927Z"
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
        const activeNotes = response.data.filter((note: Note) => !note.isDeleted);

        setNotes(activeNotes.reverse());
        console.log('Fetched notes:', activeNotes);
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
    console.log('Selected date:', selectedDate);
  };

  // Apufunktio vertaamaan päivämääriä ilman kellonaikaa
  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  // Suodatetaan muistiinpanot valitulle päivämäärälle
  const notesForSelectedDate = notes.filter(
    (note) =>
      selectedDate && isSameDay(new Date(note.timestamp), selectedDate)
  );

  // Tarkistetaan, onko tietyllä päivämäärällä muistiinpanoja
  const hasNotes = (date: Date) =>
    notes.some((note) => isSameDay(new Date(note.timestamp), date));

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
      <Footer />
    </div>
  );
};

export default CalendarPage;
