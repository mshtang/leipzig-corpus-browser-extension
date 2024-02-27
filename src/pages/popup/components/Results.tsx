import { Box, List, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { ApiResponseForSentence } from '../types/ApiResponseInterfaces';
import Pagination from './Pagination';
import './Results.css';
import Sentence from './Sentence';

interface ResultsProps {
  results: ApiResponseForSentence | null;
  error: string | null;
  query: string;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const Results: React.FC<ResultsProps> = ({ results, error, query, currentPage, pageSize, onPageChange }) => {
  return (
    <VStack spacing={4} align="stretch">
      {query && (
        <Box>
          <Box sx={{ padding: '8px 0' }}></Box>
          <List spacing={1} maxHeight="calc(100vh - 84px)" overflowY="auto">
            {results?.sentences.map((sentence, index) => (
              <Sentence key={index} sentence={sentence.sentence} source={sentence.source} queryWord={query} />
            ))}
          </List>
          <Pagination
            className="Pagination-bar"
            currentPage={currentPage}
            totalCount={results?.count ?? 0}
            pageSize={pageSize}
            onPageChange={onPageChange}
          />
        </Box>
      )}
      {error && <Text>Error: {error}</Text>}
    </VStack>
  );
};

export default Results;
