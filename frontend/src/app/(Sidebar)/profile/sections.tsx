"use client";
import { getSession } from "@/data/session";
import { mdiAccessPointOff } from "@mdi/js";
import Icon from "@mdi/react";
import { Chip, Divider, Tab, Tabs } from "@nextui-org/react";
import InfoPerso from "./sections/info";
import Preferences from "./sections/preferences";
import ExperiencesSection from "./sections/experiences";
import FormationsSection from "./sections/formations";
import CompetencesSection from "./sections/competences";
import LanguagesSection from "./sections/languages";
import HobbiesSection from "./sections/hobbies"
import {Language,Diplome,Experience} from "@/types/index"


export type User = {
  id: string;
  last_login: string | null;
  date_joined: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  gender: string;
  address: string;
  birth_date: string;
  wished_salary: string | null;
  military_service: boolean;
  married: boolean;
  driving_license: boolean;
  owns_vehicle: boolean;
  is_passport_valid: boolean;
  current_situation: string;
  is_immediate_available: boolean;
  mobility: string;
  diplomes: Diplome[];
  experiences: Experience[];
  hobbies : Array<{
    id : string;
    label : string
  }>;
  skills: Array<{
    id:string;
    label:string;
  }>;
  languages:  Array<{
    id : string;
    label : string;
    level : string;
  }>;
  profession:string;
  domainactivity:string;
};

export default function Sections({ user }: { user: User }) {
  return (
    <Tabs
      aria-label="Options"
      color="danger"
      variant="underlined"
      classNames={{
        tabList:
          "gap-6 w-full relative rounded-none p-0 border-b border-transparent",
        cursor: "w-full bg-[#591FCE]",
        tab: "max-w-fit px-0 h-12 border-b border-gray-300",
        tabContent: "group-data-[selected=true]:text-[#591FCE]",
      }}
    >
      <Tab
        key="infos"
        title={
          <div className="flex items-center space-x-2">
            <span>Informations personnelles</span>
          </div>
        }
      >
        <InfoPerso user={user} />
        <Divider className="bg-primaryBackground h-1 rounded-full my-6" />
        <Preferences user={user} />
        <Divider className="bg-primaryBackground h-1 rounded-full my-6" />
        <ExperiencesSection user={user} />
        <Divider className="bg-primaryBackground h-1 rounded-full my-6" />
        <FormationsSection user={user} />
        <Divider className="bg-primaryBackground h-1 rounded-full my-6" />
        <HobbiesSection user={user} />
        <Divider className="bg-primaryBackground h-1 rounded-full my-6" />
        <CompetencesSection user={user} />
        <Divider className="bg-primaryBackground h-1 rounded-full my-6" />
        <LanguagesSection user={user} />
      </Tab>
      <Tab
        key="recrutement"
        title={
          <div className="flex items-center space-x-2">
            <span>Préférences de recrutement</span>
          </div>
        }
      />
      <Tab
        key="Experiences"
        title={
          <div className="flex items-center space-x-2">
            <span>Expériences</span>
          </div>
        }
      />
      <Tab
        key="Formations"
        title={
          <div className="flex items-center space-x-2">
            <span>Formations et diplomes</span>
          </div>
        }
      />
      <Tab
        key="Langues"
        title={
          <div className="flex items-center space-x-2">
            <span>Langues</span>
          </div>
        }
      />
    </Tabs>
  );
}
