import logo from '@assets/img/logo.svg';
import { Button, HStack, Input } from '@chakra-ui/react';
import React from 'react';
import './SearchBar.css';

interface SearchBarProps {
  query: string;
  handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (event: React.FormEvent<HTMLDivElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, handleQueryChange, handleFormSubmit }) => {
  return (
    <HStack as="form" onSubmit={handleFormSubmit}>
      <Input placeholder="Type a word" value={query} onChange={handleQueryChange} />
      <Button type="submit">
        <img src={logo} alt="search button" className="Search-icon" style={{ height: '100%' }} />
      </Button>
    </HStack>
  );
};

export default SearchBar;
