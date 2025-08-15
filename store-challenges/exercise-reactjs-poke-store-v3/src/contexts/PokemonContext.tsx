import { createContext, useReducer, type ReactNode, useCallback, useContext } from "react";
import type {  PokemonContext, State } from "../types/types";
import { useQuery } from "@apollo/client";
import { GET_ALL_POKEMON_DATA } from "../graphql/queries";
import { CartReducer } from "./CartReducer";
import type { Pokemon } from "../interfaces/interfaces";

const PokemonContext = createContext<PokemonContext | undefined>(undefined)

export function PokemonProvider ({ children }: { children: ReactNode}) {

    const { loading, error, data} = useQuery(GET_ALL_POKEMON_DATA);

    const initialState: State = { cart: []}
    const [ state, dispatch ] = useReducer(CartReducer, initialState);

    const addToCart = useCallback((pokemon: Pokemon) => {
        dispatch({ type: "ADD_TO_CART", payload: pokemon})
    }, [])

    const removeFromCart = useCallback((id: string) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: { id }})
    }, [])

    const decrementQuantity = useCallback((id: string) => {
        dispatch({ type: "DECREMENT_QUANTITY", payload: {id}})
    }, [])

    const value = {
        loading,
        error,
        pokemons: data?.pokemons || [],
        cart: state.cart,
        addToCart,
        removeFromCart,
        decrementQuantity
    }

    return <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>

}

export function usePokemon() {
    const context = useContext(PokemonContext)
    if(context === undefined){
        throw new Error("Esta funcion debe ser usada dentro del provider")
    }

    return context
}