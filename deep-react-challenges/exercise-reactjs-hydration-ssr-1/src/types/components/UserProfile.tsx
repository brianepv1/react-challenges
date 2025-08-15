import { useState } from "react";
import type { User } from "../interface";

export default function UserProfile({user}: {user: User}) {
    // We initialize our state using the data from the server
    const [ followers, setFollowers ] = useState(user.initialFollowers);
    const [ isFollowed, setIsFollowed ] = useState(user.isInitiallyFollowed);

    const handleFollowToggle = () => {
        if(isFollowed){
            setFollowers(prev => prev - 1);
            setIsFollowed(false)
        }else{
            setFollowers(prev => prev + 1);
            setIsFollowed(true)
        }
    }

    return (
        <div className="user-card" data-user-id={user.id}>
            <h1>{user.name}</h1>
            <p>Followers: <span id="followers-count">{followers}</span></p>
            <button id="follow-button" onClick={handleFollowToggle}>{isFollowed ? 'Following' : 'Follow'}</button>
        </div>
    )
}