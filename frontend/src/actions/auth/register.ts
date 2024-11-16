"use server";

import * as z from "zod";

import { RegisterSchema } from "@/schema";
import { DEFAULT_LOGIN_REDIRECT } from "@/data/routes";
import { v4 as uuidv4 } from "uuid";
import { BASE_URL } from "@/lib/constant";
import { Backend } from "@/lib/helper";
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  try {
    const user_data = validatedFields.data;
    const { birth_date } = user_data;
    const date = birth_date.toISOString().split("T")[0];
    const [year, month, day] = date.split("-");
    const formattedDate = `${year}-${month}-${day}`;
    const token = uuidv4();
    const { data, status } = await Backend.post("/employe/", {
      body: {
        ...user_data,
        birth_date: formattedDate,
        link: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/new-verification?token=${token}`,
        token: token,
      }
    });
    if (status === 400) {
      return { error: data.error };
    }
    if (status === 201) {
      return { success: data.message, expiration: data.expiration };
    }
    return { error: "An error occurred!, please try again later" };
  } catch (error) {
    console.error((error as any).response.data.error);
    return { error: (error as any).response.data.error };
  }
};
