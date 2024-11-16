import React from 'react';
import Filter from '@/app/components/filter'
import FilteredOffers from '../components/filtred-offers';
import { fetchPaginatedOffers } from '@/data/offers';

interface JobsProps {
  searchParams: { [key: string]: string | "" };
}



export default async  function Jobs ({searchParams}:JobsProps) {

  const page = parseInt(searchParams.page ?? "1", 10) || 1;
  const wilaya = searchParams.wilaya ;
  const contract_type = searchParams.contract_type ;
  const job_level = searchParams.job_level ;
  const salary_min = searchParams.salary_min ;
  const salary_max = searchParams.salary_max ;
  const date_pub = searchParams.date_pub ;

  const data = await fetchPaginatedOffers(page, {
    wilaya: wilaya,
    contract_type: contract_type,
    job_level: job_level,
    salary_min: parseInt(salary_min),
    salary_max: parseInt(salary_max),
    last_n_days: parseInt(date_pub)
  }) ?? {count: 0, results: []};

  
 
  
  

  

  return (
    <div className='m-24 flex gap-12'>
      <div className='w-[30%]'>
        <Filter />
      </div>
      <div className='flex flex-col gap-16 w-[70%]'>
        <div className='flex justify-between items-center'>
          {/* <div className="inline-flex rounded-full bg-indigo-100 p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-indigo-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div> */}
          <span className='text-2xl'>{data?.count} Results</span>
        </div>

          <FilteredOffers 
            filteredOffers={data?.results || []}
            nextPageUrl={data?.next}
            prevPageUrl={data?.previous} 
            currentPage={page} 
            filter={{wilaya}}
            />
        
          
      </div>
    </div>
  );
};

