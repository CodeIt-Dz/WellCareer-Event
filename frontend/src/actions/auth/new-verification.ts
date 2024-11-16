"use server";

import { Backend } from "@/lib/helper";

export const newVerification = async (token: string) => {
    try {
        const { data, status } = await Backend.post(
            "/employe/confirm_registration/",
            {
                body: {
                    token,
                }
            }

        );
        if (status !== 200) {
            return { error: data.error };
        }
    } catch (error) {
        console.error((error as any).response.data.error);
        return { error: (error as any).response.data.error };
    }

    return { success: "Email verified!" };
};
