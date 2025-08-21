import { Link, Outlet } from 'react-router-dom'; // 👈 1. Importa Outlet
import './App.css'
import { useCartContext } from './context/CartContext';

// App ahora es un componente de Layout simple y limpio
function App() {
  const { cartItems } = useCartContext()

  return (
    <main>
      {/* Este título ahora aparecerá en TODAS las páginas */}
      <div style={{display: 'flex', gap: 12, justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>Product Shopping Cart</h1>
        <Link to={'/cart'} className='cart_link'>Carrito {Object.keys(cartItems).length}</Link>
      </div>
      
      
      {/* 2. Aquí es donde React Router renderizará la página actual 
             (ya sea la lista de productos o la vista del carrito) */}
      <Outlet /> 
    </main>
  )
}

export default App