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
import { addHobby, getHobbies } from "@/data/profile";
import { Hobby } from "@/types";

interface HobbyModalProps{
  isOpen: boolean;
  onClose: () => void;
  employeId: string;
}

const HobbyModal : React.FC<HobbyModalProps> = ({
  isOpen,
  onClose,
  employeId,
})=>{
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedHobby, setSelectedHobby] = useState<string>("");

  const onInputChange = (value: string) => {
    setSelectedHobby(value)
  };

  const onSelectionChange = (key: any) => {
    setSelectedHobby(key);
  };

  useEffect(() => {
    if (isOpen) fetchHobbies();
  }, [isOpen]);

  const fetchHobbies = async () => {
    setLoading(true);
    try {
      const data: Hobby[] | null = await getHobbies();
      setHobbies(data ? data.map(hobby => ({id: hobby.id , label: hobby.label})) : []);
    } catch (error) {
      console.log("Error during fetching skills: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (selectedHobby) {
      addHobby({label : selectedHobby,employe : employeId});
    }
    onClose();
  };
  return(
    <Modal isOpen={isOpen} onClose={onClose} closeButton>
      <ModalContent>
        <ModalHeader className="flex justify-center">
          <h4>Select Your Hobby</h4>
        </ModalHeader>
        <ModalBody>
          {loading ? (
            <span>Loading...</span>
          ) : (
            <Autocomplete
              allowsCustomValue
              label="Find Hobbies"
              className="w-full"
              onInputChange={onInputChange}
              onSelectionChange={onSelectionChange}
            >
              {hobbies.map((hobby) => (
                <AutocompleteItem
                  key={hobby.id}
                  onClick={() => setSelectedHobby(hobby.label)}
                >
                  {hobby.label}
                </AutocompleteItem>
              ))}
              
            </Autocomplete>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" onPress={handleSave} disabled={!selectedHobby}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
export default HobbyModal;