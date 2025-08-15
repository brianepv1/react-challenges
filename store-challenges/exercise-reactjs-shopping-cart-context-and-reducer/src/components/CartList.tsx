import type { CartProduct } from "../types/interfaces"

type CardListProps = {
    cartItems: CartProduct[]
    onClick: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void
    onIncrement: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void
}
export default function CartList(props: CardListProps){
    const { cartItems, onClick, onIncrement} = props

    if(cartItems.length === 0 || cartItems === null){
        return <>The list is empty</>
    }

    console.log(cartItems)

    return <ul>
        {cartItems.map((item) => {
            return <li>
                <p>{item.id}</p>
                <p>{item.name}</p>
                <p>{item.price}</p>
                <p>{item.quantity}</p>
                <button onClick={(e) => onIncrement(e, item.id)}>+1</button>
                <br />
                <button onClick={(e) => onClick(e, item.id)}>Remove</button>
            </li>
        })}
    </ul>

}