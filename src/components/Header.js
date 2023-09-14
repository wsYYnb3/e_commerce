import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  FormControl,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import {
  Link,
  useNavigate,
  useSearchParams,
  useParams,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faSearch,
  faSignInAlt,
  faUser,
  faShoppingCart,
  faStore,
  faInfoCircle,
  faHeart,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useClerk, UserButton } from "@clerk/clerk-react";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoSettings } from "react-icons/io5";
import LanguageSelector from "./LanguageSelector";
import { fetchCart } from "../services/cartSlice";
import { verifyAdmin } from "../utils/utils";

const Header = () => {
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useClerk();
  const queryParam = searchParams.get("q");
  const cart = useSelector((state) => state.cart.cartItems);
  const cartCount = useSelector((state) => state.cart.cartItems.length);
  const { language } = useParams();
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = query.trim();
    if (searchQuery !== "") {
      setQuery("");
      navigate(`/${language}/search?q=${searchQuery}`);
    }
  };
  useEffect(() => {
    setQuery(queryParam || "");
  }, [searchParams]);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    if (user) {
      verifyAdmin(user.id).then((isAdmin) => {
        setIsAdmin(isAdmin);
      });
      dispatch(fetchCart(user?.id));
    }
  }, [user, dispatch]);
  if (isAdmin) {
    return (
      <Navbar bg='dark' variant='dark' expand='lg' className='mb-3 p-2'>
        <LanguageSelector />
        <Navbar.Brand
          as={Link}
          to={`/${language}/admin/dashboard`}
          className='ms-4'
        >
          <FontAwesomeIcon icon={faLeaf} /> Admin
        </Navbar.Brand>
        <Nav className='me-auto'>
          <Nav.Link as={Link} to={`/${language}/admin/products`}>
            <FontAwesomeIcon icon={faStore} /> Add products
          </Nav.Link>
          <Nav.Link className='mx-1' as={Link} to={`/${language}/admin/orders`}>
            <FontAwesomeIcon icon={faClipboardList} /> Orders
          </Nav.Link>
          <Nav.Link
            className='mx-1'
            as={Link}
            to={`/${language}/admin/settings`}
          >
            <FontAwesomeIcon icon={faInfoCircle} /> Settings
          </Nav.Link>
          <UserButton />
        </Nav>
      </Navbar>
    );
  } else {
    return (
      <Navbar bg='dark' variant='dark' expand='lg' className='mb-3 p-2'>
        <LanguageSelector />

        <Navbar.Brand as={Link} to={`/${language}`} className='ms-4'>
          <FontAwesomeIcon icon={faLeaf} /> YieldDeal
        </Navbar.Brand>
        <Nav className='me-auto'>
          <Nav.Link as={Link} to={`/${language}/store`}>
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch(e);
                      e.preventDefault();
                    }
                  }}
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
                  <Nav.Link
                    className='mx-1'
                    as={Link}
                    to={`/${language}/sign-in`}
                  >
                    <FontAwesomeIcon icon={faSignInAlt} /> Sign in
                  </Nav.Link>
                  <Nav.Link
                    className='mx-1'
                    as={Link}
                    to={`/${language}/sign-up`}
                  >
                    <FontAwesomeIcon icon={faUser} /> Sign up
                  </Nav.Link>
                </>
              ) : (
                <>
                  <UserButton />
                  <Nav.Link
                    className='mx-1'
                    as={Link}
                    to={`/${language}/favorites`}
                  >
                    <FontAwesomeIcon icon={faHeart} /> Favorites
                  </Nav.Link>
                  <Nav.Link
                    className='mx-1'
                    as={Link}
                    to={`/${language}/orders`}
                  >
                    <FontAwesomeIcon icon={faClipboardList} /> Orders
                  </Nav.Link>
                </>
              )}
              <Nav.Link as={Link} to={`/${language}/cart`}>
                <FontAwesomeIcon icon={faShoppingCart} /> ({cartCount})
              </Nav.Link>
              <Nav.Link as={Link} to={`/${language}/support`}>
                <FontAwesomeIcon icon={faInfoCircle} />
              </Nav.Link>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Navbar>
    );
  }
};

export default Header;
