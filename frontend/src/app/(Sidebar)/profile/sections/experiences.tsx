import { CardContent } from "@/components/ui/card";
import {
  mdiCalendarMonthOutline,
  mdiDomain,
  mdiPlus,
  mdiSquareEditOutline,
  mdiTagEdit,
  mdiTrashCan,
} from "@mdi/js";
import Icon from "@mdi/react";
import { Button, Card, CardBody, CardHeader, Input, Modal,ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter } from "@nextui-org/react";
import { User } from "../sections";
import { useState } from "react";





const ExperiencesSection = ({ user }: { user: User }) => {
  
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    // Function to open the modal
    const openModal = () => setIsModalOpen(true);
  
    // Function to close the modal
    const closeModal = () => setIsModalOpen(false);
  return (
    <section>
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-xl text-gray-600 font-semibold">Expériences</h1>
        <Button
          startContent={<Icon size={1} path={mdiPlus} />}
          color="primary"
          variant="solid"
          onClick={openModal}
        >
          Ajouter
        </Button>
        <Modal size="5xl" isOpen={isModalOpen} onClose={closeModal}>
        <ModalContent className="bg-secondary">
          <ModalHeader className="flex justify-center">
            <h3>Ajouter une Expérience</h3>
          </ModalHeader>
          <Input label="Title" fullWidth placeholder="Enter experience title" />
          <Input label="Etablissement" fullWidth placeholder="Enter etablissement" />
          <Input label="Start Date" fullWidth type="date" />
          <Input label="End Date" fullWidth type="date" />
          <ModalFooter className="flex justify-evenly ">
            <Button className="bg-red-500" onClick={closeModal}>
              Cancel
            </Button>
            <Button onClick={() => { /* Save logic here */ closeModal(); }}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </div>
      <div className="grid grid-cols-2 gap-4 my-4">
        {user.experiences?.map((item, index) => (
          <Card
            classNames={{
              base: "shadow-none bg-primaryBackground",
            }}
            key={index}
          >
            <CardContent>
              <CardHeader className="flex flex-row justify-between gap-4">
                <h2 className="text-lg text-[#333333]">{item.title}</h2>
                <Button isIconOnly color="primary" variant="light">
                  <Icon path={mdiSquareEditOutline} size={1} />
                </Button>
              </CardHeader>
              <CardBody>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row gap-2">
                    <Icon path={mdiDomain} size={1} color="#333333" />
                    <span className="text-[#333333]">{item.company}</span>
                  </div>
                  <div className=" flex flex-row justify-between ">
                    <div className="flex flex-row gap-4">
                      <Icon path={mdiCalendarMonthOutline} size={1} color="#333333" />
                      <span className="text-[#333333]">
                        {item.start_date} -{" "}
                        {item.end_date}
                      </span>
                    </div>
                    <Button isIconOnly color="primary" variant="light">
                      <Icon path={mdiTrashCan} size={1} color="#ff0000" />
                    </Button>
                  </div>
                </div>
              </CardBody>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ExperiencesSection;
