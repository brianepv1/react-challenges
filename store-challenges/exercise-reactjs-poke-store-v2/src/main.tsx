import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { PokemonProvider } from './contexts/PokemonContext.tsx'

// Cuando queramos utilizar rutas o hacer una SPA utilizaremos react router dom 
// para manejar las rutas que necesitamos con los componentes que necesitemos

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>
  }
])


// Por otro lado para menejar la api del servidor de graph utilizamos apollo client 
// Le pasamos a new ApolloClient() un objecto con URI, que es la URL del server y 
// la propiedad cache con new InMemoryCache() para que si volvemos a llamar se guarden los datos

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
})



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <PokemonProvider>
        <RouterProvider router={router}></RouterProvider>
      </PokemonProvider>
    </ApolloProvider>
  </StrictMode>,
)
