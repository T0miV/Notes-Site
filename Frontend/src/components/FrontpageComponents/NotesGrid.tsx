import React from 'react';
import NoteCard from './NoteCard';

type NotesGridProps = {
  notes: any[];
  onDeleteNote: (id: number) => void;
  onUpdateNote: (id: number, updatedNote: Partial<any>) => void;
};

const NotesGrid: React.FC<NotesGridProps> = ({ notes, onDeleteNote, onUpdateNote }) => {
  return (
    <div className="notes-grid">
      {notes.map(note => (
        <NoteCard
          key={note.id}
          note={note}
          onDelete={onDeleteNote}
          onUpdate={onUpdateNote}
        />
      ))}
    </div>
  );
};

export default NotesGrid;
