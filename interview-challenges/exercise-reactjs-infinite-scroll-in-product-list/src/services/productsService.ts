import { API_BASE_URL } from "../constants/constants";
import { apiBase } from "../lib/apiBase";
import type { ProductsFull } from "../types/interfaces";

export async function getAllProducts(): Promise<ProductsFull | null>{
    try {
        return await apiBase.get<ProductsFull>(API_BASE_URL, '/products')
    }catch(error){
        console.log("Error fetching getAllProducts ")
        return null
    }
}
export async function getAllProductsWithLimitAndSkip(limit: number, skip: number): Promise<ProductsFull | null>{
    try {
        return await apiBase.get<ProductsFull>(API_BASE_URL, `/products?limit=${limit}&skip=${skip}`)
    }catch(error){
        console.log("Error fetching getAllProductsWithLimitAndSkip")
        return null
    }
}