import type { CartItem } from "../../types";
import { ADD_TO_CART, REMOVE_FROM_CART, type CartActionTypes, INCREMENT_QUANTITY, DECREMENT_QUANTITY } from "../types/cartType";

interface CartState {
    items: CartItem[]
}

const initialState: CartState = {
    items: []
}

export const cartReducer = (state = initialState, action: CartActionTypes): CartState => {
    switch(action.type){
        case ADD_TO_CART: {
            const pokemon = action.payload
            const existingPokemon =  state.items.find((statePokemon) => statePokemon.id === pokemon.id)

            if(existingPokemon){
                return state;
            }

            const newCartItem: CartItem = { ...pokemon, quantity: 1}
            return { ...state, items: [...state.items, newCartItem]}
        }
        case REMOVE_FROM_CART: {
            return { ...state, items: state.items.filter( (statePoke) => statePoke.id !== action.payload )}
        }
        case INCREMENT_QUANTITY: {
            const pokemonIdToIncrement = action.payload

            const updatedItems = state.items.map((item) => {
                if(item.id === pokemonIdToIncrement){
                    return { ...item, quantity: item.quantity + 1}
                }

                return item
            })

            return { ...state, items: updatedItems}
        }
        case DECREMENT_QUANTITY: {
            const pokemonIdToDecrement = action.payload

            const targetItem = state.items.find(item => item.id === pokemonIdToDecrement)

            if(targetItem?.quantity === 1){
                return { ...state, items: state.items.filter((item) => item.id !== pokemonIdToDecrement)}
            }

            const updatedItems =  state.items.map( (item) => {
                if(item.id === pokemonIdToDecrement){
                    return { ...item, quantity: item.quantity - 1}
                }

                return item
            })

            return { ...state, items: updatedItems}
        }
        default:
            return state
    }
}