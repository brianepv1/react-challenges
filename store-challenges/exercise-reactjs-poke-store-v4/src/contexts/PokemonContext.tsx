import { createContext, useContext, type ReactNode } from "react";
import type { PokemonContextType } from "../types/types";
import { useQuery } from "@apollo/client";
import { GET_ALL_POKEMONS } from "../graphql/queries";

const PokemonContext = createContext<PokemonContextType | undefined>(undefined)

export function PokemonProvider({children}: { children: ReactNode}) {
    const { loading, error, data } = useQuery(GET_ALL_POKEMONS)

    const value = {
        loading,
        error,
        pokemons: data?.pokemons || []
    }

    return <PokemonContext.Provider value={value}>
        {children}
    </PokemonContext.Provider>

}

export function usePokemon(){
    const context = useContext(PokemonContext)
    if(context === undefined){
        throw new Error(`Debes usar usePokemon dentro del PokemonProvider`)
    }

    return context
}