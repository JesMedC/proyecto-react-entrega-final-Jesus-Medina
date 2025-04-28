import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../CartContext/CartContext';
import "./ItemListContainer.css";
import { db } from '../../FirebaseConfig';  
import { collection, getDocs } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify'; // Importar Toastify
import 'react-toastify/dist/ReactToastify.css'; // Estilos de Toastify

const ItemListContainer = () => {
  const { categoryId } = useParams(); // Obtenemos el ID de la categoría desde la URL
  const [products, setProducts] = useState([]); // Estado para los productos
  const [loading, setLoading] = useState(true); // Estado para saber si estamos cargando los productos
  const { addToCart } = useContext(CartContext); // Contexto para añadir al carrito
  const productosCollection = collection(db, 'products'); // Referencia a la colección de productos en Firebase

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Iniciamos el estado de carga
        const snapshot = await getDocs(productosCollection); // Obtenemos los productos de Firebase
        let arrayDeProductos = snapshot.docs.map(doc => doc.data()); // Extraemos los datos de los documentos

        // Si hay un categoryId, filtramos los productos por categoría
        if (categoryId) {
          arrayDeProductos = arrayDeProductos.filter(product => product.category === categoryId);
        }

        setProducts(arrayDeProductos); // Establecemos los productos en el estado
      } catch (error) {
        console.log('Error al obtener los productos:', error); // Mostramos un mensaje de error en consola
      } finally {
        setLoading(false); // Finalmente, cambiamos el estado de carga a false
      }
    };

    fetchData();
  }, [categoryId]); // Volver a ejecutar si cambia el categoryId

  const handleAddToCart = (product, quantity) => {
    if (quantity > 0 && quantity <= product.stock) {
      addToCart(product, quantity); // Añadimos el producto al carrito si la cantidad es válida
      toast.success(`${product.name} agregado al carrito!`); // Notificación de éxito
    } else {
      alert('Cantidad de productos no disponible. Intente con una cantidad menor o igual al stock disponible.');
    }
  };

  if (loading) {
    return <p>Cargando productos...</p>; // Mensaje mientras se cargan los productos
  }

  return (
    <div className="item-list-container">
      <h2>Productos</h2>
      <div className="item-list">
        {products.map((product) => (
          <div key={product.id} className="item">
            <img src={product.image} alt={product.name} />
            <div className="details">
              <div className="name">{product.name}</div>
              <div className="price">${product.price}</div>
              <div className="quantity">
                <input
                  id={`quantity-${product.id}`}
                  type="number"
                  min="1"
                  max={product.stock}
                  defaultValue="1"
                />
              </div>
              <div>
                <button 
                  onClick={() => handleAddToCart(product, parseInt(document.querySelector(`#quantity-${product.id}`).value))}
                >
                  Agregar al carrito
                </button>
                <Link to={`/product/${product.id}`}>
                  <button>Ver Detalle</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Aquí va el contenedor de Toastify */}
      <ToastContainer />
    </div>
  );
};

export default ItemListContainer;
