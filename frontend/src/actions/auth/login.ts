"use server";

import * as z from "zod";

import { LoginSchema } from "@/schema";

import { DEFAULT_LOGIN_REDIRECT } from "@/data/routes";
import { cookies, headers } from "next/headers";
import { Backend } from "@/lib/helper";
import { encode } from "@auth/core/jwt"

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  try {
  
    const { email, password } = validatedFields.data;
    const { data, status }: {
      data: {
        access: string,
        refresh: string
        error: any,
      },
      status: number
    } = await Backend.post('/employe/login/', {
      body: {
        email,
        password
      }
    })

    if (status !== 200) {
      return { error: data.error };
    }
    // Set the authentication cookies
    const cookieStore = cookies();
    cookieStore.set("access", data.access);
    cookieStore.set("refresh", data.refresh);
  } catch (error) {
    console.error("Login error:", error);
    // Handle different error types
    const errorMessage = (error as any).response?.data?.error || "Login failed. Please try again.";
    return { error: errorMessage };
  }
  return { success: "Logged in!" };
};
