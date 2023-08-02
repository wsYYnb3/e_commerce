import React from 'react';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn, SignIn, SignUp, useUser, UserProfile } from '@clerk/clerk-react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import UserPage from './pages/UserPage';
import FavoritesPage from './pages/FavoritesPage';
import StorePage from './pages/StorePage';
import MostSoldPage from './pages/MostSoldPage';
import SearchPage from './pages/SearchPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage.js';
import ProductPage from './pages/ProductPage';
import SupportPage from './pages/SupportPage.js';
import LoginPage from './pages/LoginPage';
import OrdersPage from './pages/OrdersPage';
import NewestPage from './pages/NewestPage';
import BestOffersPage from './pages/BestOffersPage';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';


import 'bootstrap/dist/css/bootstrap.min.css';

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const ProtectedRoute = ({children}) => {
  const {user} = useUser();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!user) {
      navigate("/sign-in");
    }
  }, [user, navigate]);

  return user ? children : null;
}

export function ClerkProviderWithRoutes() {
  const navigate = useNavigate();
  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      navigate={(to) => navigate(to)}
    >
      <Header />
      <Container>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="store" element={<StorePage />} />
        <Route path="mostsold" element={<MostSoldPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="product" element={<ProductPage />} />
        <Route path="support" element={<SupportPage />} />
        <Route path="bestoffers" element={<BestOffersPage />} />
        <Route path="newest" element={<NewestPage />} />
        <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
        <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
        <Route
          path="/favorites"
          element={
          <>
            <SignedIn>
              <FavoritesPage />
            </SignedIn>
             <SignedOut>
              <RedirectToSignIn />
           </SignedOut>
          </>
          }
        />
        <Route
          path="/orders"
          element={
          <>
            <SignedIn>
              <OrdersPage />
            </SignedIn>
             <SignedOut>
              <RedirectToSignIn />
           </SignedOut>
          </>
          }
        />
         <Route path="/user-profile/*" element={
          <>
            <SignedIn>
              <UserProfile routing="path" path="/user-profile" />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }/>
      </Routes>
      </Container>
    </ClerkProvider>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="store" element={<StorePage />} />
      <Route path="mostsold" element={<MostSoldPage />} />
      <Route path="search" element={<SearchPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="product" element={<ProductPage />} />
      <Route path="support" element={<SupportPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="newest" element={<NewestPage />} />
      <Route path="sign-up" element={<SignUpPage />} />
      <Route path="bestoffers" element={<BestOffersPage />} />
      <Route path="favorites" element={<FavoritesPage />} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="*" element={<h1>404: page not found</h1>} />
    </Routes>
  );
}