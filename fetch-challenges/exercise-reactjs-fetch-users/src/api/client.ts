const API_BASE_URL = "https://jsonplaceholder.typicode.com";

// Una función genérica que sabe cómo hacer un fetch, revisar errores y parsear JSON.
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T>{
    try{
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

        if(!response.ok){
            throw new Error(`Error en la API: ${response.statusText}`);
        }

        return await response.json();
    } catch(error){
        if(error instanceof Error){
            throw new Error(`Fallo en la petición de red: ${error.message}`)
        }

        throw new Error("Ocurrió un error desconocido en la red");
    }
}

export const apiClient = {
    get: <T>(endpoint: string) => apiFetch<T>(endpoint),
    post: <T>(endpoint: string, body: object) => apiFetch<T>(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    })
}