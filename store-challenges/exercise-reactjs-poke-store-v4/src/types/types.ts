import type { CartItem, Pokemon } from "../interfaces/interfaces"

export type Action = 
    | { type: "ADD_TO_CART", payload: Pokemon}
    | { type: "REMOVE_FROM_CART", payload: { id: string }}
    | { type: "INCREMENT_QUANTITY", payload: { id: string}}
    | { type: "DECREMENT_QUANTITY", payload: { id: string}}

export type CartState = {
    cart: CartItem[]
}

export type PokemonContextType = {
    pokemons: Pokemon[]
    loading: boolean
    error?: Error
}

export type CartContextType = {
    cart: CartItem[]
    addToCart: (pokemon: Pokemon) => void
    incrementQuantity: (id: string) => void
    removeFromCart: (id: string) =>  void
    decrementQuantity: (id: string) => void
}
