import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cart]);

  // Función para actualizar la cantidad de un producto en el carrito
  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) return removeFromCart(productId);

    setCart(cart.map(item =>
      item.product.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Función para agregar productos al carrito
  const addToCart = (product, quantity) => {
    const existingProduct = cart.find(item => item.product.id === product.id);

    if (quantity > product.stock) {
      alert('No puedes agregar más productos de los que hay en stock.');
      return;
    }

    if (existingProduct) {
      const updatedCart = cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { product, quantity }]);
    }

    // Después de agregar al carrito, actualizamos el stock del producto.
    product.stock -= quantity;
  };

  // Función para eliminar productos del carrito
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  // Función para limpiar el carrito
  const clearCart = () => {
    setCart([]); // Limpia el carrito
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
