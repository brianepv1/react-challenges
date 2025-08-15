import type { ReactElement } from "react"
import type { User } from "../types/interfaces"
import UserCard from "./UserCard"

type UserList = {
    items: User[] | null
}

export default function UserList(props: UserList): ReactElement{
    const {items} = props

    if(items?.length === 0 || items === null){
        return <p>List is empty</p>
    }
    
    return <ul>
        {items.map((item) => <UserCard key={item.id} userObject={item} />)}
    </ul>
}