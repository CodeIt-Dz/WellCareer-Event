import { Appllication } from '@/types'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from './ui/badge';
import { Avatar } from '@nextui-org/react';
import Link from 'next/link'

interface AppllicationCardProps {
      application : Appllication 
}



const ApplicationCard:React.FC<AppllicationCardProps> = ( 
      { application }
) => {



  return (
      <Link href={`/offer/${application.offer.id}`}>
      <Card className="w-full max-w-60 h-full shadow-md rounded-3xl hover:shadow-lg cursor-pointer duration-300 ease-in-out">
            <div style={{ backgroundColor: application.status.color }} className={`text-white py-2 text-center rounded-t-3xl `}>
                        {application.status.name}

            </div>
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            
          <div className="flex items-center space-x-2">
            <Avatar src="" size="md" />
            <div>
              <h2 className="text-sm whitespace-nowrap ">{application.offer.title}</h2>
              <p className="text-xs text-muted-foreground line-clamp-1">{application.offer.company_name}</p>
              <p className="text-xs text-muted-foreground">{application.offer.wilaya} , {application.offer.daira }</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mt-2 text-sm line-clamp-6">{application.offer.description}</p>
        </CardContent>
        <CardFooter>
          <div className="flex flex-wrap space-x-2">
            <Badge className='bg-[#3028C8] bg-opacity-20 text-[#3028C8] m-1'>{application.offer.job_level}</Badge>
            <Badge className='bg-[#3028C8] bg-opacity-20 text-[#3028C8] m-1'>{application.offer.contract_type}</Badge>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default ApplicationCard