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
    <li>
      {sentence
        .split(new RegExp(`(${queryWord})`, 'gi'))
        .map((part, index) =>
          part.toLowerCase() === queryWord.toLowerCase() ? <strong key={index}>{part}</strong> : part,
        )}
      <p>
        Source:{' '}
        <a href={source.url} target="_blank" rel="noopener noreferrer">
          {domain}
        </a>
      </p>
      <p>Date: {source.date}</p>
    </li>
  );
};

export default Sentence;
