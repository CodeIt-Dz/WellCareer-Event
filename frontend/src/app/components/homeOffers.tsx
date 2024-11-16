"use client"
import JobCard from "@/components/jobcard";
import { Offer } from "@/types";
import cn from 'classnames';
import React from "react";


interface HomeOffersProps {
      recentOffers: Offer[];
      isAuthenticated: boolean;
      foryouOffers: Offer[];
}


const HomeOffers: React.FC<HomeOffersProps> = ({ recentOffers, isAuthenticated, foryouOffers }) =>  {

   const [isForYou, setIsForYou] = React.useState(false);

   const toggleForYou = () => {
      setIsForYou(!isForYou);
         }

  


  return (
    <div>
       <div className="flex justify-center gap-12 p-24 text-[16px]  items-center w-full mx-auto">
          <span 
          onClick={toggleForYou}
          className={
            cn(
                  "cursor-pointer",
                  isForYou  ? "text-[#333333] opacity-70 ": "text-[#423BCA] font-semibold",
                  " duration-75 transition-all ease-out "
                  
            )
          } >Les offres d&apos;emploi les plus récentes
          
          </span>



          {isAuthenticated && 
          
          <span
          onClick={toggleForYou}
          className={cn(
            "cursor-pointer",
            isForYou ? "text-[#423BCA] font-semibold" : "text-[#333333] opacity-70",
            " duration-75 transition-all ease-out "
          )} >
            Offre d&apos;emploi pour vous
            
            </span>}
        </div>

        { isForYou ? ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {
            foryouOffers?.map((offer) => (
              <JobCard key={offer.id} offer={offer} />
            ))
          }

        </div>) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {
            recentOffers?.map((offer) => (
              <JobCard key={offer.id} offer={offer} />
            ))
          }

        </div>
      )  
      }
      
    </div>
  )
}


export default HomeOffers;