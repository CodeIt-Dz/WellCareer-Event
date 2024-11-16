import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function POST(
    req: NextRequest
) {
    cookies().delete("auth")
    return new NextResponse()
}