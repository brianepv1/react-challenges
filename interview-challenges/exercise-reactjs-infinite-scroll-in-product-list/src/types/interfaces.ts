export interface Product {
    id: number
    title: string
    description: string
    category: string
    price: number
    images: string[]
}

export interface ProductsFull {
    products: Product[],
    total: number,
    skip: number,
    limit: number
}

export type Products = Product[]

export type fetchStatus = "idle" | 'loading' | 'success' | 'error'

export type ProductContextType = {
    products: Products
    status: fetchStatus
    hasMore: boolean
    setProducts: (products: Products) => void
    setFetchStatus: (status: fetchStatus) => void
    setHasMore: (hasMore: boolean) => void
    addProducts: (products: Products) => void
    loadMoreProducts: () => void
}

export type ProductContextState = {
    products: Products
    status: fetchStatus
    hasMore: boolean
}


export type Actions = 
    | { type: 'SET_PRODUCTS', payload: Products}
    | { type: 'SET_FETCH', payload: { status: fetchStatus } }
    | { type: 'SET_CAN_LOAD_MORE_PRODUCTS', payload: { hasMore: boolean}}
    | { type: "ADD_PRODUCTS", payload: Products}