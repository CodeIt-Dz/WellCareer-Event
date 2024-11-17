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
    { name: "Home", link: "/" },
    { name: "Services", link: "/" },
    { name: "Domaine", link: "/" },
    { name: "Contact Us", link: "/" },
  ]

  const pathname = usePathname()

  return (
    <nav className="p-2 shadow-none  top-0 bg-white z-50">
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
                className={`text-lg lg:text-lg  font-bold ${
                  pathname === item.link ? "text-black" : "text-gray-500 hover:text-primary"
                } transition duration-300 ease-in-out whitespace-nowrap`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <Button size="lg" color="primary" radius="sm" className="text-md text-white font-bold px-8 py-2">Get in Touch</Button>


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
          
        </div>
      )}
    </nav>
  )
}