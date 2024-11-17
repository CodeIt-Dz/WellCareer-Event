import Logo from '@/components/logo'
import React from 'react'
import {  mdiFacebook, mdiGooglePlus, mdiInstagram, mdiLinkedin } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";


const Footer = () => {
  return (
    <div className='p-16 bg-primary flex flex-col gap-10' >
      <div className=''><p className='text-4xl text-white font-bold  shadow-sm'>Well Career</p> </div>
      <div className='flex justify-end gap-8 text-[#CBE8FF]'>
        <Link href={"/"}>
          <Icon path={mdiFacebook} size={1.8} />
        </Link>
        <Link href={"/"}>
          <Icon path={mdiInstagram} size={1.8} />
        </Link>
        <Link href={"/"}>
          <Icon path={mdiLinkedin} size={1.8} />
        </Link>
        <Link href={"/"}>
          <Icon path={mdiGooglePlus} size={1.8} />
        </Link>
      </div>
      <div className='text-2xl text-white font-light'><p>© Copyright Wellpharma 2024 Tous droits réservés</p></div>

      
    </div>
  )
}

export default Footer
