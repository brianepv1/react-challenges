import type { CartProduct } from "../types/interfaces";
import type { Action, CartState } from "../types/types";

export default function CartReducer(state: CartState, action: Action,){
    switch(action.type){
        case "ADD_ITEM": {
            const productToAdd = action.payload
            const existingProduct = state.cart.find((product) => product.id === productToAdd.id)

            if(existingProduct){
                const updatedCart = state.cart.map((product) => product.id === productToAdd.id ? { ...product, quantity: product.quantity + 1} : product);

                return { ...state, cart: updatedCart}
            }

            const newProduct: CartProduct = { ...productToAdd, quantity: 1}
            return { ...state, cart: [...state.cart, newProduct]}
        }
        case "REMOVE_ITEM": {
            const { id } = action.payload
            const filteredProducts = state.cart.filter((product) => product.id !== id)

            return {...state, cart: filteredProducts}
        }
        case "UPDATE_QUANTITY": {
            const {id } = action.payload
            console.log("Update quanity id", id)
            const existingProduct = state.cart.find((product) => product.id === id)

            console.log("update quantity existing product ", existingProduct)

            if(existingProduct){
                console.log("inside existinProduct ")
                const updatedCart = state.cart.map((product) => product.id === id ? { ...product, quantity: product.quantity + 1} : product);
                console.log("Updated cart ", updatedCart);

                return { ...state, cart: updatedCart}
            } else {
                return state
            }

        }
        default:
            return state
    }
}