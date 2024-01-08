import { Box, HStack, IconButton, Link, ListItem, Text } from '@chakra-ui/react';
import React from 'react';
import { FaChevronCircleDown, FaChevronCircleUp } from 'react-icons/fa';
import { Sentence, Source } from '../types/ApiResponseInterfaces';

interface SentenceProps {
  sentence: string;
  source: Source;
  queryWord: string;
}

const Sentence: React.FC<SentenceProps> = ({ sentence, source, queryWord }) => {
  const [showDetails, setShowDetails] = React.useState(false);
  const [showChevron, setShowChevron] = React.useState(false);

  const urlObject = new URL(source.url);
  const hostname = urlObject.hostname;
  const domain = hostname.replace('www.', '');

  return (
    <ListItem p={4} border="1px" borderColor="gray.200" borderRadius="md" mb={4}>
      <Box position="relative" onMouseEnter={() => setShowChevron(true)} onMouseLeave={() => setShowChevron(false)}>
        <Text sx={{ minHeight: '24px', textAlign: 'justify' }} fontSize="sm">
          {sentence
            .split(new RegExp(`(${queryWord})`, 'gi'))
            .map((part, index) =>
              part.toLowerCase() === queryWord.toLowerCase() ? <strong key={index}>{part}</strong> : part,
            )}
        </Text>
        {showDetails && (
          <HStack sx={{ justifyContent: 'end' }}>
            <Text mt={2} fontStyle="italic">
              <strong>Source:</strong>{' '}
              <Link href={source.url} isExternal color="teal.500">
                {domain}
              </Link>
            </Text>
            <Text mt={2} fontStyle="italic">
              <strong>Date:</strong> {source.date}
            </Text>
          </HStack>
        )}
        {showChevron && (
          <IconButton
            position="absolute"
            right="0"
            top="0"
            size={'xs'}
            alignSelf={'flex-end'}
            onClick={() => setShowDetails(!showDetails)}
            icon={showDetails ? <FaChevronCircleUp /> : <FaChevronCircleDown />}
            aria-label="toggle-details"
          />
        )}
      </Box>
    </ListItem>
  );
};

export default Sentence;
