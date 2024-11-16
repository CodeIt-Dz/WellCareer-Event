"use server";

import axios from 'axios';
import type { Filter, Offer, OfferById } from '@/types/index';
import { BASE_URL } from '@/lib/constant';
import { Backend } from '@/lib/helper';

// Axios instance with default settings (optional)
const axiosInstance = axios.create({
    baseURL: BASE_URL, // Adjust this to your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function fetchOffers(): Promise<Offer[] | null> {
    try {
        const response = await axiosInstance.get('/offer/');

        if (response.status === 200) {
            // console.log("Offers fetched successfully:", response.data);
            return response.data.results; 
        } else {
            console.error("Error fetching offers:", response.status);
            return null;
        }
    } catch (error) {
        console.error("Fetch offers failed:", error);
        return null; // Return null or handle error as needed
    }
}



export async function fetchFyOffers(user_id:number): Promise<Offer[] | null> {
   
        const { data } = await Backend.get(`/employe/${user_id}/offerfy/`,
            {
                withCredentials: true,
            }
        );

        if (data) {
            // console.log("Offers fetched successfully:", data);
            return data;
        } else {
            console.error("Error fetching offers:", data);
            return null;
        }
}

export async function fetchById(offer_id:string):Promise<OfferById| null>{
    const {data} = await axiosInstance.get(`/offer/${offer_id}`);
    if(data){
        console.log("Offers fetched successfully:", data)
        return data;
    }else{
        // console.error("error fetching offer by id  :",data);
        return null;
    }
}



export const fetchPaginatedOffers = async (page: number , filter : Filter ): Promise<any | null> => {
    try {

        const params = new URLSearchParams();
        params.append('page', page.toString());

        if (filter.wilaya) {
            params.append('wilaya', filter.wilaya);
        }

        if(filter.contract_type ) {
            params.append('contract_type', filter.contract_type);
        }

        if(filter.job_level) {
            params.append('job_level', filter.job_level);
        }

        if(filter.salary_min) {
            params.append('salary_min', filter.salary_min.toString());

        }
        if(filter.salary_max) {
            params.append('salary_max', filter.salary_max.toString());
        }

        if(filter.last_n_days) {
            params.append('last_n_days', filter.last_n_days.toString());
        }

        const url = `/offer/?${params.toString()}`;


        const response = await axiosInstance.get(url);

        if (response.status === 200) {
            // console.log("Offers fetched successfully:", response.data);
            return response.data;
        } else {
            console.error("Error fetching offers:", response.status);
            return null;
        }
    } catch (error) {
        console.error("Fetch offers failed:", error);
        return null; // Return null or handle error as needed
    }
}


export async function ApplyOffer(offer_id:string)  {
    const  { data, status}  = await Backend.post(`/offeremploye/`, {
        withCredentials: true,
        body : {
            offer : offer_id
        }
    } )

    return {data , status}
}




export async function getMyApplications():Promise<any| null>{

    const { data } = await Backend.get('/offeremploye/applications/',
        {
            withCredentials : true
        }
    )


    if(data){
        // console.log("Applications fetched successfully:", data)
        return data;
    }else{
        // console.error("error fetching offer by id  :",data);
        return null;
    }
}


export async function saveOffer(offer_id:string)  {
    const  { data, status}  = await Backend.post(`/savedoffer/`, {
        withCredentials: true,
        body : {
            offer : offer_id
        }
    } )

    return {data , status}
}


export async function getMySavedOffers():Promise<any| null>{

    const { data } = await Backend.get('/savedoffer/my_saved/',
        {
            withCredentials : true
        }
    )
    

    return data;

}


export async function unSaveOffer(saved_offer_id:string)  {
    const  { data, status}  = await Backend.delete(`/savedoffer/${saved_offer_id}/`, {
        withCredentials: true,
    } )

    return {data , status}
}