import { API_BASE_URL } from "../constants/constants";
import { apiBase } from "../lib/apiBase";
import type { Comments } from "../types/types";

export async function getAllComments(): Promise<Comments | null>{
    try{
        return await apiBase.get<Comments>(API_BASE_URL, '/comments')
    }catch(error){
        console.log("Error happened fetching getAllComments");
        return null
    }
}

export async function getAllCommentsWithLimitAndSkip(limit: number, skip: number): Promise<Comments | null>{
    try{
        return await apiBase.get<Comments>(API_BASE_URL, `/comments?limit=${limit}&skip=${skip}`)
    }catch(error){
        console.log("Error happened fetching getAllCommentsWithLimitAndSkip");
        return null
    }
}