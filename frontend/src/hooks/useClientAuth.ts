import { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface UseAuth {
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const useClientAuth = (): UseAuth => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get("access");
      setIsAuthenticated(!!token); // Set authenticated state based on token presence
      setLoading(false); // Set loading to false after checking
    };

    checkAuth();

    // Optionally, add an event listener for token changes if using an authentication library that handles this
    // Example: window.addEventListener('storage', checkAuth);

    // Cleanup function if needed
    // return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const login = (token: string) => {
    Cookies.set("access", token, { expires: 1 }); // Sets token with 1-day expiration
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("access");
    setIsAuthenticated(false);
  };

  return { isAuthenticated, loading, login, logout };
};
