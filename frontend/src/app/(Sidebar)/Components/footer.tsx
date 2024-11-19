
import React from 'react'
import {  mdiEmail, mdiMapMarker, mdiPhone } from "@mdi/js";
import Icon from "@mdi/react";


const Footer = () => {
  return (
    <div className='xl:p-16 p-10 xl:bg-primary bg-white flex flex-col gap-10' >
      <div className=''><p className='text-2xl xl:text-white text-primary font-bold  shadow-sm'>Well Career</p> </div>
      <div className='grid grid-cols-2 gap-8 xl:text-[#CBE8FF] text-primary '>
        <div className='flex gap-2'>
          <div className='rounded-full text-primary px-1 flex items-center bg-white  '>
            <Icon path={mdiMapMarker} size={2} className='md:inline hidden'/>
            <Icon path={mdiMapMarker} size={1.5} className='md:hidden'/>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='max-sm:text-sm'>Adresse</p>
            <p className='max-sm:text-[9px]'>Lot 399 Tahar Bouchet, Tixeraïne, Birkhadem 16330</p>
          </div>
        </div>
        <div className='flex gap-2'>
          <div className='rounded-full text-primary px-1 flex items-center bg-white  '>
            <Icon path={mdiPhone} size={2} className='md:inline hidden'/>
            <Icon path={mdiPhone} size={1.5} className='md:hidden'/>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='max-sm:text-sm'>Tel</p>
            <p className='max-sm:text-xs'>+213 560 84 62 31</p>
          </div>
        </div>
        <div className='flex gap-2'>
          <div className='rounded-full text-primary px-1 flex items-center bg-white  '>
            <Icon path={mdiPhone} size={2} className='md:inline hidden'/>
            <Icon path={mdiPhone} size={1.5} className='md:hidden'/>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='max-sm:text-sm'>Fixe</p>
            <p className='max-sm:text-xs'>+213 23 45 34 61</p>
          </div>
        </div>
        <div className='flex gap-2'>
          <div className='rounded-full text-primary px-1 flex items-center bg-white  '>
            <Icon path={mdiEmail} size={2} className='md:inline hidden'/>
            <Icon path={mdiEmail} size={1.2} className='md:hidden'/>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='max-sm:text-sm'>E-mail</p>
            <p className='max-sm:text-[9px]'>l.ziane@wellpharmagroup.com</p>
          </div>
        </div>
      </div>  
      <div className='xl:text-xl text-sm xl:text-white text-primary font-light'><p>© Copyright Wellpharma 2024 Tous droits réservés</p></div>

      
    </div>
  )
}

export default Footer
