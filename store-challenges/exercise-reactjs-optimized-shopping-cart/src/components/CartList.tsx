import { useState } from "react"
import { useCartContext } from "../context/CartContext"
import type { CartItem } from "../types/types"

type CartListProps = {
    products: { 
        [productId: number]: CartItem
    }
    totalPrice: number
}
export default function CartList( { products, totalPrice }: CartListProps){
    const { applyCoupon, appliedCoupon } = useCartContext();
    const [ value, setValue ] = useState('');
    
    const itemsArray = Object.values(products);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(value !== ''){
            applyCoupon(value)
        }
    }


    const couponPrice = (actualPrice: number): number=> {
        if(actualPrice <= 0 || !appliedCoupon || !appliedCoupon.status){
            return actualPrice
        }

        let newPrice = actualPrice;

        if(appliedCoupon.type === 'percentage'){
            // Calculamos el porcentaje  (ej: 10) a un decimal (0.10)
            const discountDecimal = appliedCoupon.value / 100;
            
            // Calculamos la cantidad a descontar
            const discountAmount = newPrice * discountDecimal;

            // Restamos la cantidad a descontar
            newPrice = newPrice - discountAmount;


        }else if(appliedCoupon.type === 'fixed'){
            newPrice = newPrice - appliedCoupon.value;
        }

        return newPrice < 0 ? 0 : newPrice;;
    }

    return <div className="cart_container">
        <h2>Checkout</h2>
        <ul className="cart_list">
            { itemsArray.map((product) => {
                return <li className="cart_item" key={product.title}>
                    <p>Product: {product.title}</p>
                    <p>Price: {product.price}</p>
                    <p>Quantity: {product.quantity}</p>
                </li>
            })}
        </ul>

        {/* --- Formulario de Descuento --- */}
        <form className="coupon_form" onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Código de descuento"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button type="submit">Aplicar</button> 
        </form>

        <div className="cart_total_section">
            <p>Total MXN: ${couponPrice(totalPrice).toLocaleString('es-MX')}</p>
        </div>
    </div>
}