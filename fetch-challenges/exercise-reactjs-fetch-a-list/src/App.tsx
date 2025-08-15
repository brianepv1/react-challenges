import './App.css'
import { getUsers } from './api/getUsers'
import CardList from './components/Card/CardList'
import { useFetch } from './hooks/useFetch'

function App() {
  const { loading, error, data: users } = useFetch(getUsers);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (<div>
      <h1>User List</h1>
      {/* 
        Le pasamos users o un array vacío si users es null para
        asegurar que CardList siempre reciba un array.
      */}
      <CardList items={users || []} />
  </div>)
}

export default App
