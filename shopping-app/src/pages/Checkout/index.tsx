import React from 'react';
import { Container, Row, Col, Card, Button, Table, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import styles from './index.module.css';

const Checkout: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleProceedToPayment = () => {
    clearCart();
    navigate('/success');
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  if (cartItems.length === 0) {
    return (
      <Container className="py-4">
        <Alert variant="info">
          <Alert.Heading>Your cart is empty</Alert.Heading>
          <p>Add some products to your cart before checking out.</p>
          <Button variant="primary" onClick={handleContinueShopping}>
            Continue Shopping
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">Checkout</h1>
      
      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header>
              <h3 className="mb-0">Order Summary</h3>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => {
                    const finalPrice = item.product.price - item.product.discount_amount;
                    const total = finalPrice * item.quantity;
                    
                    return (
                      <tr key={item.product.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={item.product.photo}
                              alt={item.product.product_name}
                              className={styles.productImage}
                            />
                            <div>
                              <h6 className="mb-0">{item.product.product_name}</h6>
                              <small className="text-muted">{item.product.product_code}</small>
                            </div>
                          </div>
                        </td>
                        <td>¥{finalPrice.toFixed(2)}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            >
                              -
                            </Button>
                            <span className="mx-2">{item.quantity}</span>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </td>
                        <td>¥{total.toFixed(2)}</td>
                        <td>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card>
            <Card.Header>
              <h3 className="mb-0">Order Total</h3>
            </Card.Header>
            <Card.Body>
              <div className={styles.orderSummary}>
                <div className={styles.summaryRow}>
                  <span>Subtotal:</span>
                  <span>¥{getCartTotal().toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping:</span>
                  <span>¥0.00</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Tax:</span>
                  <span>¥{(getCartTotal() * 0.1).toFixed(2)}</span>
                </div>
                <hr />
                <div className={`${styles.summaryRow} ${styles.total}`}>
                  <strong>Total:</strong>
                  <strong>¥{(getCartTotal() * 1.1).toFixed(2)}</strong>
                </div>
              </div>
              
              <Button
                variant="primary"
                size="lg"
                className="w-100 mt-3"
                onClick={handleProceedToPayment}
              >
                Proceed to Payment
              </Button>
              
              <Button
                variant="outline-secondary"
                className="w-100 mt-2"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;