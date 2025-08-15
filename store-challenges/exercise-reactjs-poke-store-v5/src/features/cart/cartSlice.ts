import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartState, Pokemon } from "../../types";

const initialState: CartState = {
    items: [],
    totalItems: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Pokemon>) => {
            const pokemon = action.payload
            const existingItem = state.items.find((item) => {
                return item.id === pokemon.id
            })

            if(existingItem){
                existingItem.quantity += 1
            }else {
                state.items.push({ ...pokemon, quantity: 1})
            }

            state.totalItems = state.items.reduce((total, item) => {
                return total + item.quantity
            }, 0)
        },
        incrementQuantity: (state, action: PayloadAction<string>) => {
            const item = state.items.find((item) => item.id === action.payload);

            if(item){
                item.quantity += 1;
                state.totalItems += 1;
            }
        },
        decrementQuantity: (state, action: PayloadAction<string>) => {
            const item = state.items.find((item) => item.id === action.payload);

            if( item && item.quantity > 1 ){
                item.quantity -= 1;
                state.totalItems -= 1;
            }else if( item && item.quantity === 1){
                state.items = state.items.filter((i) => i.id !== action.payload);
                state.totalItems -= 1;
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const itemToRemove = state.items.find((item) => item.id === action.payload);

            if(itemToRemove){
                state.totalItems -= itemToRemove.quantity;
                state.items = state.items.filter((item) => item.id !== action.payload);
            }
        }
    }
})

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity} = cartSlice.actions;
export default cartSlice.reducer;

