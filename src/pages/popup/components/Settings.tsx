import { useState } from 'react';
import Modal from 'react-modal';

const Settings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const [selectedCorpus, setSelectedCorpus] = useState('');
  const [itemsToShow, setItemsToShow] = useState(10);

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

  return (
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
              <option value="">Select a corpus</option>
              {/* Render options dynamically from availableCorpus.json */}
            </select>
          </label>
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
  );
};

export default Settings;
