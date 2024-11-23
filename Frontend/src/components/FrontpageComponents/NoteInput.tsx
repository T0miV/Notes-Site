import React, { useState } from 'react';

interface NoteInputProps {
  onAddNote: (title: string, text: string, color: string) => void;
}

const NoteInput: React.FC<NoteInputProps> = ({ onAddNote }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [color, setColor] = useState('#ffeb3b');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const handleAddNote = () => {
    onAddNote(title, text, color);
    setTitle('');
    setText('');
    setColor('#ffeb3b');
  };

  return (
    <div className="note-input-container">
      <input
        type="text"
        placeholder="Enter title here..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="note-input"
      />
      <textarea
        placeholder="Enter your note here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="note-textarea"
        style={{
          fontWeight: isBold ? 'bold' : 'normal',
          fontStyle: isItalic ? 'italic' : 'normal',
          textDecoration: isUnderline ? 'underline' : 'none',
        }}
      />
      <div className="text-toolbar">
        <button onClick={() => setIsBold(!isBold)} className="toolbar-button">B</button>
        <button onClick={() => setIsItalic(!isItalic)} className="toolbar-button">I</button>
        <button onClick={() => setIsUnderline(!isUnderline)} className="toolbar-button">U</button>
      </div>
      
      {/* Container for the color picker and save button */}
      <div className="button-container">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="color-picker"
        />
        <button onClick={handleAddNote} className="save-button">Save</button>
      </div>
    </div>
  );
};

export default NoteInput;
