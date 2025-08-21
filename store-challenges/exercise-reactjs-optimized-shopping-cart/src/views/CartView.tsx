import { Link } from "react-router-dom"
import CartList from "../components/CartList"
import { useCartContext } from "../context/CartContext"

export default function CartView(){
    const { cartItems, totalPrice } = useCartContext()
    return <>
        <div style={{display: 'flex', gap: 12, justifyContent: 'space-between', alignItems: 'center'}}>
            <h2>Cart Page</h2>
            <Link to={'/'} className="cart_link">Back</Link>
        </div>
        <CartList products={cartItems} totalPrice={totalPrice}></CartList>
    </>
}