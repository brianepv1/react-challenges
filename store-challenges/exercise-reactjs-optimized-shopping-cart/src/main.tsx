import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CartProvider } from './context/CartContext.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CartView from './views/CartView.tsx'
import ProductListView from './views/ProductListView.tsx' // 👈 Importa la nueva vista

// Esta es la nueva estructura anidada
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // 👈 App es el elemento PADRE (el layout)
    // `children` es un array de rutas que se renderizarán DENTRO del <Outlet /> de App
    children: [
      {
        index: true, // 👈 'index: true' significa que esta es la ruta por defecto para "/"
        element: <ProductListView />
      },
      {
        path: "/cart", // 👈 La ruta del carrito ahora es una hija
        element: <CartView />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
)