import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f5f5f5;
    font-family: 'Roboto', sans-serif;
    color: #333;
    margin: 0;
    padding: 0;
  }

  .navbar {
    background-color: #2d2d2d;
  }

  .navbar-brand, .navbar-nav .nav-link {
    color: #fff;
  }

  .navbar-light .navbar-nav .nav-link {
    color: #fff;
  }

  .navbar-light .navbar-nav .nav-link:hover, .navbar-light .navbar-nav .nav-link:focus {
    color: #b3b3b3;
  }
  a, a:hover, a:focus {
    text-decoration: none;
  }

  .card {
    background-color: #fff;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease-in-out;
  }

  .card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .card img {
    height: 200px;
    object-fit: cover;
  }

  .card-title, .card-text {
    color: #333;
  }

  .btn-primary {
    background-color: #607d8b;
    border: none;
  }

  .btn-primary:hover, .btn-primary:focus {
    background-color: #455a64;
  }

  .btn-light {
    background-color: #ffffff;
    color: #333;
    border: 1px solid #ccc;
  }

  .btn-light:hover, .btn-light:focus {
    background-color: #f5f5f5;
  }

  .carousel-control-prev-icon, .carousel-control-next-icon {
    background-color: #607d8b;
  }

  .faShoppingCart, .faSearch, .faStar {
    color: #607d8b;
  }
  .faLeaf {
    color: .bg-success
  }
  .faMinus, .faPlus {
    color: #333;
  }

  .form-control {
    border: 1px solid #ccc;
    box-shadow: none;
  }

  .form-control:focus {
    border-color: #607d8b;
    box-shadow: 0 0 0 0.2rem rgba(96, 125, 139, 0.25);
  }

  .clerk-form {
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;
