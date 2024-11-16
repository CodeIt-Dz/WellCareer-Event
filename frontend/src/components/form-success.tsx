import Icon from "@mdi/react";
import { mdiAlert, mdiCheck } from "@mdi/js";
interface FormSuccessProps {
  message?: string;
};

export const FormSuccess = ({
  message,
}: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <Icon path={mdiCheck} size={1} />
      <p>{message}</p>
    </div>
  );
};