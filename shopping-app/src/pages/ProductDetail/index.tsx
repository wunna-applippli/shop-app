import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Badge, Alert } from 'react-bootstrap';
import { Product } from '../../types';
import { getProductById } from '../../utils/api';
import { useCart } from '../../contexts/CartContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import styles from './index.module.css';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) {
          setError('Product ID is required');
          return;
        }

        const productId = parseInt(id);
        if (isNaN(productId)) {
          setError('Invalid product ID');
          return;
        }

        const data = await getProductById(productId);
        if (data) {
          setProduct(data);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Error loading product');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      navigate('/checkout');
    }
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  if (loading) {
    return <LoadingSpinner message="Loading product details..." />;
  }

  if (error || !product) {
    return (
      <Container className="py-4">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error || 'Product not found'}</p>
          <Button variant="outline-danger" onClick={handleContinueShopping}>
            Continue Shopping
          </Button>
        </Alert>
      </Container>
    );
  }

  const finalPrice = product.price - product.discount_amount;

  return (
    <Container className="py-4">
      <Row>
        <Col md={6}>
          <div className={styles.imageContainer}>
            <img src={product.photo} alt={product.product_name} className={styles.productImage} />
            {!product.available && (
              <div className={styles.outOfStock}>Out of Stock</div>
            )}
            {product.discount_amount > 0 && (
              <Badge bg="danger" className={styles.discountBadge}>
                Save ¥{product.discount_amount}
              </Badge>
            )}
          </div>
        </Col>
        
        <Col md={6}>
          <div className={styles.productInfo}>
            <h1 className={styles.productName}>{product.product_name}</h1>
            <p className={styles.productCode}>Product Code: {product.product_code}</p>
            <p className={styles.category}>Category: {product.category}</p>
            
            <div className={styles.pricing}>
              {product.discount_amount > 0 ? (
                <>
                  <span className={styles.originalPrice}>¥{product.price.toFixed(2)}</span>
                  <span className={styles.finalPrice}>¥{finalPrice.toFixed(2)}</span>
                  <Badge bg="success" className={styles.savings}>
                    You save ¥{product.discount_amount.toFixed(2)}
                  </Badge>
                </>
              ) : (
                <span className={styles.finalPrice}>¥{product.price.toFixed(2)}</span>
              )}
            </div>
            
            <div className={styles.availability}>
              <Badge bg={product.available ? 'success' : 'danger'}>
                {product.available ? 'In Stock' : 'Out of Stock'}
              </Badge>
            </div>
            
            <div className={styles.description}>
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
            
            <div className={styles.actions}>
              <Button 
                variant="primary" 
                size="lg" 
                onClick={handleAddToCart}
                disabled={!product.available}
                className={styles.buyButton}
              >
                {product.available ? 'Add to Cart & Checkout' : 'Out of Stock'}
              </Button>
              
              <Button 
                variant="outline-secondary" 
                onClick={handleContinueShopping}
                className={styles.continueButton}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;