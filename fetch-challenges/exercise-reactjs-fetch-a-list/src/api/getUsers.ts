import type { User } from "../interface/interfaces";

const URL = "https://jsonplaceholder.typicode.com/users"

export async function getUsers(): Promise<User[]> {
    try{
        const api = await fetch(URL)

        if(!api.ok){
            throw new Error("API failed")
        }

        return await api.json()
    } catch (e){
        throw new Error("Something bad happen")
    }
}