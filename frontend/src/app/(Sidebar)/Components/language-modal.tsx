import { useState, useEffect } from "react";
import {
  Modal,
  Button,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  Autocomplete,
  AutocompleteItem
} from "@nextui-org/react";

import { addLanguages , getLanguage } from "@/data/profile";



import { Language } from "@/types";

interface LanguageModalProps{
  isOpen: boolean;
  onClose: () => void;
  employeId: string;
}

const HobbyModal : React.FC<LanguageModalProps> = ({
  isOpen,
  onClose,
  employeId,
})=>{
    
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");

  const onInputChange = (value: string) => {
    setSelectedLanguage(value)
  };

  const onSelectionChange = (key: any) => {
    setSelectedLanguage(key);
  };

  useEffect(() => {
    if (isOpen) fetchLanguages();
  }, [isOpen]);

  const fetchLanguages = async () => {
    setLoading(true);
    try {
      const data: Language[] | null = await getLanguage();
      setLanguages(data ? data.map(language => ({id: language.id , label: language.label, level:language.level })) : []);
    } catch (error) {
      console.log("Error during fetching skills: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (selectedLanguage && selectedLevel ) {
        addLanguages({label : selectedLanguage,level : selectedLevel , employe : employeId});
    }
    onClose();
  };
  return(
    <Modal isOpen={isOpen} onClose={onClose} closeButton>
      <ModalContent>
        <ModalHeader className="flex justify-center">
          <h4>Select Language</h4>
        </ModalHeader>
        <ModalBody>
          {loading ? (
            <span>Loading...</span>
          ) : (
            <div>
                <Autocomplete
                allowsCustomValue
                label="Find Language"
                className="w-full"
                onInputChange={onInputChange}
                onSelectionChange={onSelectionChange}
                >
                {languages.map((language) => (
                    <AutocompleteItem
                    key={language.id}
                    onClick={() => setSelectedLanguage(language.label)}
                    >
                    {language.label}
                    </AutocompleteItem>
                ))}
                
                </Autocomplete>
                <Autocomplete
                    allowsCustomValue
                    label="Level"
                    className="w-full"
                    onInputChange={onInputChange}
                    onSelectionChange={onSelectionChange}
                    >
                    {languages.map((language) => (
                        <AutocompleteItem
                        key={language.id}
                        onClick={() => setSelectedLanguage(language.label)}
                        >
                        {language.label}
                        </AutocompleteItem>
                    ))}
                
                </Autocomplete>
            </div>
            
            
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" onPress={handleSave} disabled={!selectedLanguage && !selectedLevel}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
export default HobbyModal;