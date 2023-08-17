import React from "react";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,
  useUser,
  UserProfile,
} from "@clerk/clerk-react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./components/Header";
import Layout from "./components/Layout";
import Footer from "./components/Footer";
import UserPage from "./pages/UserPage";
import FavoritesPage from "./pages/FavoritesPage";
import StorePage from "./pages/StorePage";
import MostSoldPage from "./pages/MostSoldPage";
import SearchPage from "./pages/SearchPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage.js";
import ProductPage from "./pages/ProductPage";
import SupportPage from "./pages/SupportPage.js";
import LoginPage from "./pages/LoginPage";
import OrdersPage from "./pages/OrdersPage";
import NewestPage from "./pages/NewestPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

export function ClerkProviderWithRoutes() {
  const navigate = useNavigate();
  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
      <Routes>
        <Route path='/' element={<Navigate to='/en' />} />
        <Route path='/:language/*' element={<WithLanguageRoutes />} />
        <Route path='*' element={"404 Page not found"} />
      </Routes>
    </ClerkProvider>
  );
}
const WithLanguageRoutes = () => {
  return (
    <>
      <Header />
      <Container fluid>
        <ToastContainer autoClose={1500} />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='store' element={<StorePage />} />
          <Route path='mostsold' element={<MostSoldPage />} />
          <Route path='search' element={<SearchPage />} />
          <Route path='cart' element={<CartPage />} />
          <Route path='checkout' element={<CheckoutPage />} />
          <Route path='product/:productId' element={<ProductPage />} />
          <Route path='support' element={<SupportPage />} />
          <Route path='newest' element={<NewestPage />} />
          <Route path='sign-in/*' element={<CenteredSignIn />} />
          <Route path='sign-up/*' element={<CenteredSignUp />} />
          <Route
            path='favorites'
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
            path='orders'
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
          <Route
            path='user-profile/*'
            element={
              <>
                <SignedIn>
                  <UserProfile routing='path' path='user-profile' />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
        </Routes>
      </Container>
    </>
  );
};
/*
export function ClerkProviderWithRoutes() {
  const navigate = useNavigate();
  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
      <Header />
      <Container>
        <ToastContainer autoClose={1500} />
        <Routes>
          <Route path='/' element={<Navigate to='/en' />} />

          <Route path='/:language/*'>
            <Route index element={<HomePage />} />
            <Route path='store' element={<StorePage />} />
            <Route path='mostsold' element={<MostSoldPage />} />
            <Route path='search' element={<SearchPage />} />
            <Route path='cart' element={<CartPage />} />
            <Route path='checkout' element={<CheckoutPage />} />
            <Route path='product/:productId' element={<ProductPage />} />
            <Route path='support' element={<SupportPage />} />
            <Route path='newest' element={<NewestPage />} />
            <Route path='sign-in/*' element={<CenteredSignIn />} />
            <Route path='sign-up/*' element={<CenteredSignUp />} />
            <Route
              path='favorites'
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
              path='orders'
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
            <Route
              path='user-profile/*'
              element={
                <>
                  <SignedIn>
                    <UserProfile routing='path' path='user-profile' />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
            <Route path='*' element={"404 Page not found"} />
          </Route>
        </Routes>
      </Container>
    </ClerkProvider>
  );
}*/
const CenteredSignIn = () => {
  const { language } = useParams();
  return (
    <Row className='justify-content-center align-items-center min-vh-100'>
      <Col xs={12} sm={6} md={4}>
        <SignIn routing='path' path={`/${language}/sign-in`} />
      </Col>
    </Row>
  );
};

const CenteredSignUp = () => {
  const { language } = useParams();
  return (
    <Row className='justify-content-center align-items-center min-vh-100'>
      <Col xs={12} sm={6} md={4}>
        <SignUp routing='path' path={`/${language}/sign-up`} />
      </Col>
    </Row>
  );
};
