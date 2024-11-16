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
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { User } from "../sections";

type FormationsProps = {
  title: string;
  etablissement: string;
  start_date: Date;
  end_date: Date;
};

const FormationsSection = ({ user }: { user: User }) => {
  return (
    <section>
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-xl text-gray-600 font-semibold">Formations et diplomes</h1>
        <Button
          startContent={<Icon size={1} path={mdiPlus} />}
          color="primary"
          variant="solid"
        >
          Ajouter
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4 my-4">
        {user.diplomes?.map((item, index) => (
          <Card
            classNames={{
              base: "shadow-none bg-primaryBackground",
            }}
            key={index}
          >
            <CardContent>
              <CardHeader className="flex flex-row justify-between gap-4">
                <h2 className="text-lg text-[#333333]">{item.degree}</h2>
                <Button isIconOnly color="primary" variant="light">
                  <Icon path={mdiSquareEditOutline} size={1}  />
                </Button>
              </CardHeader>
              <CardBody>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row gap-2">
                    <Icon path={mdiDomain} size={1} color="#333333" />
                    <span className="text-[#333333]">{item.establishment}</span>
                  </div>
                  <div className=" flex flex-row justify-between ">
                    <div className="flex flex-row gap-4">
                      <Icon path={mdiCalendarMonthOutline} size={1} color="#333333" />
                      <span className="text-[#333333]">
                        {item.start_date} - {" "}
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

export default FormationsSection;
