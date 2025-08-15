import type { CartProduct, Product } from "./interfaces"

export type Action = 
    | { type: "ADD_ITEM", payload: Product}
    | { type: "REMOVE_ITEM", payload: { id: number}}
    | { type: "UPDATE_QUANTITY", payload: { id: number}}

export type CartState = {
    cart: CartProduct[]
}

export type CartContextType = {
    cart: CartProduct[]
    addItem: (product: Product) => void
    updateQuantity: (id: number) => void
    removeItem: (id: number) =>  void
}
