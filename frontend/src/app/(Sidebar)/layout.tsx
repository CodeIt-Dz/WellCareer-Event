import { Card, CardBody } from "@nextui-org/react";
import Sidebar from "./Components/sidebar";
import { CardContent } from "@/components/ui/card";

const ProfileLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex lex-row justify-between m-8 gap-8">
      <Sidebar className="flex-1 " />
      <main className="flex-[4]">
        <Card>
          <CardContent className="bg-[#F7F7F7] min-h-[100dvh]" >
            <CardBody   >{children}</CardBody>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ProfileLayout;
