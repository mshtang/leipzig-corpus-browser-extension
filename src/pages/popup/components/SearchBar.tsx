import { Box, Button, Input, List, Text, VStack } from '@chakra-ui/react';
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
    <VStack spacing={4} align="stretch">
      <Box as="form" onSubmit={handleFormSubmit}>
        <Input placeholder="Search..." value={query} onChange={handleQueryChange} />
        <Button mt={2} colorScheme="teal" type="submit">
          Search
        </Button>
      </Box>
      <List spacing={3}>
        {results?.sentences.map((sentence, index) => (
          <Sentence key={index} sentence={sentence.sentence} source={sentence.source} queryWord={query} />
        ))}
      </List>
      <Text>{error}</Text>
    </VStack>
  );
};

export default SearchBar;
