import React, { useState, useContext } from 'react';
import { CartContext } from '../CartContext/CartContext';  // Asegúrate de importar el contexto
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../../FirebaseConfig';  // Asegúrate de importar tu configuración de Firebase
import { collection, addDoc } from 'firebase/firestore';  // Importar Firestore

import './Checkout.css';

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext); // Obtén clearCart del contexto
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !address) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Crear la orden
    const order = {
      customer: {
        name,
        address,
      },
      items: cart.map(item => ({
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        total: item.product.price * item.quantity,
      })),
      total: cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
      date: new Date(),
    };

    try {
      // Agregar la orden a Firebase
      const ordersCollection = collection(db, 'ordenes');
      const docRef = await addDoc(ordersCollection, order);

      // Limpiar el carrito
      clearCart();  

      // Mostrar la notificación de éxito
      toast.success('Compra finalizada con éxito. ¡Gracias por tu compra!');

      // Redirigir a la página principal después de 3 segundos
      setTimeout(() => {
        navigate('/');
      }, 3000);

      console.log('Orden guardada con ID: ', docRef.id);
    } catch (error) {
      console.error('Error al guardar la orden: ', error);
      toast.error('Hubo un problema al procesar la compra.');
    }
  };

  const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="checkout-container">
      <h2>Resumen de la Compra</h2>
      <div className="cart-summary">
        <ul>
          {cart.map(item => (
            <li key={item.product.id}>
              <span>{item.product.name}</span> - {item.quantity} x ${item.product.price} = ${item.product.price * item.quantity}
            </li>
          ))}
        </ul>
        <h3>Total: ${total}</h3>
      </div>

      <h3>Datos de Envío</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Dirección</label>
          <input 
            type="text" 
            id="address" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Pagar</button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Checkout;
