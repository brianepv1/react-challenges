export interface Product {
    id: number;
    name: string;
    price: number;
}


export interface CartProduct extends Product {
    quantity: number
}