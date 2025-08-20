import React from 'react';
import { Spinner, Container } from 'react-bootstrap';
import styles from './index.module.css';


interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Loading...' }) => {
  return (
    <Container className={styles.spinnerContainer}>
      <Spinner animation="border" role="status" className={styles.spinner}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      {message && <p className={styles.message}>{message}</p>}
    </Container>
  );
};

export default LoadingSpinner;