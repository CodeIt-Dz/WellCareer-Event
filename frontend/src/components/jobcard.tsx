import React, { ReactNode } from 'react'
import { Bookmark } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from './ui/badge';
import { Avatar } from '@nextui-org/react';
import { Offer } from '@/types';
import Link from 'next/link'


    
interface JobCardProps {
    offer: Offer;
    }



const JobCard:React.FC<JobCardProps> = ({offer}) => {
  return (
    <Link href={`/offer/${offer.id}`}>

      <Card className="w-full max-w-sm shadow-md rounded-3xl hover:shadow-lg cursor-pointer duration-300 ease-in-out  ">
     <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
      <div className="flex items-center space-x-2">
        <Avatar src={offer.company?.logo} size="md" />
        <div>
          <h2 className="text-lg font-semibold  ">{offer.title}</h2>
          <p className="text-sm text-muted-foreground">
            {offer.company ? offer.company.name : '******'}
          </p>
          <p className="text-sm text-muted-foreground">
            {offer.company ? offer.company.location : '******'}
          </p>
        </div>
      </div>
      {/* <Bookmark className="h-5 w-5 text-muted-foreground" /> */}
      </CardHeader>

      <CardContent>
        <p className="mt-2 text-sm line-clamp-4">
          {offer.description}
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex space-x-2">
          <Badge className='bg-[#3028C8] bg-opacity-20 text-[#3028C8]' >{offer.job_level}</Badge>
          <Badge className='bg-[#3028C8] bg-opacity-20 text-[#3028C8]'>{offer.contract_type}</Badge>
        </div>
      </CardFooter>
    </Card>
    </Link>

  )
}

export default JobCard
