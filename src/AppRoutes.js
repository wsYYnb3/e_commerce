import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

import 'bootstrap/dist/css/bootstrap.min.css';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="favorites" element={<FavoritesPage />} />
      <Route path="store" element={<StorePage />} />
      <Route path="mostsold" element={<MostSoldPage />} />
      <Route path="search" element={<SearchPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="product" element={<ProductPage />} />
      <Route path="support" element={<SupportPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="newest" element={<NewestPage />} />
      <Route path="bestoffers" element={<BestOffersPage />} />
      <Route path="*" element={<h1>404: page not found</h1>} />
    </Routes>
  );
}