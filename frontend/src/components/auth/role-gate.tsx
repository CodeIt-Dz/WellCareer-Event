// "use client";

// import { Roles } from "@prisma/client";

// import { FormError } from "@/components/form-error";
// import { useCurrentRole } from '@/hooks/use-current-role';

// interface RoleGateProps {
//   children: React.ReactNode;
//   allowedRoles: Roles[];
// };

// export const RoleGate = ({
//   children,
//   allowedRoles,
// }: RoleGateProps) => {
//   const role = useCurrentRole();

//   const isAllowed = allowedRoles.some((allowedRole) => {
//     if (role?.Type === allowedRole.Type) {
//       return true;
//     }
//   });
//   if (!isAllowed) {
//     return (
//       <FormError message="You do not have permission to view this content!" />
//     )
//   }

//   return (
//     <>
//       {children}
//     </>
//   );
// };
