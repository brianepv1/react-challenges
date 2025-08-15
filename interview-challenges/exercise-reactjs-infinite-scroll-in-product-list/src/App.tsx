import './App.css'
import { useProduct } from './context/ProductContext'
import { useRef, useEffect } from 'react' // Importamos los hooks necesarios

function App() {
  // 1. Obtenemos todo lo que nuestro contexto nos provee
  const { products, status, hasMore, loadMoreProducts } = useProduct()

  // 2. Creamos una referencia que apuntará a nuestro elemento "centinela"
  const loader = useRef<HTMLDivElement>(null)

  // 3. Este es el corazón del scroll infinito
  useEffect(() => {
    // Creamos una instancia del observador
    const observer = new IntersectionObserver(
      // Esta función se ejecuta cada vez que el elemento observado cambia su visibilidad
      (entries) => {
        const firstEntry = entries[0];
        // 'isIntersecting' es true si nuestro elemento centinela está en la pantalla
        if (firstEntry.isIntersecting && hasMore) {
          // Si está en pantalla y hay más productos por cargar, llamamos a la función
          loadMoreProducts();
        }
      },
      // Opciones: 'threshold: 1.0' significa que se activará cuando el 100% del elemento sea visible
      { threshold: 1.0 }
    );

    // Le decimos al observador que empiece a vigilar a nuestro elemento centinela
    const currentLoader = loader.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    // --- IMPORTANTE: La función de limpieza ---
    // Cuando el componente se desmonte, dejamos de observar para evitar memory leaks
    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  // El array de dependencias: El efecto se volverá a ejecutar si 'hasMore' o 'loadMoreProducts' cambian.
  }, [hasMore, loadMoreProducts]);


  // Tu código de renderizado original es casi perfecto, solo añadimos los indicadores
  return (
    <main>
      <h1>Lista de productos</h1>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <img src={product.images[0]} alt={product.title} width={200} />
            <strong>{product.title}</strong>
            <p>${product.price}</p>
          </li>
        ))}
      </ul>

      {/* --- SECCIÓN DE INDICADORES --- */}
      
      {/* 4. El elemento "centinela". Es un div vacío al que le pasamos nuestra ref. */}
      <div ref={loader} />

      {/* 5. Mostramos un mensaje de "Cargando..." solo cuando el estado sea 'loading' */}
      {status === 'loading' && <p>Cargando más productos...</p>}

      {/* 6. Mostramos un mensaje final cuando ya no haya más productos por cargar */}
      {!hasMore && <p>¡Has llegado al final! No hay más productos.</p>}
    </main>
  );
}

export default App