"use server";

import { jwtDecode } from "jwt-decode";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BASE_URL } from "./constant";
import { Backend } from "./helper";

const TOKEN_EXPIRE_LOOKAHEAD = 60;

interface AuthCookie {
  access: string;
  refresh: string;
}

export async function Logout() {
  cookies().delete("access");
  cookies().delete("refresh");
  revalidateTag("user");
}

async function refreshToken(refresh: string) {
  const {
    data,
  }: {
    data: {
      access: string;
      refresh: string;
    };
  } = await Backend.post("/token/refresh/", {
    body: { refresh },
  });
  cookies().set("access",  (data.access));
  cookies().set("refresh",  (data.refresh));
  return data.access;
}

export async function getAccessToken() {
  if (!cookies().get("access")?.value || !cookies().get("refresh")?.value)
    return null;
  let access = (cookies().get("access")?.value!);
  const refresh = (cookies().get("refresh")?.value!);
  if (!access && !refresh) return null;
  const decodedJwt = jwtDecode(access!);
  if (decodedJwt.exp) {
    if (decodedJwt.exp - (Date.now() / 1000 + TOKEN_EXPIRE_LOOKAHEAD) < 0) {
      // ANCHOR: Expired, refreshing
      access = await refreshToken(refresh!);
    }
    return access;
  }
  return null;
}

export async function myFetch(
  endpoint: string,
  options: FetchOptions & { method: "GET" | "POST" | "DELETE" }
) {
  return fetch(`${BASE_URL}${endpoint}`, {
    method: options.method,
    headers: {
      ...(options.withCredentials
        ? { Authorization: `Bearer ${await getAccessToken()}` }
        : undefined),
      ...options.headers,
    },
    ...(options.body ? { body: options.body } : undefined),
    next: {
      tags: options.tags,
    },
  });
}

export async function getUser(user_id: number) {
  const { data } = await Backend.get(`/employe/${user_id}`, {
    withCredentials: true,
    tags: ["user"],
  });
  return data;
}

interface FetchOptions {
  body?: any;
  withCredentials?: boolean;
  headers?: HeadersInit;
  tags?: string[];
}
