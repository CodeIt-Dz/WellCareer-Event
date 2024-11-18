'use client'

import { useState } from 'react'
import Logo from "./logo"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@nextui-org/react"
import { Menu, X } from 'lucide-react'
import {Avatar,Image} from "@nextui-org/react";




export default  function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  



  const navBarItems = [
    { name: "Home", link: "#home" },
    { name: "Services", link: "#services" },
    { name: "Domaine", link: "#domaine" },
    { name: "Contact Us", link: "#contact" },
  ];

  const pathname = usePathname()

  return (
    <nav className="p-2 shadow-none  top-0 bg-primary lg:bg-white z-50">
      <div className="flex items-center justify-between mx-2 sm:mx-4 lg:mx-12">

        <div className="hidden xl:flex-shrink-0 mr-4 ">
          <Logo />
        </div>
        <div className='mr-4 '>
          <Link href="/">
            <Image src="/logo.svg" alt="logo" width={200}  />
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="hidden lg:flex flex-grow items-center">
          <div className="flex items-center justify-center w-full mx-2 space-x-4 lg:space-x-8">
            {navBarItems.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className={`text-lg lg:text-lg  font-bold ${
                  pathname === item.link ? "text-black" : "text-gray-500  hover:text-primary"
                } transition duration-300 ease-in-out whitespace-nowrap`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <Button size="lg" color="primary" radius="sm" className="hidden lg:inline text-md text-white font-bold px-8 py-2">Get in Touch</Button>

        <div className="flex items-center gap-2 flex-shrink-0">
          
          {/* Hamburger menu for mobile and tablet */}
          <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile and tablet menu */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 pb-4">
          {navBarItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className={`block py-2 px-4 text-sm font-medium ${
                pathname === item.link ? "text-black" : "text-gray-500 hover:text-white"
              } transition duration-300 ease-in-out`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
            
          ))}
          <Button size="lg"  radius="sm" className=" lg:hidden text-md text-primary bg-white font-bold px-6 mt-4 ">Get in Touch</Button>
          
        </div>
      )}
    </nav>
  )
}