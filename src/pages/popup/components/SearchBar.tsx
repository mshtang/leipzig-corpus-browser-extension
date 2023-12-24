import logo from '@assets/img/logo.svg';
import React, { useState } from 'react';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);

  const handleQueryChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setQuery(event.target.value);
  };

  const handleFormSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const response = await fetch(`https://api.wortschatz-leipzig.de/ws/corpora`);
    const data = await response.json();
    setResults(data);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={query} onChange={handleQueryChange} placeholder="Type to search" />
        <button type="submit">
          <img src={logo} alt="search button" />
        </button>
      </form>
      {results && <div>{JSON.stringify(results)}</div>}
    </div>
  );
};

export default SearchBar;
