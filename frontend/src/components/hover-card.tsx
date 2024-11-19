import { mdiAccountSearch } from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";

type HoverCardProps = {
  title: string;
  description: string;
  icon: string; // Assuming the icon is a string (like the mdi path)
  width?: string; // Optional, default value is set in the component
};

const HoverCard: React.FC<HoverCardProps> = ({ title, description, icon, width = "w-64" }) => {
  return (
    <div
      className={`p-4 border rounded-lg text-center bg-[#EAE9FF] transition-all duration-700 ease-in-out transform scale-100 ${width} `}
    >
      <div className="flex justify-center mb-2">
        <Icon path={icon} size={2} className="text-primary" />
      </div>
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
    </div>
  );
};

export default HoverCard;
