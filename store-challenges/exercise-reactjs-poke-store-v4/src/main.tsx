import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { PokemonProvider } from './contexts/PokemonContext.tsx'
import { CartProvider } from './contexts/CartContext.tsx'
import PokemonDetail from './views/PokemonDetail.tsx'

const route = createBrowserRouter([
  {
    path: "/",
    element: <App></App>
  },
  {
    path: "/pokemon/:pokemonId",
    element: <PokemonDetail></PokemonDetail>
  }
])

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <PokemonProvider>
        <CartProvider>
          <RouterProvider router={route}></RouterProvider>
        </CartProvider>
      </PokemonProvider>
    </ApolloProvider>
  </StrictMode>,
)
