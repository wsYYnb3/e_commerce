import React, { useState, useEffect } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom'; 
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './AppRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Container>
          <AppRoutes />
        </Container>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
