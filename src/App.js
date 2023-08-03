import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/Footer";
import { ClerkProviderWithRoutes } from "./AppRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/app.css";
import { GlobalStyle } from "./styles/GlobalStyles";

function App() {
  return (
    <div className='App'>
      <GlobalStyle />
      <Router>
        <ClerkProviderWithRoutes />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
