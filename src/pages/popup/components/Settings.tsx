import availableCorpus from '@assets/dataSource/availableCorpus.json';
import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  RadioGroup,
  Select,
  Stack,
  Switch,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { FaCog } from 'react-icons/fa';
import { SettingsContext } from '../contexts/SettingsContext';

const Settings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [darkTheme, setDarkTheme] = useState(false);
  const { selectedCorpus, setSelectedCorpus, itemsToShow, setItemsToShow } = useContext(SettingsContext);

  const handleDarkThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDarkTheme(event.target.checked);
  };

  const handleCorpusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCorpus(event.target.value);
  };

  const handleItemsToShowChange = (numItems: string) => {
    setItemsToShow(Number(numItems));
  };

  const getCorpusDescription = (corpusName: string) => {
    const selectedCorpus = availableCorpus.find(corpus => corpus.corpusName === corpusName);
    return selectedCorpus?.description || '';
  };

  return (
    <SettingsContext.Provider value={{ selectedCorpus, itemsToShow, setSelectedCorpus, setItemsToShow }}>
      <>
        <Button onClick={onOpen} variant="ghost" rightIcon={<Icon as={FaCog} />} />
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Settings</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Switch isChecked={darkTheme} onChange={handleDarkThemeChange} />
              <FormControl>
                <FormLabel>Available Corpora</FormLabel>
                <Select value={selectedCorpus} onChange={handleCorpusChange}>
                  {availableCorpus.map(corpus => (
                    <option key={corpus.corpusName} value={corpus.corpusName}>
                      {corpus.corpusName}
                    </option>
                  ))}
                </Select>
                <Text>{getCorpusDescription(selectedCorpus)}</Text>
              </FormControl>
              <FormControl>
                <FormLabel>Items to show:</FormLabel>
                <RadioGroup value={itemsToShow.toString()} onChange={handleItemsToShowChange}>
                  <Stack direction="row">
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                  </Stack>
                </RadioGroup>
              </FormControl>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    </SettingsContext.Provider>
  );
};

export default Settings;
