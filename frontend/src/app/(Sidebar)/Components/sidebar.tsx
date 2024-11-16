"use client";
import { CardContent } from "@/components/ui/card";
import SidebarButton from "@/components/ui/sidebar_button";
import { Logout } from "@/lib/api";
import {
  mdiBookOutline,
  mdiCog,
  mdiHome,
  mdiLogout,
  mdiViewGrid,
} from "@mdi/js";
import Icon from "@mdi/react";
import { Card, CardBody } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

type SidebarProps = {
  className?: string;
};

type Path = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const Sidebar = ({
  className,
}: SidebarProps) => {
  const router = useRouter();
  const handleClick = () => {
    Logout().then(() => {
      router.push("/");
    });
  };
  const pathname = usePathname();
  const paths: Path[] = [
    {
      href: "/profile",
      label: "Mon Profile",
      icon: <Icon path={mdiHome} size={1} />,
    },
    {
      href: "/application",
      label: "Mes Candidatures",
      icon: <Icon path={mdiViewGrid} size={1} />,
    },
    {
      href: "/saved",
      label: "Offres Sauvegardees",
      icon: <Icon path={mdiBookOutline} size={1} />,
    },
    {
      href: "/settings",
      label: "Parametres",
      icon: <Icon path={mdiCog} size={1} />,
    },
  ];
  return (
    <aside className={`${className} `}>
      <Card classNames={{
            // base: "shadow-[0_0_25px_-5px_rgba(170,170,170,0.3)]",

      }} className="min-h-[80vh] h-full bg-[#F7F7F7] ">
        <CardContent className="h-full">
          <CardBody className="flex h-full flex-col justify-between">
            <ul className="flex flex-col">
              {paths.map((path) => (
                <li key={path.href}>
                  <SidebarButton
                    isSelected={path.href === pathname}
                    startContent={path.icon}
                    href={path.href}
                  >
                    {path.label}
                  </SidebarButton>
                </li>
              ))}
            </ul>
            <SidebarButton
              startContent={<Icon path={mdiLogout} size={1} />}
              onClick={handleClick}
            >
              Log out
            </SidebarButton>
          </CardBody>
        </CardContent>
      </Card>
    </aside>
  );
};

export default Sidebar;
