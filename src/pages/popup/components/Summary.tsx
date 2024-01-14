import { Text } from '@chakra-ui/react';
import React from 'react';

interface Summary {
  count: number;
  start: number;
  end: number;
}

const Summary: React.FC<Summary> = ({ count, start, end }) => {
  return (
    <Text fontSize="16px" color="blue">
      Showing: {start} - {end} / {count}
    </Text>
  );
};

export default Summary;
