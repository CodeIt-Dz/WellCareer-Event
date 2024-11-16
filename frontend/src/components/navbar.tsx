'use client'

import { useState } from 'react'
import Logo from "./logo"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@nextui-org/react"
import { Menu, X } from 'lucide-react'
import {Avatar} from "@nextui-org/react";




export default  function Navbar( {isAuthenticated} : {isAuthenticated:boolean} ) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  



  const navBarItems = [
    { name: "Accueil", link: "/" },
    { name: "Trouver un emploi", link: "/offer" },
    { name: "Découvrir les entreprises", link: "/companies" },
    { name: "Créer un CV professionnel", link: "/cv" },
    { name: "Formation", link: "/courses" }
  ]

  const pathname = usePathname()

  return (
    <nav className="p-2 shadow-md shadow-gray-200 sticky top-0 bg-white z-50">
      <div className="flex items-center justify-between mx-2 sm:mx-4 lg:mx-12">

        <div className="flex-shrink-0 mr-4">
          <Logo />
        </div>

        {/* Desktop menu */}
        <div className="hidden xl:flex flex-grow items-center">
          <div className="flex items-center justify-center w-full mx-2 space-x-4 lg:space-x-8">
            {navBarItems.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className={`text-xs lg:text-sm font-medium ${
                  pathname === item.link ? "text-primary" : "text-gray-500 hover:text-primary"
                } transition duration-300 ease-in-out whitespace-nowrap`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        { !isAuthenticated ? (<div className="flex items-center gap-2 flex-shrink-0">
          <Link href={'/'} className="hidden sm:inline-block text-xs lg:text-sm font-semibold bg-gradient-to-r from-[#22E5BB] to-[#423BCA] bg-clip-text text-transparent whitespace-nowrap">
            Espace recruteur
          </Link>
          <Link href="/auth/login" passHref className="hidden sm:inline-block">
            <Button className="text-xs lg:text-sm rounded-3xl text-white bg-gradient-to-r from-[#22E5BB] to-[#423BCA] px-2 py-1 lg:px-4 lg:py-2">
              Se connecter
            </Button>
          </Link>
          {/* Hamburger menu for mobile and tablet */}
          <button className="xl:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>) : (
          <div className='flex gap-1'>
            {/* <span> {user?.full_name} </span> */}
          <Link href="/profile" passHref className="hidden sm:inline-block">
            <Avatar isBordered radius="md" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
           </Link>
        </div>
        )}

      </div>

      {/* Mobile and tablet menu */}
      {isMenuOpen && (
        <div className="xl:hidden mt-4 pb-4">
          {navBarItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className={`block py-2 px-4 text-sm font-medium ${
                pathname === item.link ? "text-primary" : "text-gray-500 hover:text-primary"
              } transition duration-300 ease-in-out`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="mt-4 px-4 sm:hidden">
            <Link href={'/'} className="block mb-2 text-sm font-semibold bg-gradient-to-r from-[#22E5BB] to-[#423BCA] bg-clip-text text-transparent">
              Espace recruteur
            </Link>
            <Link href="/auth/signing" passHref>
              <Button className="w-full text-sm rounded-3xl text-white bg-gradient-to-r from-[#22E5BB] to-[#423BCA]">
                Se connecter
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}