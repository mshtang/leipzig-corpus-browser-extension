import availableCorpus from '@assets/dataSource/availableCorpus.json';
import logo from '@assets/img/logo-512.png';
import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import '@pages/popup/Popup.css';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import withSuspense from '@src/shared/hoc/withSuspense';
import { useEffect, useRef, useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import Results from './components/Results';
import SearchBar from './components/SearchBar';
import Settings from './components/Settings';
import { SettingsContext } from './contexts/SettingsContext';
import useFetchSentences from './hooks/useFetchSentences';

const Popup = () => {
  const [selectedCorpus, setSelectedCorpus] = useState(availableCorpus[0]?.corpusName || '');
  const [itemsToShow, setItemsToShow] = useState(10);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { results, error, fetchSentences, setResults } = useFetchSentences(selectedCorpus, query, itemsToShow);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (resultsRef.current && currentPage > 1) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [results, currentPage]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleFormSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    fetchSentences();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchSentences((page - 1) * itemsToShow);
  };

  const goBack = () => {
    setQuery('');
    setResults(null);
  };

  return (
    <SettingsContext.Provider value={{ selectedCorpus, itemsToShow, setSelectedCorpus, setItemsToShow }}>
      <Box className="App">
        {!results || query === '' ? (
          <Grid templateColumns="repeat(7, 1fr)" gap={6}>
            <GridItem colStart={2} colSpan={5}>
              <SearchBar query={query} handleQueryChange={handleQueryChange} handleFormSubmit={handleFormSubmit} />
            </GridItem>
            <GridItem colStart={7} colSpan={1}>
              <Settings />
            </GridItem>
          </Grid>
        ) : (
          <Grid templateColumns="repeat(7, 1fr)" gap={6}>
            <GridItem colStart={1} colSpan={1}>
              <IoMdArrowRoundBack style={{ fontSize: '16px' }} onClick={goBack} />
            </GridItem>
          </Grid>
        )}
        {results ? (
          <Box className="Results-container" ref={resultsRef}>
            <Results
              results={results}
              error={error}
              query={query}
              currentPage={currentPage}
              pageSize={itemsToShow}
              onPageChange={handlePageChange}
            />
          </Box>
        ) : (
          <Box className="App-logo-container">
            <a
              className="App-logo"
              href="https://corpora.uni-leipzig.de/en?corpusId=deu_typical-mixed_2018"
              target="_blank"
              rel="noopener noreferrer">
              <img src={logo} alt="logo" />
            </a>
            <Text fontSize="xl" fontWeight="bold" color="blue.700" style={{ marginTop: '36px' }}>
              Look a word up in a Leipzig Corpus
            </Text>
            <Box h={2} />
            <Text fontSize="xs" color="gray.500">
              Switch between corpora from the settings.
            </Text>
          </Box>
        )}
      </Box>
    </SettingsContext.Provider>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
