import type { User } from "../../interface/interfaces"
import Card from "./Card"

type CardListProps = {
    items: User[]
}

export default function CardList(props: CardListProps){
    const { items } = props;

    if (items.length === 0) {
        return <p>No users found.</p>
    }

    return (
        <ul>
            {items.map((item) => (
                <Card key={item.id} name={item.name} />
            ))}
        </ul>
    )
}