const API_BASE_URL = "https://dummyjson.com"

async function apiFetch<T>(endpoint: string): Promise<T>{
    try{
        const response = await fetch(`${API_BASE_URL}${endpoint}`);

        if(response.status === 404){
            throw new Error(`NotFound`)
        }

        if(!response.ok){
            throw new Error(`Error trying to fetch the api, try again in a few seconds`)
        }

        return await response.json();
    }catch(error){
        if(error instanceof Error && error.message === 'NotFound'){
            throw error
        }

        if(error instanceof Error){
            throw new Error(`Unexpected network error fetching the api`)
        }

        throw new Error(`Unexpected network issue`)

    }
}

export const apiBase = {
    get: <T>(endpoint: string) => apiFetch<T>(endpoint)
}