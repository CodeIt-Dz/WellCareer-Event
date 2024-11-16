import { mdiAlert } from '@mdi/js';
import Icon from '@mdi/react';
interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <Icon path={mdiAlert} size={1} />
      <p>{message}</p>
    </div>
  );
};
