import { useEffect, useState } from 'react';
import { getAllProducuts } from '../services/productServices'
import type { Products } from '../types/types'; // Asumiendo que has arreglado este tipo
import ProductList from '../components/ProductList';

export default function ProductListView() {
  const [ productList, setProductList ] = useState<Products | null>(null)

  const getProducts = async () => {
    try {
      const data = await getAllProducuts();
      if(data){
        setProductList(data)
      }
    } catch(e) {
      return null
    }
  }

  useEffect(() => {
    getProducts();
  }, [])

  // Esta vista solo se preocupa de renderizar la lista de productos
  return (
    <>
      { productList?.products && <ProductList products={productList.products} /> }
    </>
  );
}