import React, { useState, useEffect } from "react";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,
  UserProfile,
  useClerk,
  useUser,
} from "@clerk/clerk-react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./components/Header";
import FavoritesPage from "./pages/FavoritesPage";
import StorePage from "./pages/StorePage";
import MostSoldPage from "./pages/MostSoldPage";
import SearchPage from "./pages/SearchPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage.js";
import ProductPage from "./pages/ProductPage";
import SupportPage from "./pages/SupportPage.js";
import OrdersPage from "./pages/OrdersPage";
import NewestPage from "./pages/NewestPage";
import HomePage from "./pages/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { verifyAdmin } from "./utils/utils.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import LoadingIndicator from "./components/LoadingIndicator";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const ALLOWED_LANGUAGES = ["en", "es", "he", "fr", "de", "hu"];

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

export const AdminProtectedRoute = ({ children }) => {
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setIsAdmin(verifyAdmin(user));
      if (!isAdmin) {
        console.log("not admin");
      }
    } else {
      navigate("/en/sign-in");
    }
  }, [user]);

  if (isAdmin === null) {
    return <LoadingIndicator />;
  }

  if (isAdmin) {
    return children;
  }

  return <Navigate to='/en/admin' />;
};

export function ClerkProviderWithRoutes() {
  const navigate = useNavigate();
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Routes>
        <Route path='/' element={<Navigate to='/en/' />} />
        <Route path='/:language/*' element={<WithLanguageRoutes />} />
        <Route path='*' element={"404 Page not found"} />
      </Routes>
    </ClerkProvider>
  );
}
const WithLanguageRoutes = () => {
  const { language } = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!ALLOWED_LANGUAGES.includes(language)) {
      navigate(`/en`);
    }
  }, [language, navigate]);
  return (
    <>
      <Header />
      <Container fluid>
        <ToastContainer autoClose={1500} />
        <Routes>
          <Route
            path='admin/*'
            element={
              <AdminProtectedRoute>
                <Routes>
                  <Route path='dashboard' element={<AdminDashboardPage />} />
                  <Route path='settings' element={<AdminSettingsPage />} />
                  <Route path='orders' element={<AdminOrdersPage />} />
                  <Route path='products' element={<AdminProductsPage />} />
                </Routes>
              </AdminProtectedRoute>
            }
          />
          <Route index element={<HomePage />} />
          <Route path='store' element={<StorePage />} />
          <Route path='mostsold' element={<MostSoldPage />} />
          <Route path='search' element={<SearchPage />} />
          <Route path='cart' element={<CartPage />} />
          <Route path='checkout' element={<CheckoutPage />} />
          <Route
            path='checkout/order-summary/:orderId'
            element={<OrderSuccessPage />}
          />
          <Route
            path='product/:productId/:productSlug'
            element={<ProductPage />}
          />
          <Route path='support' element={<SupportPage />} />
          <Route path='newest' element={<NewestPage />} />
          <Route path='sign-in' element={<CenteredSignIn />} />
          <Route path='sign-up' element={<CenteredSignUp />} />
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

const CenteredSignIn = () => {
  const { language } = useParams();
  return (
    <Row className='justify-content-center align-items-center min-vh-100'>
      <Col xs={12} sm={6} md={4}>
        <SignIn routing='sign-in' path={`/${language}/sign-in`} />
      </Col>
    </Row>
  );
};

const CenteredSignUp = () => {
  const { language } = useParams();
  return (
    <Row className='justify-content-center align-items-center min-vh-100'>
      <Col xs={12} sm={6} md={4}>
        <SignUp routing='sign-up' path={`/${language}/sign-up`} />
      </Col>
    </Row>
  );
};
