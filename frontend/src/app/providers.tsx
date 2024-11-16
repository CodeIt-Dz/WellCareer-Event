// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
// import { LanguageProvider } from "@inlang/paraglide-js-adapter-next"

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      {/* <LanguageProvider></LanguageProvider> */}
      {children}
    </NextUIProvider>
  )
}