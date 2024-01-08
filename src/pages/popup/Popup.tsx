import availableCorpus from '@assets/dataSource/availableCorpus.json';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import '@pages/popup/Popup.css';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import withSuspense from '@src/shared/hoc/withSuspense';
import { useState } from 'react';
import Results from './components/Results';
import SearchBar from './components/SearchBar';
import Settings from './components/Settings';
import { SettingsContext } from './contexts/SettingsContext';
import { ApiResponseForSentence } from './types/ApiResponseInterfaces';

const Popup = () => {
  const [selectedCorpus, setSelectedCorpus] = useState(availableCorpus[0]?.corpusName || '');
  const [itemsToShow, setItemsToShow] = useState(10);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    <SettingsContext.Provider value={{ selectedCorpus, itemsToShow, setSelectedCorpus, setItemsToShow }}>
      <Box className="App">
        <Grid templateColumns="repeat(6, 1fr)" gap={6}>
          <GridItem colStart={2} colSpan={4}>
            <SearchBar query={query} handleQueryChange={handleQueryChange} handleFormSubmit={handleFormSubmit} />
          </GridItem>
          <GridItem colStart={6} colSpan={1}>
            <Settings />
          </GridItem>
        </Grid>
        <Box className="Results-container">
          <Results results={results} error={error} query={query} />
        </Box>
      </Box>
    </SettingsContext.Provider>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
