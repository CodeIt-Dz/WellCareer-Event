'use client'

import { usePathname } from 'next/navigation'
import Navbar from "@/components/navbar"
import { Toaster } from "react-hot-toast"
import Footer from '../(Sidebar)/Components/footer'

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = pathname.startsWith('/auth/register') || pathname.startsWith('/auth/login')

  return (
    <>
      <Toaster />
      {!isAuthPage && <Navbar />}
      <main>{children}</main>
      {!isAuthPage && <Footer />}
    </>
  )
}