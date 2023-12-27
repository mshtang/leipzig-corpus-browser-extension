import React from 'react';

export type SettingsContextType = {
  selectedCorpus: string;
  itemsToShow: number;
  setSelectedCorpus: (corpus: string) => void;
  setItemsToShow: (itemsToShow: number) => void;
};

export const SettingsContext = React.createContext<SettingsContextType>({
  selectedCorpus: '',
  itemsToShow: 0,
  setSelectedCorpus: () => {},
  setItemsToShow: () => {},
});
