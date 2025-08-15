import type { Pokemon } from "./pokemon";

export interface CartItem extends Pokemon {
    quantity: number
}

export interface CartState {
    items: CartItem[]
    totalItems: number
}