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
import { addSkill, getSkills } from "@/data/profile";
import { Skill } from "@/types";

interface SkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSkills: (selectedSkills: string[]) => void;
  employeId: string;
  existingSkills: string[];
}

const SkillModal: React.FC<SkillModalProps> = ({
  isOpen,
  onClose,
  onSelectSkills,
  employeId,
  existingSkills
}) => {
  const [skills, setSkills] = useState<{ label: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSkill, setSelectedSkill] = useState<string>("");

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const data: Skill[] | null = await getSkills();
      setSkills(data ? data.map(skill => ({ label: skill.label })) : []);
    } catch (error) {
      console.log("Error during fetching skills: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (selectedSkill) {
      onSelectSkills([selectedSkill]);
      addSkill({label : selectedSkill,employe : employeId});
    }
    onClose();
  };

  const onInputChange = (value: string) => {
    setSelectedSkill(value)
  };

  const onSelectionChange = (key: any) => {
    setSelectedSkill(key);
  };

  useEffect(() => {
    if (isOpen) fetchSkills();
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeButton>
      <ModalContent>
        <ModalHeader className="flex justify-center">
          <h4>Select Your Skills</h4>
        </ModalHeader>
        <ModalBody>
          {loading ? (
            <span>Loading...</span>
          ) : (
            <Autocomplete
              allowsCustomValue
              label="Find Skills"
              className="w-full"
              onInputChange={onInputChange}
              onSelectionChange={onSelectionChange}
            >
              {skills.map((skill) => (
                <AutocompleteItem
                  key={skill.label}
                  onClick={() => setSelectedSkill(skill.label)}
                >
                  {skill.label}
                </AutocompleteItem>
              ))}
              
            </Autocomplete>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" onPress={handleSave} disabled={!selectedSkill}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SkillModal;
