import axios from 'axios';
import { API_BASE_URL } from './constants';
import { Product } from '../types';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const mockProducts: Product[] = [
  {
    id: 1,
    product_code: 'PROD001',
    product_name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation. Perfect for music lovers and professionals who need to focus.',
    price: 8000,
    discount_amount: 2000,
    available: true,
    photo: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    category: 'Electronics'
  },
  {
    id: 2,
    product_code: 'PROD002',
    product_name: 'Smartphone',
    description: 'Latest smartphone with high-end camera, long battery life, and stunning display.',
    price: 89900,
    discount_amount: 3000,
    available: true,
    photo: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    category: 'Electronics'
  },
  {
    id: 3,
    product_code: 'PROD003',
    product_name: 'Laptop',
    description: 'Thin and light laptop for professionals with fast processor and ample storage.',
    price: 129000,
    discount_amount: 10000,
    available: true,
    photo: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    category: 'Electronics'
  },
  {
    id: 4,
    product_code: 'PROD004',
    product_name: 'Smart Watch',
    description: 'Fitness tracker and smartwatch with heart rate monitor, GPS, and notification support.',
    price: 19000,
    discount_amount: 2500,
    available: false,
    photo: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0Y2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    category: 'Electronics'
  },
  {
    id: 5,
    product_code: 'PROD005',
    product_name: 'Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe to keep your coffee hot for hours.',
    price: 8900,
    discount_amount: 1500,
    available: true,
    photo: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwbWFrZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    category: 'Home'
  },
  {
    id: 6,
    product_code: 'PROD006',
    product_name: 'Running Shoes',
    description: 'Comfortable running shoes with excellent cushioning and support for long distances.',
    price: 12900,
    discount_amount: 3000,
    available: true,
    photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    category: 'Fashion'
  },
];

// Simulate API calls
export const getProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 500);
  });
};

export const getProductById = (id: number): Promise<Product | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts.find(product => product.id === id));
    }, 300);
  });
};