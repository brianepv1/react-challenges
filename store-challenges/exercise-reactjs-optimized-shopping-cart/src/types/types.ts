export interface Product {
    id: number
    title: string
    description: string
    category: string
    price: number
    images: string[]
}

export interface Products {
    total: number
    skip: number
    limit: number
    products: Product[]
}

export type CartItem = {
    title: string
    price: number
    quantity: number
}


export type Actions = 
    | { type: 'ADD_ITEM', payload: Product }
    | { type: 'APPLY_COUPON', payload: { coupon: string} }



export type CartState = {
    cartItems: {
        [productId: number]: CartItem
    }
    totalPrice: number
    appliedCoupon: { 
        status: boolean,
        type: string
        value: number
    } 
}


export type CartContextType = {
    cartItems: { }
    totalPrice: number
    appliedCoupon:  { 
        status: boolean,
        type: string
        value: number
    }
    addItem: (product: Product) => void
    applyCoupon: (coupon: string) => void
}