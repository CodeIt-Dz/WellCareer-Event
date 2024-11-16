"use client"
import { Filter, Offer } from '@/types'
import React , {useState  } from 'react'
import SmallJobCard from '@/components/smalljobcard';
import { useRouter } from 'next/navigation';

interface FilteredOffersProps {

      filteredOffers : Offer[] ;
      nextPageUrl? : string;
      prevPageUrl? : string;
      currentPage : number;
      filter : Filter;

}


const FilteredOffers:React.FC<FilteredOffersProps> = ({
      filteredOffers , nextPageUrl , prevPageUrl, currentPage , filter
}) => {

      
      
      const router = useRouter()
      

      const handleNextPage = () => {
            if (nextPageUrl) {
                const params = new URLSearchParams({
                    page: (currentPage + 1).toString(),
                    wilaya: filter.wilaya || '', // Include the filter parameter
                });
                router.push(`/offer?${params.toString()}`);
            }
        };

        const handlePrevPage = () => {
            if (prevPageUrl && currentPage > 1) {
                const params = new URLSearchParams({
                    page: (currentPage - 1).toString(),
                    wilaya: filter.wilaya || '', // Include the filter parameter
                });
                router.push(`/offer?${params.toString()}`);
            }
        };


  return (

      <div>
    
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
     
          {filteredOffers.map((offer, index) => (
            <SmallJobCard key={index} offer={offer} isSaved={false} />
          ))
        }
      
    </div>

            {/* Pagination controls */}
            <div className='flex justify-center gap-4 mt-4'>
            <button
                  onClick={handlePrevPage}
                  disabled={!prevPageUrl}
                  className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50'
            >
                  Previous
            </button>
            <button
                  onClick={handleNextPage}
                  disabled={!nextPageUrl}
                  className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50'
            >
                  Next
            </button>
            </div>

      </div>
  )
}

export default FilteredOffers
