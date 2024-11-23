import React, { useState } from 'react';

type NoteCardProps = {
  note: any;
  onDelete: (id: number) => void;
  onUpdate: (id: number, updatedNote: any) => void;
};

const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(note.isEditing);
  const [newTitle, setNewTitle] = useState(note.title);
  const [newText, setNewText] = useState(note.text);
  const [newColor, setNewColor] = useState(note.color);

  const handleSave = () => {
    onUpdate(note.id, { title: newTitle, text: newText, color: newColor });
    setIsEditing(false);
  };

  return (
    <div className="note-card" style={{ backgroundColor: note.color }}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="note-input"
          />
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="note-textarea"
          />
          <div className="note-buttons">
            <button onClick={handleSave} className="edit-button">
              Save
            </button>
            <button onClick={() => onDelete(note.id)} className="delete-button">
              Delete
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="note-timestamp">
            {new Date(note.timestamp).toLocaleString()}
          </div>
          <h3 className="note-title">{note.title}</h3>
          <p className="note-text">{note.text}</p>
          <div className="note-buttons">
            <button onClick={() => setIsEditing(true)} className="edit-button">
              Edit
            </button>
            <button onClick={() => onDelete(note.id)} className="delete-button">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NoteCard;
