import React, { useEffect, useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import axios from 'axios'; // Axios tietokantakutsuihin
import '../styles/Calendar.css';

interface Note {
  date: string; // Päivämäärä string-muodossa (esim. "2025-01-20")
  text: string; // Muistiinpanon teksti
}

const CalendarPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Valittu päivämäärä
  const [notes, setNotes] = useState<Note[]>([]); // Lista muistiinpanoista
  const [noteText, setNoteText] = useState(''); // Tekstikentän sisältö

  // Funktio muistiinpanojen hakemiseen
  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes`); // Hae muistiinpanot backendistä
      setNotes(response.data.reverse()); // Käännä järjestys tarvittaessa (uusimmat ensin)
    } catch (error) {
      console.error('Error fetching notes', error);
    }
  };

  // Hae muistiinpanot, kun komponentti ladataan
  useEffect(() => {
    fetchNotes();
  }, []);

  // Käsittele kalenterin päivämäärän valinta
  const handleDateChange: CalendarProps['onChange'] = (value) => {
    if (value instanceof Date) {
      setSelectedDate(value); // Päivitetään valittu yksittäinen päivämäärä
    } else if (Array.isArray(value)) {
      setSelectedDate(value[0]); // Jos aluevalinta, otetaan ensimmäinen päivämäärä
    } else {
      setSelectedDate(null); // Null-arvo, jos ei päivämäärää valittu
    }
    setNoteText(''); // Tyhjennetään tekstikenttä
  };

  // Lisää uusi muistiinpano
  const handleAddNote = async () => {
    if (!selectedDate) return; // Jos päivämäärää ei ole valittu, ei tehdä mitään

    const dateKey = selectedDate.toISOString().split('T')[0]; // Muotoillaan päivämäärä (esim. "2025-01-20")
    const newNote = { date: dateKey, text: noteText }; // Luodaan uusi muistiinpano

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/notes`, newNote); // Lähetä uusi muistiinpano backendille
      await fetchNotes(); // Päivitä muistiinpanolista uudelleen
      setNoteText(''); // Tyhjennä tekstikenttä
    } catch (error) {
      console.error('Muistiinpanon lisääminen epäonnistui:', error);
    }
  };

  // Suodata muistiinpanot valitulle päivämäärälle
  const notesForSelectedDate = notes.filter(
    (note) =>
      selectedDate &&
      note.date === selectedDate.toISOString().split('T')[0] // Vertaillaan päivämäärästringejä
  );

  return (
    <div style={{ padding: '20px' }}>
      <h1>Kalenteri</h1>
      <Calendar
        onChange={handleDateChange} // Kalenterin päivämäärän muutoskäsittelijä
        value={selectedDate} // Kalenterin valittu päivämäärä
      />
      {selectedDate && (
        <div style={{ marginTop: '20px' }}>
          <h2>Valittu päivämäärä: {selectedDate.toLocaleDateString()}</h2>

          <div>
            <h3>Muistiinpanot:</h3>
            <ul>
              {notesForSelectedDate.length > 0 ? (
                notesForSelectedDate.map((note, index) => (
                  <li key={index}>{note.text}</li> // Näytä muistiinpano
                ))
              ) : (
                <li>Ei muistiinpanoja tälle päivälle</li> // Ei muistiinpanoja
              )}
            </ul>
          </div>

          <div style={{ marginTop: '10px' }}>
            <textarea
              value={noteText} // Tekstikentän arvo
              onChange={(e) => setNoteText(e.target.value)} // Päivitä tekstikenttä
              placeholder="Kirjoita muistiinpano..."
              rows={4}
              style={{ width: '100%' }}
            />
            <button
              onClick={handleAddNote} // Lisää uusi muistiinpano
              style={{
                marginTop: '10px',
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Lisää muistiinpano
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
