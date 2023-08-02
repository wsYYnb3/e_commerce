import React, { useState, useEffect } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom'; 
import Header from './components/Header';
import Footer from './components/Footer';
import {ClerkProvider} from '@clerk/clerk-react'
import {AppRoutes, ClerkProviderWithRoutes} from './AppRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.css';

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
  const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

  return (
    <div className="App">
    <Router>
        <ClerkProviderWithRoutes />
      <Footer />
    </Router>
    </div>
  );
}

export default App;
