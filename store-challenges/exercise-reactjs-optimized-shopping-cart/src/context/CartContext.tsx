import { createContext, useReducer, type ReactNode, useCallback, useContext } from "react";
import type { CartContextType, CartState, Product } from "../types/types";
import { CartReducer } from "../reducers/CartReducer";

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider( {children}: {children: ReactNode}){

    const initialState: CartState = {
        cartItems: {},
        totalPrice: 0,
        appliedCoupon: { status: false, type: '', value: 0}
    }

    const [ state, dispatch ] = useReducer(CartReducer, initialState);

    const addItem = useCallback((product: Product) => {
        dispatch({ type: "ADD_ITEM", payload: product})
    }, [dispatch])

    const applyCoupon = useCallback((coupon: string) => {
        dispatch({ type: "APPLY_COUPON", payload: { coupon: coupon}})
    }, [dispatch])

    const value = {
        addItem,
        cartItems: state.cartItems,
        totalPrice: state.totalPrice,
        appliedCoupon: state.appliedCoupon,
        applyCoupon
    }

    return <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
}

export function useCartContext(){
    const context = useContext(CartContext);
    if(context === undefined){
        throw new Error(`Use the useCartContext inside a provider`)
    }
    return context;
}