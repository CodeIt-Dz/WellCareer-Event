import { mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { Button,Chip,} from "@nextui-org/react";
import { User } from "../sections";
import SkillModal from "@/app/(Sidebar)/Components/skills-modal"
import { useEffect, useState } from "react";
import { removeSkillFromEmploye } from "@/data/profile";


const CompetencesSection = ({ user }: { user: User }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userSkills, setUserSkills] = useState<string[]>(user.skills?.map(skill => skill.id));

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSelectSkills = (selectedSkills: string[]) => {
    setUserSkills(selectedSkills);
  };

  const handleRemoveSkill = async (skillId: string) => {
    try {
      await removeSkillFromEmploye(user.id, skillId); // Call backend function to remove skill
      setUserSkills((prevSkills) => prevSkills.filter(id => id !== skillId)); 
    } catch (error) {
      console.error("Error removing skill:", error); // Handle error
      // Optionally, you might want to notify the user of the error
    }
  };
  useEffect(() => {
      setUserSkills(user.skills?.map(skill => skill.id)); // Sync the local state with the user prop
  }, [user.skills]);
  return (
    <section>
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-xl text-gray-600 font-semibold">Compétences</h1>
        <Button
          startContent={<Icon size={1} path={mdiPlus} />}
          color="primary"
          variant="solid"
          onPress={openModal}
        >
          Ajouter
        </Button>
        <SkillModal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          onSelectSkills={handleSelectSkills} 
          employeId={user.id} 
          existingSkills={user.skills?.map(skill => skill.label)}>
        </SkillModal>
      </div>
      <div className="grid place-items-center grid-cols-6 gap-4 p-8">
        {user.skills?.map((item, index) => (
          <Chip
            key={item.id}
            color="primary"
            variant="flat"
            size="lg"
            onClose={() => handleRemoveSkill(item.id)}
          >
            {item.label}
          </Chip>
        ))}
      </div>
    </section>
  );
};

export default CompetencesSection;
