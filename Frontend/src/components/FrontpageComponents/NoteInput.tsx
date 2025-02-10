import React, { useState } from 'react';

interface NoteInputProps {
  onAddNote: (title: string, text: string, color: string, isBold: boolean, isItalic: boolean, isUnderline: boolean) => void;
}

const NoteInput: React.FC<NoteInputProps> = ({ onAddNote }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [color, setColor] = useState('#1976d2');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const commonColors = [
    "#3388FF", // sininen
    "#00FFFF", // cyan
    "#33FF57", // vihreä
    "#FFEA00", // keltainen
    "#FF8833", // oranssi
    "#FF2800", // punainen
    "#808080"  // harmaa
  ];

  const handleAddNote = () => {
    onAddNote(title, text, color, isBold, isItalic, isUnderline);
    setTitle('');
    setText('');
    setColor('#1976d2');
    setIsBold(false);
    setIsItalic(false);
    setIsUnderline(false);
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
        <button onClick={() => setIsUnderline(!isUnderline)} className={`toolbar-button ${isUnderline ? 'active' : ''}`}>U</button>
        <button onClick={() => setIsItalic(!isItalic)} className={`toolbar-button ${isItalic ? 'active' : ''}`}>I</button>
        <button onClick={() => setIsBold(!isBold)} className={`toolbar-button ${isBold ? 'active' : ''}`}>B</button>
        
      </div>
      
      {/* Värivalitsin */}
      <div className="color-picker-container">
        {commonColors.map((col) => (
          <button
            key={col}
            className={`color-option ${color === col ? "selected" : ""}`}
            style={{ backgroundColor: col }}
            onClick={() => setColor(col)}
          />
        ))}
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="color-picker"
        />
      </div>

      <button onClick={handleAddNote} className="save-button">Save</button>
    </div>
  );
};

export default NoteInput;
