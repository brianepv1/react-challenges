export async function apiFetch<T>(baseUrl: string, endpoint: string, options?: RequestInit): Promise<T>{
    try{
        const response = await fetch(`${baseUrl}${endpoint}`, options);

        if(response.status === 404){
            throw new Error(`NotFound`)
        }

        if(!response.ok){
            throw new Error(`Unexpected error fetching the api`)
        }

        return await response.json()
    }catch(error){
        if(error instanceof Error && error.message === 'NotFound'){
            throw error
        }

        if(error instanceof Error){
            throw new Error(`Unexpected network error, try again`)
        }

        throw new Error(`An unkown network error happened`)
    }
}

export const apiBase = {
    get: <T>(baseUrl: string, endpoint: string) => apiFetch<T>(baseUrl, endpoint),
    post: <T>(baseUrl: string, endpoint: string, body: object) => apiFetch<T>(baseUrl, endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
}