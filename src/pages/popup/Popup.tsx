import availableCorpus from '@assets/dataSource/availableCorpus.json';
import { Grid, GridItem } from '@chakra-ui/react';
import '@pages/popup/Popup.css';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import withSuspense from '@src/shared/hoc/withSuspense';
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import Settings from './components/Settings';
import { SettingsContext } from './contexts/SettingsContext';

const Popup = () => {
  const [selectedCorpus, setSelectedCorpus] = useState(availableCorpus[0]?.corpusName || '');
  const [itemsToShow, setItemsToShow] = useState(10);

  return (
    <SettingsContext.Provider value={{ selectedCorpus, itemsToShow, setSelectedCorpus, setItemsToShow }}>
      <Grid templateColumns="repeat(6, 1fr)" gap={6} className="App">
        <GridItem colStart={2} colSpan={4}>
          <SearchBar />
        </GridItem>
        <GridItem colStart={6} colSpan={1}>
          <Settings />
        </GridItem>
      </Grid>
    </SettingsContext.Provider>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
