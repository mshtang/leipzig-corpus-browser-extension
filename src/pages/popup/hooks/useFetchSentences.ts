import { useCallback, useState } from 'react';
import mockApiResponse from '../mocks/mockApiResponse.json';
import { ApiResponseForSentence } from '../types/ApiResponseInterfaces';

const useFetchSentences = (selectedCorpus: string, query: string, itemsToShow: number) => {
  const [results, setResults] = useState<ApiResponseForSentence | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchSentences = useCallback(
    async (offset: number = 0) => {
      try {
        let data: ApiResponseForSentence;
        if (process.env.NODE_ENV === 'development') {
          console.log('Using mock data, number of sentences: ', mockApiResponse.sentences.length);

          data = { ...mockApiResponse, sentences: mockApiResponse.sentences.slice(offset, offset + itemsToShow) };
        } else {
          console.log('Using real data');

          const response = await fetch(
            `https://api.wortschatz-leipzig.de/ws/sentences/${selectedCorpus}/sentences/${query}?limit=${itemsToShow}&offset=${offset}`,
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          data = await response.json();
        }
        setResults(data);
      } catch (error) {
        setError(error.message);
      }
    },
    [selectedCorpus, query, itemsToShow],
  );

  return { results, error, fetchSentences };
};

export default useFetchSentences;
