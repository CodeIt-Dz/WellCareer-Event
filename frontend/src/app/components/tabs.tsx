
import clsx from "clsx"
import { createContext, HTMLProps, PropsWithChildren, ReactNode, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

type ComponentProps = {
    tabs: string[]
}


type State<T> = {
    state: T,
    setState: (value: T) => void
}

const context = createContext({ state: 0, setState: (value: number) => { } })

export function TabsView({ children }: PropsWithChildren) {
    const [state, setState] = useState(0)
    const s: State<number> = { state, setState }
    return (
        <context.Provider value={s}>
            {children}
        </context.Provider>
    )
}

export function TabsHead(props: HTMLProps<HTMLDivElement> & ComponentProps) {
    return (
        <context.Consumer>
            {
                s => {
                    return (
                        <div {...props} className={clsx("flex flex-col gap-8 font-semibold   ", props.className)} >
                            <h1 className="xl:text-5xl md:text-3xl font-bold m-3">Nos services</h1>
                            {
                                props.tabs.map((tab, index) => (
                                    <motion.button
                                        key={index}
                                        onClick={() => s.setState(index)} className={clsx(s.state == index ? "bg-primary text-white" : "bg-white", " xl:text-3xl md:text-xl  decoration-transparent border-none outline-none rounded-full text-start px-4 py-3 duration-200  transition-all")}>
                                        {tab}
                                    </motion.button>

                                ))
                            }

                        </div>
                    )
                }
            }
        </context.Consumer>
    )
}

export function TabsPage({ children }: { children: (value: number) => ReactNode }) {
    return (
        <context.Consumer>
            {
                page => (
                    children(page.state)
                )
            }
        </context.Consumer>
    )
}