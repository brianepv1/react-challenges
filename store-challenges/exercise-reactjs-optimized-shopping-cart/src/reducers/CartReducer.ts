import type { Actions, CartState } from "../types/types";
import { COUPON_CODES } from "../constants/constants";

export function CartReducer(state: CartState, action: Actions){
    switch(action.type){
        case "ADD_ITEM": {
            const { id, price} = action.payload;

            // --- CASO 1: El producto ya existe --- (Esta parte estaba bien)
            if(id in state.cartItems){               
               const updateQuantity = state.cartItems[id].quantity + 1;
               
               return { 
                    ...state, 
                    cartItems: { 
                        ...state.cartItems, [id]: {
                            ...state.cartItems[id],
                            quantity: updateQuantity
                        }
                    },
                    totalPrice: state.totalPrice + price
                }
            }
            
            // --- CASO 2: Es un producto nuevo ---
            const newProduct = {
                ...action.payload,
                quantity: 1
            };
            
            // La sintaxis correcta para añadir un nuevo item usando una clave dinámica
            return { 
                ...state, 
                cartItems: { 
                    ...state.cartItems, 
                    [id]: newProduct // 👈 ¡CORREGIDO!
                },
                totalPrice: state.totalPrice + price
            };
        }
        case "APPLY_COUPON": {
            const { coupon } = action.payload
            console.log(coupon)
            if(coupon in COUPON_CODES){

                const validCouponKey = coupon as keyof typeof COUPON_CODES;

                const couponDetails = COUPON_CODES[validCouponKey];

                return { 
                    ...state,
                    appliedCoupon: {
                        status: true,
                        type: couponDetails.type,
                        value: couponDetails.value  
                }}
            }

            return { 
                ...state, 
                appliedCoupon: {
                    status: false,
                    type: '',
                    value: 0
            }}
        }
        default:
            return state;
    }
}