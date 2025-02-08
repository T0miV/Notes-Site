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
  const [newIsBold, setNewIsBold] = useState(note.isBold);
  const [newIsItalic, setNewIsItalic] = useState(note.isItalic);
  const [newIsUnderline, setNewIsUnderline] = useState(note.isUnderline);

  const handleSave = () => {
    onUpdate(note.id, {
      title: newTitle,
      text: newText,
      color: newColor,
      isBold: newIsBold,
      isItalic: newIsItalic,
      isUnderline: newIsUnderline,
    });
    setIsEditing(false);
  };

  return (
    <div className="note-card" style={{ backgroundColor: note.color }}>
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="note-input-edit"
          />
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="note-textarea-edit"
            style={{
              fontWeight: newIsBold ? 'bold' : 'normal',
              fontStyle: newIsItalic ? 'italic' : 'normal',
              textDecoration: newIsUnderline ? 'underline' : 'none',
            }}
          />
          <div className="text-toolbar">
            <button onClick={() => setNewIsBold(!newIsBold)} className={`toolbar-button ${newIsBold ? 'active' : ''}`}>B</button>
            <button onClick={() => setNewIsItalic(!newIsItalic)} className={`toolbar-button ${newIsItalic ? 'active' : ''}`}>I</button>
            <button onClick={() => setNewIsUnderline(!newIsUnderline)} className={`toolbar-button ${newIsUnderline ? 'active' : ''}`}>U</button>
          </div>
          <div className="note-buttons">
            <button onClick={handleSave} className="edit-button">Save</button>
            <button onClick={() => onDelete(note.id)} className="delete-button">Delete</button>
          </div>
        </div>
      ) : (
        <>
          <div className="note-timestamp">
            {new Date(note.timestamp).toLocaleString()}
          </div>
          <h3 className="note-title">{note.title}</h3>
          <p className="note-text" style={{
            fontWeight: note.isBold ? 'bold' : 'normal',
            fontStyle: note.isItalic ? 'italic' : 'normal',
            textDecoration: note.isUnderline ? 'underline' : 'none',
          }}>
            {note.text}
          </p>
          <div className="note-buttons">
            <button onClick={() => setIsEditing(true)} className="edit-button">Edit</button>
            <button onClick={() => onDelete(note.id)} className="delete-button">Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default NoteCard;