import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../CartContext/CartContext';
import { db } from '../../FirebaseConfig';  
import { collection, getDocs } from 'firebase/firestore';
import "./ItemDetailContainer.css";

const ItemDetailContainer = () => {
  const { productId } = useParams(); // Obtén el ID del producto desde la URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext); // Acceder al contexto del carrito

  const productosCollection = collection(db, 'products'); // Referencia a la colección de productos

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(productosCollection); // Obtener todos los productos
        const productosArray = snapshot.docs.map(doc => ({
          id: doc.id, // Firebase ID
          ...doc.data() // Los datos del producto
        }));

        const selectedProduct = productosArray.find(p => p.id === parseInt(productId)); // Filtrar el producto por ID
        setProduct(selectedProduct || null); // Establecer el producto en el estado
      } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]); // Ejecutar de nuevo si cambia el productId

  const handleAddToCart = () => {
    const quantity = parseInt(document.getElementById("quantity-input").value); // Obtener la cantidad directamente
    if (quantity > 0 && quantity <= product.stock) {
      addToCart(product, quantity); // Añadir al carrito si la cantidad es válida
    } else {
      alert('Cantidad no disponible.');
    }
  };
  

  if (loading) {
    return <p>Cargando detalles del producto...</p>;
  }

  if (!product) {
    return <p>Producto no encontrado.</p>;
  }

  return (
    <div className="item-detail-container">
      <h2>Detalles del Producto</h2>
      <div className="product-detail">
        <img src={product.image} alt={product.name} />
        <div className="details">
          <div className="name">{product.name}</div>
          <div className="category">Categoría: {product.category}</div>
          <div className="price">Precio: ${product.price}</div>
          <div className="description">Descripción: {product.description}</div>
          <div className="brand">Marca: {product.brand}</div>
          <div className="color">Color: {product.color}</div>
          <div className="weight">Peso: {product.weight}</div>
          <div className="stock">Stock disponible: {product.stock}</div>
          <div className="quantity">
          <input
            id="quantity-input" // Asegúrate de que el id sea el mismo
            type="number"
            min="1"
            max={product.stock}
            defaultValue="1"
          />
          </div>
          <button onClick={handleAddToCart}>Agregar al carrito</button>
          <Link to="/">
            <button>Volver a la tienda</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailContainer;
