import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  FormControl,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faSearch,
  faSignInAlt,
  faHistory,
  faUser,
  faSignOutAlt,
  faShoppingCart,
  faStore,
  faInfoCircle,
  faHeart,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import {
  useUser,
  useClerk,
  UserButton,
  ClerkProvider,
} from "@clerk/clerk-react";

import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useClerk();
  const queryParam = searchParams.get("q");
  const [cartCount, setCartCount] = useState(0);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = query.trim();
    if (searchQuery !== "") {
      setQuery("");
      navigate(`/search?q=${searchQuery}`);
    }
  };

  useEffect(() => {
    setQuery(queryParam || "");
  }, [searchParams]);

  return (
    <Navbar bg='dark' variant='dark' expand='lg' className='mb-3 p-2'>
      <Navbar.Brand as={Link} to='/' className='ms-4'>
        <FontAwesomeIcon icon={faLeaf} /> YieldDeal
      </Navbar.Brand>
      <Nav className='me-auto'>
        <Nav.Link as={Link} to='/store'>
          <FontAwesomeIcon icon={faStore} /> Store
        </Nav.Link>
      </Nav>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='search-navbar'>
        <div className='mx-auto'>
          <Form action='#' onSubmit={handleSearch}>
            <InputGroup>
              <FormControl
                type='text'
                placeholder='Search'
                className='mr-sm-2'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button variant='light' type='submit'>
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </InputGroup>
          </Form>
        </div>
        <div>
          <Nav className='me-4'>
            {!user ? (
              <>
                <Nav.Link className='mx-1' as={Link} to='/sign-in'>
                  <FontAwesomeIcon icon={faSignInAlt} /> Sign in
                </Nav.Link>
                <Nav.Link className='mx-1' as={Link} to='/sign-up'>
                  <FontAwesomeIcon icon={faUser} /> Sign up
                </Nav.Link>
              </>
            ) : (
              <>
                <UserButton />
                <Nav.Link className='mx-1' as={Link} to='/favorites'>
                  <FontAwesomeIcon icon={faHeart} /> Favorites
                </Nav.Link>
                <Nav.Link className='mx-1' as={Link} to='/orders'>
                  <FontAwesomeIcon icon={faClipboardList} /> Orders
                </Nav.Link>
              </>
            )}
            <Nav.Link as={Link} to='/cart'>
              <FontAwesomeIcon icon={faShoppingCart} /> ({cartCount})
            </Nav.Link>
            <Nav.Link as={Link} to='/support'>
              <FontAwesomeIcon icon={faInfoCircle} />
            </Nav.Link>
          </Nav>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
