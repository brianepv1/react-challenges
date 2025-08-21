import { useCartContext } from "../context/CartContext";
import type { Product } from "../types/types"

type CartDisplayProps = {
    product: Product
}

export default function CartDisplay({ product }: CartDisplayProps){
    const { addItem } = useCartContext();

    // Cambiamos <li> por <div> o <article>
    return (
        <article className="product_list_item">
            <img 
                src={product.images[0]} 
                alt={product.title} 
                loading="lazy" /* Clave para el rendimiento de imágenes */
            />
            <p>{product.title}</p>
            <span>$ {product.price.toLocaleString('es-MX')} MXN.</span>
            <button onClick={() => addItem(product)}>Añadir al carrito</button>
        </article>
    );
}