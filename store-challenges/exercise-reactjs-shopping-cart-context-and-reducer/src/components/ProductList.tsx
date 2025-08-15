import type { Product } from "../types/interfaces"

type ProductProps = {
    items: Product[]
    onClick: (e: React.MouseEvent<HTMLButtonElement>, product: Product) => void
}

export default function ProductList(props: ProductProps){
    const { items, onClick} = props

    if(items.length === 0 || items === null){
        return <>The list is empty</>
    }

    return <ul>
        {items.map((item) => {
            return <li key={item.id}>
                <p>{item.id}</p>
                <p>{item.name}</p>
                <p>{item.price.toLocaleString('ES-MX')}</p>
                <button onClick={(e) => onClick(e, item)}>Add item</button>
            </li>
        })}
    </ul>
}