"use client";

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  id: number;
  email: string;
  // Add other user properties as needed
}

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUserFromCookie = () => {
      const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("auth="));
      if (!cookie) return null;

      const authCookie = cookie.split("=")[1];
      try {
        const decodedAuthCookie = decodeURIComponent(authCookie);
        const { access } = JSON.parse(decodedAuthCookie);
        const decodedToken: User = jwtDecode(access);
        return decodedToken;
      } catch (error) {
        console.error("Failed to decode auth cookie:", error);
        return null;
      }
    };

    const currentUser = getUserFromCookie();
    setUser(currentUser);
  }, []);

  return user;
};
