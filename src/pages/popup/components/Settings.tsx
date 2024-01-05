import availableCorpus from '@assets/dataSource/availableCorpus.json';
import {
  Button,
  Icon,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  useDisclosure,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { FaCog } from 'react-icons/fa';
import Modal from 'react-modal';
import { SettingsContext } from '../contexts/SettingsContext';

const Settings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [darkTheme, setDarkTheme] = useState(false);
  const { selectedCorpus, setSelectedCorpus, itemsToShow, setItemsToShow } = useContext(SettingsContext);

  const onOpen = () => {
    setIsModalOpen(true);
  };

  const onClose = () => {
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
        <Button
          onClick={onOpen}
          variant="ghost"
          rightIcon={<Icon as={FaCog} />}
          position="absolute"
          top="5"
          right="5"
        />
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Settings</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Switch isChecked={darkTheme} onChange={handleDarkThemeChange} />
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
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </SettingsContext.Provider>
  );
};

export default Settings;
