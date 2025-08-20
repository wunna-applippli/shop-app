import React, { useState } from 'react';
import { IProduct, products } from './data';
import ProductList from './ProductList';
import Cart from './Cart';
import './App.css';

interface ICartItem extends IProduct {
  quantity: number;
}

function App() {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  const addToCart = (product: IProduct) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product: ICartItem) => {
    const updatedCart = cartItems.filter(item => item.id !== product.id);
    setCartItems(updatedCart);
  };

  const pay = () => {
    alert('支払いが完了しました！');
    setCartItems([]);
  };

  return (
    <div className="App">
      <ProductList onAddToCart={addToCart} />
      <Cart cartItems={cartItems} onRemoveFromCart={removeFromCart} onPay={pay} />
    </div>
  );
}

export default App;