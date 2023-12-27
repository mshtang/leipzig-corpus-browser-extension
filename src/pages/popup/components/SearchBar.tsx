import logo from '@assets/img/logo.svg';
import React, { useContext, useState } from 'react';
import { SettingsContext } from '../contexts/SettingsContext';
import { ApiResponseForSentence } from '../types/ApiResponseInterfaces';
import Sentence from './Sentence';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ApiResponseForSentence>(null);
  const [error, setError] = useState(null);
  const { selectedCorpus, itemsToShow } = useContext(SettingsContext);

  const handleQueryChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setQuery(event.target.value);
  };

  const handleFormSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://api.wortschatz-leipzig.de/ws/sentences/${selectedCorpus}/sentences/${query}?limit=${itemsToShow}`,
      );
      if (!response.ok) {
        console.log(`HTTP error! status: ${response.status}`);
      }
      const data: ApiResponseForSentence = await response.json();
      setResults(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={query} onChange={handleQueryChange} placeholder="Type to search" />
        <button type="submit">
          <img src={logo} alt="search button" />
        </button>
      </form>
      {error && <div>Error: {error}</div>}
      {results && (
        <ul>
          {results.sentences.map(sentence => (
            <Sentence key={sentence.id} queryWord={query} {...sentence} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
