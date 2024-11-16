import { mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { Button, Chip } from "@nextui-org/react";
import { User } from "../sections";
import HobbyModal from "../../Components/hobby-modal";
import { useEffect, useState } from "react";
import { removeHobbyFromEmploye } from "@/data/profile";

const HobbiesSection = ({ user }: { user: User }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <section>
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-xl text-gray-600 font-semibold">Loisirs</h1>
        <Button
          startContent={<Icon size={1} path={mdiPlus} />}
          color="primary"
          variant="solid"
          onClick={openModal}
        >
          Ajouter
        </Button>
        <HobbyModal 
          isOpen={isModalOpen} 
          onClose={closeModal}  
          employeId={user.id} 
        >
        </HobbyModal>
        
      </div>
      <div className="flex flex-wrap gap-4 p-8 justify-start">
        {user.hobbies?.map((item, index) => (
          <Chip
            key={item.id}
            color="primary"
            variant="flat"
            size="lg"
            onClose={() => removeHobbyFromEmploye(user.id,item.id)}
          >
            {item.label}
          </Chip>
        ))}
      </div>
    </section>
  );
};

export default HobbiesSection;
