import React from 'react'
import { Button } from "@nextui-org/react"
import Link from 'next/link'


const DecoratedButton = () => {
  return (
    <div className='flex items-center gap-4'> 
      <div className='flex flex-col items-end justify-end gap-2 '>
            <div className='h-[10px] w-[100px] bg-transparent'>

            </div>
            <div className='w-[50px]  h-[30px] rotate-[30deg] bg-[#22E5BB]'>

            </div>
            <div className='w-[150px] h-[30px] -rotate-[8deg] mt-4 bg-[#22E5BB]'>

            </div>
            <div className='w-[100px] h-[30px] -rotate-[20deg] bg-[#22E5BB]'>

            </div>
      </div>
      <Link href="/auth/login" passHref className="hidden sm:inline-block">

      <Button className="text-sm
      rounded-xl text-white
       bg-gradient-to-r from-[#22E5BB] to-[#423BCA] px-16  ">
              Se connecter
      </Button>

      </Link>

      <div className='flex flex-col items-start justify-start gap-2       '>
            <div className='w-[50px]  h-[30px] -rotate-[30deg] bg-[#423BCA]'>

            </div>
            <div className='w-[150px] h-[30px] -rotate-[8deg] mb-4 bg-[#423BCA]'>

            </div>
            <div className='w-[100px] h-[30px] rotate-[10deg] bg-[#423BCA]'>

            </div>
            <div className='h-[10px] w-[100px] bg-transparent'>

            </div>
      </div>

    </div>
  )
}

export default DecoratedButton
