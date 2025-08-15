import type { CartItem, Pokemon } from "../interfaces/interfaces"

export type Action = 
    | { type: "ADD_TO_CART", payload: Pokemon } 
    | { type: "REMOVE_FROM_CART", payload: { id: string } }
    | { type: "DECREMENT_QUANTITY", payload: { id: string} }

export type State = {
    cart: CartItem[]
}


export type PokemonContext = {
    pokemons: Pokemon[]
    loading: boolean
    error?: Error
    cart: CartItem[]
    addToCart: (pokemon: Pokemon) => void
    removeFromCart: (id: string) => void
    decrementQuantity: (id: string) => void
}