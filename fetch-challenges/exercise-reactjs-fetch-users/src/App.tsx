import './App.css'
import { getUsers } from './api/services/userService'
import UserList from './components/UserList'
import { useFetch } from './hooks/useFetch'

function App() {
  const { data: users, loading, error} = useFetch(getUsers)

  if(loading){
    return <h2>Loading Users</h2>
  }

  if(error){
    return <h2>Failed to fetch users. Please try again later.</h2>
  }

  return (
    <>
    <h1>User list</h1>
    <UserList items={users}></UserList>
    </>
  )
}

export default App
