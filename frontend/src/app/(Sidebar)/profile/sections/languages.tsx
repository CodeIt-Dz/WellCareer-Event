import { mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { Button, Chip } from "@nextui-org/react";
import { User } from "../sections";

const LanguesSection = ({ user }: { user: User }) => {
  return (
    <section>
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-xl text-gray-600 font-semibold">Langues</h1>
        <Button
          startContent={<Icon size={1} path={mdiPlus} />}
          color="primary"
          variant="solid"
        >
          Ajouter
        </Button>
      </div>
      <div className="flex flex-wrap gap-4 p-8 justify-start">
        {user.languages?.map((item, index) => (
          <Chip key={index} color="primary" variant="flat" size="lg" onClose={() => console.log("close")}>{item.label} {item.level}</Chip>
        ))}
      </div>
    </section>
  );
};

export default LanguesSection;
