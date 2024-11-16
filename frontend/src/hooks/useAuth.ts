import { cookies } from "next/headers";

export const useAuth = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access");
  
  const isAuthenticated = accessToken !== undefined;

  return { isAuthenticated };
};
