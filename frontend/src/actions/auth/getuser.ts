"use server"

import { Backend } from "@/lib/helper";

export async function getUser(user_id: any) {
    const { data } = await Backend.get(`/employe/${user_id}/`, {});
    return data
}