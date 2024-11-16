import { CardWrapper } from "@/components/auth/card-wrapper";
import Icon from "@mdi/react";
import { mdiAlert } from "@mdi/js";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full flex justify-center items-center">
      <Icon path={mdiAlert} size={1} />
      </div>
    </CardWrapper>
  );
};
