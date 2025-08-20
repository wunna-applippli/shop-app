import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const finalPrice = product.price - product.discount_amount;
  
  const handleBuyClick = () => {
    addToCart(product);
  };

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card className={styles.productCard}>
      <div className={styles.imageContainer}>
        <Card.Img variant="top" src={product.photo} alt={product.product_name} />
        {!product.available && (
          <div className={styles.outOfStock}>Out of Stock</div>
        )}
        {product.discount_amount > 0 && (
          <Badge bg="danger" className={styles.discountBadge}>
            Save ¥{product.discount_amount}
          </Badge>
        )}
      </div>
      
      <Card.Body className="d-flex flex-column">
        <Card.Title className={styles.productName}>{product.product_name}</Card.Title>
        <Card.Text className={styles.productCode}>Code: {product.product_code}</Card.Text>
        <Card.Text className={styles.description}>{product.description}</Card.Text>
        
        <div className={styles.pricing}>
          {product.discount_amount > 0 ? (
            <>
              <span className={styles.originalPrice}>¥{product.price.toFixed(0)}</span>
              <span className={styles.finalPrice}>¥{finalPrice.toFixed(0)}</span>
            </>
          ) : (
            <span className={styles.finalPrice}>¥{product.price.toFixed(0)}</span>
          )}
        </div>
        
        <div className="mt-auto d-flex gap-2">
          <Button 
            variant="outline-primary" 
            onClick={handleViewDetails}
            className="flex-grow-1"
          >
            Details
          </Button>
          <Button 
            variant="primary" 
            onClick={handleBuyClick}
            disabled={!product.available}
            className="flex-grow-1"
          >
            {product.available ? 'Add to Cart' : 'Out Stock'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;