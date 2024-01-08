import { useState } from 'react';
import { ApiResponseForSentence } from '../types/ApiResponseInterfaces';

const useFetchSentences = (selectedCorpus: string, query: string, itemsToShow: number) => {
  const [results, setResults] = useState<ApiResponseForSentence | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchSentences = async () => {
    try {
      const response = await fetch(
        `https://api.wortschatz-leipzig.de/ws/sentences/${selectedCorpus}/sentences/${query}?limit=${itemsToShow}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ApiResponseForSentence = await response.json();
      setResults(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return { results, error, fetchSentences };
};

export default useFetchSentences;
