"use server";

import axios from 'axios';
import type {Hobby, Language, Skill } from '@/types/index';
import { BASE_URL } from '@/lib/constant';
import { Backend } from '@/lib/helper';

// Axios instance with default settings (optional)
const axiosInstance = axios.create({
    baseURL: BASE_URL, // Adjust this to your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function getSkills():Promise<Skill[]| null>{

    const { data } = await Backend.get('/skill',
        {
            withCredentials : true
        }
    )
    

    return data;
}

export async function addSkill(skill:any) {
    const { data, status } = await Backend.post('/skill/', {
        withCredentials: true,
        body: skill, // Send the existing skill object
    });

    return { data, status };
}

export async function removeSkillFromEmploye(userId: string, skillId: string) {
    try {
        const { data, status } = await Backend.delete(`/skill/${skillId}/?employe=${userId}`, {
            withCredentials: true,
        });

        if (status === 204) {
            console.log("Skill removed successfully:", data);
        }
    } catch (error) {
        console.error("Error removing skill:", error);
        // Handle the error (e.g., show a notification)
    }
}

export async function getHobbies():Promise<Hobby[]| null>{

    const { data } = await Backend.get('/hobby',
        {
            withCredentials : true
        }
    )
    

    return data;
}

export async function addHobby(hobby:any) {
    const { data, status } = await Backend.post('/hobby/', {
        withCredentials: true,
        body: hobby, 
    });

    return { data, status };
}

export async function removeHobbyFromEmploye(userId: string, hobbyId: string) {
    try {
        const { data, status } = await Backend.delete(`/hobby/${hobbyId}/?employe=${userId}`, {
            withCredentials: true,
        });

        if (status === 204) {
            console.log("hobby removed successfully:", data);
        }
    } catch (error) {
        console.error("Error removing skill:", error);
        // Handle the error (e.g., show a notification)
    }
}











export async function getLanguage():Promise<Language[]| null>{

    const { data } = await Backend.get('/language',
        {
            withCredentials : true
        }
    )
    

    return data;
}

export async function addLanguages(languages:any) {
    const { data, status } = await Backend.post('/hobby/', {
        withCredentials: true,
        body: languages, // Send the existing skill object
    });

    return { data, status };
}

export async function removeLanguageFromEmploye(userId: string, hobbyId: string) {
    try {
        const { data, status } = await Backend.delete(`/hobby/${hobbyId}/?employe=${userId}`, {
            withCredentials: true,
        });

        if (status === 204) {
            console.log("hobby removed successfully:", data);
        }
    } catch (error) {
        console.error("Error removing skill:", error);
        // Handle the error (e.g., show a notification)
    }
}


export async function sendDataToBackend(formdata: FormData) {
    try {
        // Await the response to ensure it resolves before continuing
        const response = await axios.post(`${BASE_URL}/students/`, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        return response;
    } catch (error) {
        console.error("Error sending form data:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
