"use server";
import { getAccessToken } from "@/lib/api";
import { jwtDecode } from "jwt-decode";

interface User {
  user_id: number;
  email: string;
  full_name: string;
  // Add other user properties as needed
}

export async function getSession(): Promise<User | null> {
  
  let access = await getAccessToken()
  if (!access) {
    console.warn("No auth cookie found in the request");
    return null;
  }

  try {
    const decodedToken: User = jwtDecode(access);
    return decodedToken;
  } catch (error) {
    console.error("Failed to decode auth cookie:", error);
    return null;
  }
}


