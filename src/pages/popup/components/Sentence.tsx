import { Link, ListItem, Text } from '@chakra-ui/react';
import React from 'react';
import { Sentence, Source } from '../types/ApiResponseInterfaces';

interface SentenceProps {
  sentence: string;
  source: Source;
  queryWord: string;
}

const Sentence: React.FC<SentenceProps> = ({ sentence, source, queryWord }) => {
  const urlObject = new URL(source.url);
  const hostname = urlObject.hostname;
  const domain = hostname.replace('www.', '');

  return (
    <ListItem p={4} border="1px" borderColor="gray.200" borderRadius="md" mb={4}>
      <Text>
        {sentence
          .split(new RegExp(`(${queryWord})`, 'gi'))
          .map((part, index) =>
            part.toLowerCase() === queryWord.toLowerCase() ? <strong key={index}>{part}</strong> : part,
          )}
      </Text>
      <Text mt={2}>
        Source:{' '}
        <Link href={source.url} isExternal color="teal.500">
          {domain}
        </Link>
      </Text>
      <Text mt={2}>Date: {source.date}</Text>
    </ListItem>
  );
};

export default Sentence;
