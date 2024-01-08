import { List, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { ApiResponseForSentence } from '../types/ApiResponseInterfaces';
import Sentence from './Sentence';

interface ResultsProps {
  results: ApiResponseForSentence | null;
  error: string | null;
  query: string;
}

const Results: React.FC<ResultsProps> = ({ results, error, query }) => {
  return (
    <VStack spacing={4} align="stretch">
      <List spacing={3}>
        {results?.sentences.map((sentence, index) => (
          <Sentence key={index} sentence={sentence.sentence} source={sentence.source} queryWord={query} />
        ))}
      </List>
      {error && <Text>Error: {error}</Text>}
    </VStack>
  );
};

export default Results;
