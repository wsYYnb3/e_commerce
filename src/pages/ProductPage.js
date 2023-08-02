import React, { useState, useEffect } from 'react';
import { Card, Button, Col, Row, Container, Form, FormControl } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaShoppingCart, FaMinus, FaPlus } from 'react-icons/fa';
import { useSpring, animated } from 'react-spring';
import ProductDetail from '../components/ProductDetail';
//import ProductSpecification from '../components/ProductSpecification';
//import FarmerProfile from '../components/FarmerProfile';
//import FarmInformation from '../components/FarmInformation';
//import TechnicalInformation from '../components/TechnicalInformation';
import ProductPurchase from '../components/ProductPurchase';
import ImageGallery from '../components/ImageGallery';
import image1 from '../images/product1.webp';
import image2 from '../images/product2.jpg';

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(null);
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });
  useEffect(() => {
    const fetchProduct = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const fetchedProduct = {
        name: 'Product 1',
        unit: '1kg',
        deliveryCountry: 'US',
        quantity: 10,
        deliveryDate: '2023-08-02',
        price: 100,
        specifications: {
          boxContents: 'Box 1',
          variety: 'Variety 1',
        },
        images: [
            {src: image1, alt: 'Image 1'},
            {src: image2, alt: 'Image 2'},
        ],
        farmer: {
          name: 'Farmer 1',
          bio: 'Bio 1',
        },
        farm: {
          name: 'Farm 1',
          description: 'Description 1',
        },
        technicalInfo: {
          address: 'Address 1',
          altitude: 'Altitude 1',
          team: 'Team 1',
        },
      };

      setProduct(fetchedProduct);
    }

    fetchProduct();
  }, []);

  useEffect(() => {
    if(product) {
      setTotalPrice(quantity * product.price);
    }
  }, [quantity, product]);

  const increaseQuantity = () => setQuantity(prevQuantity => prevQuantity + 1);

  const decreaseQuantity = () => setQuantity(prevQuantity => prevQuantity > 1 ? prevQuantity - 1 : 1);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <animated.div style={fade}>
      <Container>
        <Row>
        <Col md={8}> {/* Adjust size as per your preference */}
          <ImageGallery images={product.images} />
          
        </Col>
        <Col md={4}> {/* Adjust size as per your preference */}
        <ProductDetail {...product} />
          <ProductPurchase 
              quantity={quantity}
              decreaseQuantity={decreaseQuantity}
              increaseQuantity={increaseQuantity}
              totalPrice={totalPrice}
          />
        </Col>
        </Row>
      </Container>
    </animated.div>
  );
};

export default ProductPage;


