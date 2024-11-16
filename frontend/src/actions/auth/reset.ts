"use server";

import * as z from "zod";

import { ResetSchema } from "@/schema";
import { v4 as uuidv4 } from "uuid";
import { Backend } from "@/lib/helper";
export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid emaiL!" };
  }
  try {
    const { email } = validatedFields.data;
    const base_url = process.env.NEXT_PUBLIC_BASE_URL;
    const token = uuidv4();
    const { data, status } = await Backend.post(
      "/profile/ask_reset_password_token/",
      {
        body: {
          email,
          token,
          link: `${base_url}/auth/new-password?token=${token}`,
        }
      }
    );
    if (status !== 200) {
      return { error: data.error };
    }

    return { success: "Reset email sent!" };
  } catch (error) {
    console.error((error as any).response.data.error);
    return { error: (error as any).response.data.error };
  }
};
