import { mockProducts } from "./mockProducts";

export const fetchProducts = (): Promise<typeof mockProducts> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockProducts)
        }, 1000)
    })
}