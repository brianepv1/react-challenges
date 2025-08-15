import { useEffect, useState} from 'react'
import './App.css'
import { fetchProducts } from './data/mockApi'
import type { Product } from './types/interfaces'
import ProductList from './components/ProductList'
import { useCartContext } from './context/CartContext'
import CartList from './components/CartList'

function App() {
  const [ loading, setIsLoading ] = useState(true)
  const [ products, setProducts ] = useState<Product[]>([])
  const { cart, addItem, removeItem, updateQuantity} = useCartContext();

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data)
      setIsLoading(false)
    })
  }, [])

  if (loading) return <p>Loading...</p>;


  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>, product: Product) => {
    e.preventDefault()
    addItem(product)
  }

  const handleRemoveItem = (e: React.MouseEvent<HTMLButtonElement>, id: number) => { 
    e.preventDefault();
    removeItem(id)
  }

  const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>, id: number) => { 
    e.preventDefault();
    updateQuantity(id)
  }



  return (
    <>
    <h1>Shopping list</h1>
    { products && <ProductList items={products} onClick={handleAddToCart}></ProductList>}
    <h2>Cart List </h2>
    { cart && <CartList cartItems={cart} onClick={handleRemoveItem} onIncrement={handleIncrement}></CartList>}
    </>
  )
}

export default App
