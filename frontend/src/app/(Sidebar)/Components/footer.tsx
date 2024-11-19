import Logo from '@/components/logo'
import React from 'react'
import {  mdiFacebook, mdiGooglePlus, mdiInstagram, mdiLinkedin } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";


const Footer = () => {
  return (
    <div className='xl:p-16 p-10 xl:bg-primary bg-white flex flex-col gap-10' >
      <div className=''><p className='text-2xl xl:text-white text-primary font-bold  shadow-sm'>Well Career</p> </div>
      
      <div className='xl:text-xl text-sm xl:text-white text-primary font-light'><p>© Copyright Wellpharma 2024 Tous droits réservés</p></div>

      
    </div>
  )
}

export default Footer
