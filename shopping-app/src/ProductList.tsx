import React from 'react';
import { IProduct, products } from './data';

interface Props {
  onAddToCart: (product: IProduct) => void;
}

const ProductList: React.FC<Props> = ({ onAddToCart }) => {
  return (
    <div>
      <h2>商品一覧</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ¥{product.price}
            <button onClick={() => onAddToCart(product)}>カートに追加</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;