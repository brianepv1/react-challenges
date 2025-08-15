import type { ReactElement } from "react";
import type { User } from "../types/interfaces";

type UserItem = {
    userObject: User
}

export default function UserCard(props: UserItem): ReactElement {
    const { userObject} = props
    return <li>
        <p>{userObject.name}</p>
        <p>{userObject.email}</p>
        <p>{userObject.username}</p>
    </li>
}