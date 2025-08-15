
type CardProps = {
    name: string
}
export default function Card(props: CardProps){
    const {name} = props

    return <li>{name}</li>
}