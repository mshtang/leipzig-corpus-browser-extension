import availableCorpus from '@assets/dataSource/availableCorpus.json';
import { useContext, useState } from 'react';
import Modal from 'react-modal';
import { SettingsContext } from '../contexts/SettingsContext';

const Settings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const { selectedCorpus, setSelectedCorpus, itemsToShow, setItemsToShow } = useContext(SettingsContext);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDarkThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDarkTheme(event.target.checked);
  };

  const handleCorpusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCorpus(event.target.value);
  };

  const handleItemsToShowChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsToShow(Number(event.target.value));
  };

  const getCorpusDescription = (corpusName: string) => {
    const selectedCorpus = availableCorpus.find(corpus => corpus.corpusName === corpusName);
    return selectedCorpus?.description || '';
  };

  return (
    <SettingsContext.Provider value={{ selectedCorpus, itemsToShow, setSelectedCorpus, setItemsToShow }}>
      <div>
        <button onClick={openModal}>Settings</button>
        <Modal isOpen={isModalOpen}>
          <div>
            <label>
              Dark Mode:
              <input type="checkbox" checked={darkTheme} onChange={handleDarkThemeChange} />
            </label>
          </div>
          <div>
            <label>
              Available Corpora:
              <select value={selectedCorpus} onChange={handleCorpusChange}>
                {availableCorpus.map(corpus => (
                  <option key={corpus.corpusName} value={corpus.corpusName}>
                    {corpus.corpusName}
                  </option>
                ))}
              </select>
            </label>
            <p>{getCorpusDescription(selectedCorpus)}</p>
          </div>
          <div>
            <label>
              Items to Show:
              <select value={itemsToShow} onChange={handleItemsToShowChange}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </label>
          </div>
          <button onClick={closeModal}>Close</button>
        </Modal>
      </div>
    </SettingsContext.Provider>
  );
};

export default Settings;
