import { configureStore } from "@reduxjs/toolkit";
import pokemonSlice from "../features/pokemons/pokemonSlice";
import cartSlice from "../features/cart/cartSlice";

export const store = configureStore({
    reducer: {
        pokemons: pokemonSlice,
        cart: cartSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;