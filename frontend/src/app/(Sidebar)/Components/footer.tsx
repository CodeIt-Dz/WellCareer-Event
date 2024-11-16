import Logo from '@/components/logo'
import React from 'react'
import { mdiEmail, mdiMapMarker, mdiPhone } from "@mdi/js";
import Icon from "@mdi/react";
import { Divider } from "@nextui-org/react";
import Link from "next/link";


const Footer = () => {
  return (
    <footer className='p-12 bg-[rgba(160,156,233,0.1)]' >
      <div className='flex justify-evenly' >
        <div className='flex flex-col gap-4' >
          <div className='self-center' >
            <Logo/>
          </div>
          
          <div className='flex items-center gap-1' >
          <Icon path={mdiMapMarker} size={1} className="text-primary" />
          <div className="text-[#333333] text-[13px]">Lot 399 Tahar Bouchet, Tixeraïne, Birkhadem 16330</div>
          </div>

      <div className='flex gap-4' >
          <div className='flex items-center gap-1'>
            <Icon path={mdiPhone} size={1} className="text-primary"/>
            <span className="text-[#333333] text-[13px]">+213 560 84 62 31</span>
          </div>
          <div className="flex  items-center gap-1">
            <Icon path={mdiEmail} size={1} className="text-primary"/>
            <span className="text-[#333333] text-[13px]">l.ziane@wellpharmagroup.com</span>
          </div>
      </div>

      <div>© Copyright Wellpharma 2024 Tous droits réservés</div>

          

      </div>

    <Divider orientation="vertical" className="bg-black w-[1px] mx-8 h-auto" />
    <div className='flex items-center gap-16 font-light'>
      <div className="flex flex-col gap-4 justify-between items-center">
          <h2 className="font-normal text-primary text-xl">Espace Employé</h2>
          <Link href="/" className="text-[#333333]">Accueil</Link>
          <Link href="/" className="text-[#333333]">Recherche d&apos;emploi</Link>
          <Link href="/" className="text-[#333333]">Page des entreprise</Link>
        </div>
        <div className="flex flex-col gap-4  justify-between items-center">
          <h2 className="font-normal text-primary text-xl">Espace Entreprise</h2>
          <Link href="/" className="text-[#333333]">Nos offres</Link>
          <Link href="/" className="text-[#333333]"> Poster un emploi</Link>
          <div className="opacity-0">Nothing to see here :(</div>
        </div>
        <div className="flex flex-col gap-4  justify-between items-center">
          <h2 className="font-normal text-primary text-xl">Ressources utiles</h2>
          <Link href="/" className="text-[#333333]">A propos de nous</Link>
          <Link href="/" className="text-[#333333]">Contact</Link>
          <Link href="/" className="text-[#333333]">Politique de confidentialité</Link>
        </div>
      </div>
      

      </div>
      
    </footer>
  )
}

export default Footer
