import { createContext, useReducer, type ReactNode, useCallback, useContext } from "react";
import type { CartContextType } from "../types/types";
import CartReducer from "../reducers/CartReducer";
import type { Pokemon } from "../interfaces/interfaces";

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({children}: { children: ReactNode}){

    const initialState = { cart: [] };
    const [state, dispatch] = useReducer(CartReducer, initialState);


    const addToCart = useCallback((pokemon: Pokemon) => {
        dispatch({ type: "ADD_TO_CART", payload: pokemon })
    }, [])

    const removeFromCart = useCallback((id: string) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: { id }})
    }, [])

    const incrementQuantity = useCallback((id: string) => {
        dispatch({ type: "INCREMENT_QUANTITY", payload: { id }})
    }, [])

    const decrementQuantity = useCallback((id: string) => {
        dispatch({ type: "DECREMENT_QUANTITY", payload: { id }})
    }, [])

    const value = {
        cart: state.cart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity
    }

    return <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
}

export function useCart(){
    const context = useContext(CartContext)
    if(context === undefined){
        throw new Error(`Debes usar useCart dentro del CartProvider`)
    }
    return context
}