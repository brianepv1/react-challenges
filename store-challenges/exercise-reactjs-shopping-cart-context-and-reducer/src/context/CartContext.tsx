import { createContext, useReducer, type ReactNode, useCallback, useContext } from "react";
import type { CartContextType } from "../types/types";
import CartReducer from "./reducer";
import type { Product } from "../types/interfaces";



const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({children}: {children: ReactNode})  {


    const initialValue = {
        cart: []
    }
    const [ state, dispatch ] = useReducer(CartReducer, initialValue);


    const addItem = useCallback((product: Product) => {
        dispatch({ type: "ADD_ITEM", payload: product})
    }, [])

    const removeItem = useCallback((id: number) => {
        dispatch({ type: "REMOVE_ITEM", payload: { id }})
    }, [])

    const updateQuantity = useCallback((id: number) => {
        dispatch({ type: "UPDATE_QUANTITY", payload: { id }})
    }, [])

    const value = {
        cart: state.cart,
        addItem,
        removeItem,
        updateQuantity
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}


export function useCartContext(){
    const context = useContext(CartContext)
    if(context === undefined){
        throw new Error(`Please use useCartContext inside the provider`)
    }

    return context
}