import availableCorpus from '@assets/dataSource/availableCorpus.json';
import {
  Grid,
  GridItem,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Radio,
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
import './Settings.css';

const Settings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [darkTheme, setDarkTheme] = useState(false);
  const [isHoveredOverIcon, setIsHoveredOverIcon] = useState(false);
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
        {/* TODO: icon spins as soon as mouse enters IconButton */}
        <IconButton
          sx={{
            background: 'transparent',
          }}
          aria-label="search button"
          onClick={onOpen}
          onMouseEnter={() => setIsHoveredOverIcon(true)}
          onMouseLeave={() => setIsHoveredOverIcon(false)}
          icon={<FaCog className={isHoveredOverIcon ? 'Settings-icon' : ''} />}
        />
        <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={'sm'}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Settings</ModalHeader>
            <ModalCloseButton />
            <ModalBody sx={{ paddingBottom: '32px' }}>
              <Grid templateRows="repeat(3, auto)" templateColumns="repeat(2, auto)" gap={2}>
                <GridItem rowStart={1} rowSpan={1} colStart={1} colSpan={1} justifySelf="end">
                  <Text as="b">Dark Theme</Text>
                </GridItem>
                <GridItem rowStart={1} rowSpan={1} colStart={2} colSpan={1}>
                  <Switch isChecked={darkTheme} onChange={handleDarkThemeChange} />
                </GridItem>
                <GridItem rowStart={2} rowSpan={1} colStart={1} colSpan={1} justifySelf="end">
                  <Text as="b">Available Corpora</Text>
                </GridItem>
                <GridItem rowStart={2} rowSpan={1} colStart={2} colSpan={1}>
                  <Select value={selectedCorpus} onChange={handleCorpusChange} size="xs">
                    {availableCorpus.map(corpus => (
                      <option key={corpus.corpusName} value={corpus.corpusName}>
                        {corpus.corpusName}
                      </option>
                    ))}
                  </Select>
                  <Text>{getCorpusDescription(selectedCorpus)}</Text>
                </GridItem>
                <GridItem rowStart={3} rowSpan={1} colStart={1} colSpan={1} justifySelf="end">
                  <Text as="b">Items to show</Text>
                </GridItem>
                <GridItem rowStart={3} rowSpan={1} colStart={2} colSpan={1}>
                  <RadioGroup value={itemsToShow.toString()} onChange={handleItemsToShowChange} size="sm">
                    <Stack direction="row">
                      <Radio value="5">5</Radio>
                      <Radio value="10">10</Radio>
                      <Radio value="15">15</Radio>
                    </Stack>
                  </RadioGroup>
                </GridItem>
              </Grid>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    </SettingsContext.Provider>
  );
};

export default Settings;
