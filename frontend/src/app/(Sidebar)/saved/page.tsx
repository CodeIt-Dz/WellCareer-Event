import SmallOfferCard from "@/components/smalljobcard";
import {  getMySavedOffers } from "@/data/offers";




export default async function Saved  () {
    const data = await getMySavedOffers();
    const mySavedOffers = data?.results;

    

    return ( 
        <div className="flex flex-col items-center justify-center p-8 gap-12">
            <h1 className=" text-xl items-start  self-start  ">
            Mes offres sauvegardées
            </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {
                mySavedOffers?.map((savedOffer:any) => (
                    
                        <SmallOfferCard offer={savedOffer.offer}
                         isSaved={true}  key={savedOffer.id} savedOfferId={savedOffer.id}
                         />
                    
                ))
            }
        </div>

        </div>
     );
}

