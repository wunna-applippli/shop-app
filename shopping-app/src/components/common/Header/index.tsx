import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../../contexts/CartContext';
import './index.css';

const Header: React.FC = () => {
  const { cartItems } = useCart();
  const location = useLocation();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Helper function to check if a path is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand">
          <i className="fas fa-shopping-cart me-2"></i>
          Shopping List
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={isActive('/') ? 'active' : ''}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/checkout" 
              className={isActive('/checkout') ? 'active' : ''}
            >
              Cart
              {totalItems > 0 && (
                <Badge bg="primary" className="ms-1">
                  {totalItems}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;