"use client"

import { ButtonHTMLAttributes } from "react"
import { Button } from "./ui/button"
import { useRouter } from "nextjs-toploader/app"

type Props = {
    route: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function RouteButton(props: Props) {
    const router = useRouter()

    return (
        <Button {...props} onClick={() => router.replace(props.route)}>
            {props.children}
        </Button>
    )
}