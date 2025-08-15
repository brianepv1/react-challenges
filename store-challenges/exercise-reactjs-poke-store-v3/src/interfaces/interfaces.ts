export interface Pokemon {
    id: string,
    name: string,
    image: string
    types: string[]
    weight: number,
    height: number
}

export interface CartItem extends Pokemon {
    quantity: number
}