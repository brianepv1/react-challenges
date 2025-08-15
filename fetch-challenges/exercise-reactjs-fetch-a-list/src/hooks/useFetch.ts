import { useEffect, useState } from "react";

// T es un "generic type". Nos permite reutilizar este hook para
// cualquier tipo de dato (Users, Posts, etc.)
export function useFetch<T>(fetchFunction: () => Promise<T>){
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState<string | null>(null);
    const [ data, setData ] = useState<T | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchFunction()
                setData(result)
            } catch(error){
                if( error instanceof Error ){
                    setError(error.message)
                }else{
                    setError("An unkown error ocurred");
                }
            } finally {
                setLoading(false)
            }
        }

        fetchData();
    }, [fetchFunction])

    return { loading, error, data}

}