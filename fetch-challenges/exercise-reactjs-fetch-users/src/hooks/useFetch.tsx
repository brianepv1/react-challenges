import { useEffect, useState } from "react";

export function useFetch<T>(fetchFunction: () => Promise<T>){
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState<string | null>(null)
    const [ data, setData ] = useState<T | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const result = await fetchFunction()
                setData(result)
            } catch(err){
                if(err instanceof Error){
                    setError(err.message)
                }else{
                    setError(`An unkown error ocurred`)
                }
            } finally{
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    return { loading, error, data }
}