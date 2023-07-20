import React, { useState, useEffect } from 'react';
import { Navbar, Nav, FormControl, Button, Form, InputGroup } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faSearch, faSignInAlt, faHistory, faUser, faSignOutAlt, faShoppingCart, faStore, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
//import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate();
  const { currentUser, logout } = useState(null);
  const queryParam = searchParams.get("q")
  const [cartCount, setCartCount] = useState(0);

  const handleSearch = (e) => {
    e.preventDefault()
    const searchQuery = query.trim();
    if (searchQuery !== '') {
      setQuery('');
      navigate(`/search?q=${searchQuery}`);
    }
  };

  useEffect(() => {
    setQuery(queryParam || '')
  }, [searchParams]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-3 p-2">
      <Navbar.Brand as={Link} to="/" className="ms-4">
        <FontAwesomeIcon icon={faLeaf} /> YieldDeal
      </Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/store">
          <FontAwesomeIcon icon={faStore} /> Store
        </Nav.Link>
      </Nav>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="search-navbar" >
        <div className="mx-auto">
        <Form action='#' onSubmit={handleSearch}>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button variant="light" type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </InputGroup>
        </Form>
        </div>
        <div>
        <Nav className="me-4">
          {!currentUser ? (
            <>
              <Nav.Link className="mx-1" as={Link} to="/login">
                <FontAwesomeIcon icon={faSignInAlt} /> Login
              </Nav.Link>
              <Nav.Link className="mx-1" as={Link} to="/signup">
                <FontAwesomeIcon icon={faUser} /> Signup
              </Nav.Link>
            </>
          ) : (
            <>
              <Navbar.Text className="mx-1">
                Logged as: {currentUser.username}
              </Navbar.Text>
              <Nav.Link className="mx-1" as={Link} to="/history">
                <FontAwesomeIcon icon={faHistory} /> History
              </Nav.Link>
              <Nav.Link className="mx-1" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
              </Nav.Link>
            </>
          )}
           <Nav.Link as={Link} to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} /> ({cartCount})
          </Nav.Link>
          <Nav.Link as={Link} to="/support">
            <FontAwesomeIcon icon={faInfoCircle} />
          </Nav.Link>
        </Nav>
          </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
