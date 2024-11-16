"use client";
import {
  mdiCheck,
  mdiClose,
  mdiCross,
  mdiEmail,
  mdiMapMarker,
  mdiPhone,
} from "@mdi/js";
import Icon from "@mdi/react";
import { Avatar, Button, Chip } from "@nextui-org/react";
import { User } from "../sections";

type ChipType = {
  name: string;
  isActive: boolean;
};

const InfoPerso = ({ user }: { user: User }) => {
  const chips = [
    {
      name: "Service Militaire",
      isActive: user.military_service,
    },
    {
      name: "Permis de conduire",
      isActive: user.driving_license,
    },
    {
      name: "Passeport Valide",
      isActive: user.is_passport_valid,
    },
    {
      name: "Marriée",
      isActive: user.married,
    },
    {
      name: "Disponibilité immediate",
      isActive: user.is_immediate_available,
    },
  ];
  
  return (
    <section className="flex flex-col gap-4 my-6">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-xl text-gray-600 font-semibold">
          Informations personnelles
        </h1>
        <Button color="primary" variant="solid">
          Modifier
        </Button>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-4">
          <Avatar
            size="lg"
            classNames={{
              base: "border-2 border-white w-40 h-40",
            }}
            className="border-dashed"
            src="https://avatars.githubusercontent.com/u/4723117?v=4"
          />
          <div className="flex flex-col items-center justify-center gap-2">
            <span>
              {user.first_name} {user.last_name}
            </span>
            <div className=" flex flex-row items-center">
              <Icon path={mdiMapMarker} size={1} />
              <span className="text-wrap w-28 text-center font-semibold">{user.address}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 place-items-start gap-2  text-xs">
          {chips.map((chip, index) => (
            <span
              // variant="dot"
              // classNames={{
              //   base: "border-transparent",
              // }}
              // color={chip.isActive ? "success" : "danger"}
              className="flex flex-row gap-2  items-center"
              key={index}
            >
              <Icon
                path={chip.isActive ? mdiCheck : mdiClose}
                color="#000"
                size={0.8}
              />
              <div>{chip.name}</div>
            </span>
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-xl font-bold">Informations de contact</h1>
      </div>
      <ul className="flex flex-row  justify-evenly gap-8 w-full">
        <li className="flex flex-row gap-4">
          <Icon path={mdiPhone} size={1} />
          <span>{user.phone_number}</span>
        </li>
        <li className="flex flex-row gap-4">
          <Icon path={mdiEmail} size={1} />
          <span>{user.email}</span>
        </li>
      </ul>
    </section>
  );
};

export default InfoPerso;
