import React from 'react';
import { TextField, Button } from '@mui/material';

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleResetSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="search-box-container">
      <TextField
        label="Search Notes"
        value={searchQuery}
        onChange={handleSearchChange}
        variant="outlined"
        fullWidth
        sx={{ maxWidth: 400 }}
      />
      <Button variant="contained" onClick={handleResetSearch} className="reset-button">
        Reset
      </Button>
    </div>
  );
};

export default SearchBar;
