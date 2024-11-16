"use client";

import { Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { useRouter } from "nextjs-toploader/app"
import { revalidatePath } from "next/cache";
import { Logout } from "@/lib/api";

export default function LogoutButton() {
    const [isPending, startTransition] = useTransition();
    //   const pathName = usePathname();
    const router = useRouter();
    const handleLogout = () => {
        startTransition(async () => {
            await Logout()
            router.push("/");
        });
    };

    return (
        <Button isLoading={isPending} onClick={handleLogout}>
            Logout
        </Button>
    );
};