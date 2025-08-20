import React from 'react';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';


const Success: React.FC = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <Container className="py-5">
      <div className={styles.successContainer}>
        <Card className={styles.successCard}>
          <Card.Body className="text-center">
            <div className={styles.checkmark}>✓</div>
            <h1 className={styles.successTitle}>Order Successful!</h1>
            
            <Alert variant="success" className={styles.successAlert}>
              <Alert.Heading>Thank you for your purchase!</Alert.Heading>
              <p>
                Your order has been successfully processed. You will receive a confirmation 
                email shortly with your order details and tracking information.
              </p>
              <hr />
              <p className="mb-0">
                Order ID: #{(Math.random() * 1000000).toFixed(0).padStart(6, '0')}
              </p>
            </Alert>

            <div className={styles.orderDetails}>
              <h5>What's next?</h5>
              <ul className={styles.nextSteps}>
                <li>You will receive an order confirmation email</li>
                <li>Your items will be prepared for shipment</li>
                <li>You will receive tracking information once shipped</li>
              </ul>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={handleContinueShopping}
              className={styles.continueButton}
            >
              Continue Shopping
            </Button>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default Success;