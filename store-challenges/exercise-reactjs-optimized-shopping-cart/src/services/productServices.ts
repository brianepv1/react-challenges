import { apiBase } from "../api/apiBse";
import type { Products } from "../types/types";

export async function getAllProducuts(): Promise<Products | null>{
    try{
        return await apiBase.get("/products")
    }catch(error){
        console.log("Error in getAllProducts");
        return null

    }
}