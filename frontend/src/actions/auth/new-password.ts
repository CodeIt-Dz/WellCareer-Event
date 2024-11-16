"use server";

import * as z from "zod";

import { NewPasswordSchema } from "@/schema";
import { Backend } from "@/lib/helper";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing token!" };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  try {
    const { password } = validatedFields.data;

    const { data, status } = await Backend.post(
      "/profile/reset_password/",
      {
        body: {
          password,
          token,
        }
      }
    );
    if (status !== 200) {
      return { error: data.error };
    }
    console.log(data);
    return { success: "Password updated!" };
  } catch (error) {
    console.error((error as any).response.data.error);
    return { error: (error as any).response.data.error };
  }
};
