import { createContext, useReducer, type ReactNode, useCallback, useContext } from "react";
import type { PokemonTypeContext, State } from "../types/types";
import { useQuery } from "@apollo/client";
import { GET_ALL_POKEMONS } from "../graphql/queries";
import { CartReducer } from "./CartReducer";
import type { Pokemon } from "../interfaces/interfaces";

// Creamos el contexto, lo ponemos undefiened por si no carga el context en cierto momento
const PokemonContext = createContext<PokemonTypeContext | undefined>(undefined)

export function  PokemonProvider({ children }: { children: ReactNode}) {
    // Llamamos la api de graph ql en el provider para obtener los datos cuando sea necesario
    // Le pasamos la query que creamos al useQuery de apollo para llamarla, esto ya tiene los datos
    // el loading y el error si acaso, lo maneja automaticamente por nosotros
    const { loading, error, data } = useQuery(GET_ALL_POKEMONS)

    // Estado inicial del carrito 
    const initialState: State = { cart: []}
    const [ cartState, dispatch ] = useReducer(CartReducer, initialState);

    // Funciones disptach 
    const addToCart = useCallback((pokemon: Pokemon) => {
        dispatch({ type: "ADD_TO_CART", payload: pokemon })
    }, [])

    const removeFromCart = useCallback((id: number) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: {id}})
    }, [])

    const decrementQuantity = useCallback((id: number) => {
        dispatch({ type: "DECREMENT_QUANTITY", payload: {id}})
    }, [])

    const value = {
        loading,
        error,
        pokemons: data?.pokemons || [],
        cart: cartState.cart,
        addToCart,
        removeFromCart,
        decrementQuantity
    }

    return <PokemonContext.Provider value={value}>
        {children}
    </PokemonContext.Provider>
}

export function usePokemon(){
    const context = useContext(PokemonContext)
    if(context === undefined){
        throw new Error(`usePokemon debe ser usado dentro de un PokemonProvider`)
    }
    return context
}