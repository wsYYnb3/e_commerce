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
import LanguageSelector from "./LanguageSelector";
import { fetchCart } from "../services/cartSlice";
import { verifyAdmin } from "../utils/utils";
import { BiSupport } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { searchSchema } from "../services/validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const Header = () => {
  const [query, setQuery] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useClerk();
  const { t } = useTranslation();
  const queryParam = searchParams.get("q");
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(searchSchema),
  });

  const cartCount = useSelector((state) => state.cart.cartItems.length);
  const { language } = useParams();
  const dispatch = useDispatch();
  const handleSearch = (data) => {
    setSubmitted(true);
    const searchQuery = data.query.trim();
    if (searchQuery.length >= 3) {
      setQuery("");
      navigate(`/${language}/search?q=${searchQuery}`);
    }
    /* e.preventDefault();
    await searchSchema.validate({ query });
    const searchQuery = query.trim();
    if (searchQuery !== "") {
      setQuery("");
      navigate(`/${language}/search?q=${searchQuery}`);
    }*/
  };
  useEffect(() => {
    setQuery(queryParam || "");
  }, [queryParam]);
  const [isAdmin, setIsAdmin] = useState(null);
  useEffect(() => {
    setQuery("");
  }, [language]);
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
      <Navbar bg='dark' variant='dark' expand='lg' className='mb-3 p-2 navbar'>
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
          <Nav.Link
            className='mx-1'
            as={Link}
            to={`/${language}/admin/support`}
          >
            <BiSupport /> Support
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
          <FontAwesomeIcon icon={faLeaf} /> {t("store_name")}
        </Navbar.Brand>
        <Nav className='me-auto'>
          <Nav.Link as={Link} to={`/${language}/store`}>
            <FontAwesomeIcon icon={faStore} /> {t("store")}
          </Nav.Link>
        </Nav>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='search-navbar'>
          <div className='mx-auto'>
            <Form onSubmit={handleSubmit(handleSearch)}>
              <InputGroup>
                <FormControl
                  type='text'
                  placeholder='Search'
                  {...register("query")}
                  className={errors.query ? "is-invalid" : "mr-sm-2"}
                  onBlur={() => setSubmitted(false)}
                />
                <Button variant='light' type='submit'>
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
                {submitted && errors.query && (
                  <div
                    className={`search-error ${
                      errors.query ? "visible" : "invisible"
                    }`}
                  >
                    {errors.query?.message}
                  </div>
                )}
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
                    <FontAwesomeIcon icon={faSignInAlt} />
                    {t("sign_in")}
                  </Nav.Link>
                  <Nav.Link
                    className='mx-1'
                    as={Link}
                    to={`/${language}/sign-up`}
                  >
                    <FontAwesomeIcon icon={faUser} /> {t("sign_up")}
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
                    <FontAwesomeIcon icon={faHeart} /> {t("favorites")}
                  </Nav.Link>
                  <Nav.Link
                    className='mx-1'
                    as={Link}
                    to={`/${language}/orders`}
                  >
                    <FontAwesomeIcon icon={faClipboardList} /> {t("orders")}
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
