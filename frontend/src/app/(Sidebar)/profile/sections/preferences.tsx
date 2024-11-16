import { Button } from "@nextui-org/react";
import { User } from "../sections";

type PreferencesProps = {
  title: string;
  data: string[];
};
const PreferencesSection = ({ user }: { user: User }) => {
  const preferences: PreferencesProps[] = [
    {
      title: "Secteur d'activité souhaité :",
      data: [user.domainactivity],
    },
    {
      title: "Salaire souhaité :",
      data: [user.wished_salary ?? 'N/A'],
    },
    {
      title: "Mobilité :",
      data: [user.mobility],
    },
    {
      title: "Métier :",
      data: [user.profession],
    },
    {
      title: "Situation actuelle :",
      data: [user.current_situation],
    },
  ];
  return (
    <section>
      <div className="flex flex-row justify-between my-4">
        <h2 className="text-xl text-gray-600 font-semibold">
          Préférences de recrutement
        </h2>
        <Button color="primary" variant="solid">
          Modifier
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {preferences?.map((preference, index) => (
          <div key={index}>
            <h3 className="text-sm">{preference.title}</h3>
            <ul className="flex flex-row gap-8 text-blue-800">
              {preference.data.map((data, index) => (
                <li className="text-xs" key={index}>{data}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PreferencesSection;
