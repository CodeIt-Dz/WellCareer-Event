"use client";

import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  headerTitle?: string;
};

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  headerTitle
}: CardWrapperProps) => {
  return (
    <Card className="w-[50vw] min-w-[400px] shadow-md bg-[#191c24] text-white border-[#191c24] px-8">
      <CardHeader>
        <Header label={headerLabel} title={headerTitle} />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>

      <CardFooter>
        <BackButton
          label={backButtonLabel}
          href={backButtonHref}
        />
      </CardFooter>
    </Card>
  );
};