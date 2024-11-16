"use client"
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from './ui/badge';
import { Avatar } from '@nextui-org/react';
import { Bookmark } from "lucide-react"
import Link from 'next/link'
import { Offer } from '@/types';
import { saveOffer, unSaveOffer } from '@/data/offers';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import cn from 'classnames';
import { useRouter } from 'next/navigation';

interface offerCardProps {
  offer: Offer;
  isSaved ? : boolean;
  savedOfferId?  : string;

}

const SmallOfferCard: React.FC<offerCardProps> = ({ offer , isSaved , savedOfferId }) => {
  // Bookmark click handler
  const handleSave = async () => {
    
    const   {status}   =  await saveOffer(offer.id)

    if (status === 201 ) {
      toast.success('Offre sauvegardée avec succès !');

    }
    else if(status === 400){
      toast.error('Offre déjà sauvegardée !');
    }
    else{
      toast.error('Échec de la sauvegarde de l\'offre. Veuillez réessayer.');
    }


    
  };


  const router = useRouter()

  const handleUnSave = async () => {
    if(savedOfferId) {
      const {data , status} = await unSaveOffer(savedOfferId)
    
    console.log("Status",status , "Data",data , "Offer",offer)
    if (status === 204 ) {
      toast.success('Offre retirée des offres sauvegardées avec succès !');
      
      router.refresh()

    }
    else{
      toast.error('Échec de la suppression de l\'offre. Veuillez réessayer.');
    }

  }
  };


  return (
    <>
    <Toaster/>
      <Card className="w-full  shadow-md rounded-3xl 
      hover:shadow-lg cursor-pointer duration-300 ease-in-out">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-2">
            <Avatar src={offer.company?.logo} size="md" />
            <div>
             <Link href={`/offer/${offer.id}`}>
                <h2 className="text-sm">{offer.title}</h2>
              </Link>

              <p className="text-xs text-muted-foreground line-clamp-1">******</p>
              <p className="text-xs text-muted-foreground">{offer.wilaya},{offer.daira}</p>
            </div>
          </div>
          {/* Bookmark Icon */}
          <Bookmark
            onClick={isSaved ? handleUnSave : handleSave}
            className={cn('h-6 w-6 text-muted-foreground cursor-pointer')}
            fill={isSaved ? "#281FCE80" : "none"}
          />
        </CardHeader>
        <CardContent>
          <p className="mt-2 text-sm line-clamp-6">{offer.description}</p>
        </CardContent>
        <CardFooter>
          <div className="flex flex-wrap space-x-2">
            <Badge className="bg-[#3028C8] bg-opacity-20 text-[#3028C8] m-1">{offer.job_level}</Badge>
            <Badge className="bg-[#3028C8] bg-opacity-20 text-[#3028C8] m-1">{offer.contract_type}</Badge>
          </div>
        </CardFooter>
      </Card>
      </>
  );
}

export default SmallOfferCard;
