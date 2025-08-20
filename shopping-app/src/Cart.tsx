import React from 'react';
import { IProduct } from './data';

interface ICartItem extends IProduct {
  quantity: number;
}

interface Props {
  cartItems: ICartItem[];
  onRemoveFromCart: (product: ICartItem) => void;
  onPay: () => void;
}

const Cart: React.FC<Props> = ({ cartItems, onRemoveFromCart, onPay }) => {
  const total = cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);

  return (
    <div>
      <h2>カート</h2>
      <ul>
        {cartItems.length === 0 ? (
          <li>カートは空です。</li>
        ) : (
          cartItems.map(item => (
            <li key={item.id}>
              {item.name} - ¥{item.price} × {item.quantity}
              <button onClick={() => onRemoveFromCart(item)}>削除</button>
            </li>
          ))
        )}
      </ul>
      <p>合計金額: ¥{total}</p>
      <button onClick={onPay}>支払う</button>
    </div>
  );
};

export default Cart;