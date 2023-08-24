import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  Button,
  Col,
  Row,
  Container,
  Form,
  FormControl,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import { useSpring, animated } from "react-spring";
import ProductDetail from "../components/ProductDetail";
//import ProductSpecification from '../components/ProductSpecification';
//import FarmerProfile from '../components/FarmerProfile';
//import FarmInformation from '../components/FarmInformation';
//import TechnicalInformation from '../components/TechnicalInformation';
import TechnicalInfo from "../components/TechnicalInfo";
import Description from "../components/Description";
import ProductPurchase from "../components/ProductPurchase";
import ImageGallery from "../components/ImageGallery";
import image1 from "../images/product1.webp";
import image2 from "../images/product2.jpg";
import Keywords from "../components/Keywords";
const StyledCol = styled(Col)`
  margin-bottom: 30px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const StyledImageCol = styled(Col)`
  margin-bottom: 30px;
`;

const ProductPageContainer = styled(Container)`
  padding: 20px;
`;

const DescriptionTechnicalInfoContainer = styled.div`
  @media (min-width: 768px) {
    margin-left: 30px;
  }
`;

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
        name_key: "Product 1",
        name: "Product 1",
        unit: "1kg",
        origin: "US",
        quantity: 10,
        deliveryDate: "2023-08-02",
        price: 100,
        specifications: {
          boxContents: "Box 1",
          variety: "Variety 1",
        },
        images: [
          { src: image1, alt: "Image 1" },
          { src: image2, alt: "Image 2" },
        ],
        vendor: {
          name: "Farmer 1",
          bio: "Bio 1",
        },
        farm: {
          name: "Farm 1",
          description: "Description 1",
        },
        technicalInfo: {
          address: "Address 1",
          altitude: "Altitude 1",
          team: "Team 1",
        },
        keywords: [
          "Organic",
          "US Origin",
          "Fresh",
          "High Quality",
          "Sustainable",
        ],
        description_key: "product1_description",
        slug_key: "product1",
      };

      setProduct(fetchedProduct);
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    if (product) {
      setTotalPrice(quantity * product.price);
    }
  }, [quantity, product]);

  const description =
    "Nec ultrices dui sapien eget mi proin. Eu lobortis elementum nibh tellus molestie nunc non blandit massa. Bibendum arcu vitae elementum curabitur vitae nunc. Mattis enim ut tellus elementum sagittis vitae et leo duis. Ac felis donec et odio pellentesque. Amet commodo nulla facilisi nullam vehicula. Egestas maecenas pharetra convallis posuere morbi leo urna molestie. Amet consectetur adipiscing elit pellentesque habitant morbi tristique.";
  const increaseQuantity = () =>
    setQuantity((prevQuantity) => prevQuantity + 1);

  const decreaseQuantity = () =>
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));

  if (!product) {
    return <div>Loading...</div>;
  }
  const technicalData = [
    {
      value:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut morbi tincidunt augue interdum velit euismod in pellentesque. Donec enim diam vulputate ut pharetra sit amet aliquam id.",
    },
    {
      value:
        "Ullamcorper morbi tincidunt ornare massa. Nibh sed pulvinar proin gravida. Maecenas pharetra convallis posuere morbi leo urna molestie at. Elit scelerisque mauris pellentesque pulvinar pellentesque. ",
    },
    {
      value:
        "Ornare arcu dui vivamus arcu felis bibendum. Enim nunc faucibus a pellentesque sit amet porttitor eget. ",
    },
  ];

  return (
    <animated.div style={fade}>
      <ProductPageContainer>
        <Row>
          <StyledImageCol md={5} className='mx-5'>
            <ImageGallery images={product.images} />
            <Keywords keywords={product.keywords} />
          </StyledImageCol>
          <StyledCol md={6}>
            <ProductDetail {...product} />
            <ProductPurchase
              product={product}
              quantity={quantity}
              decreaseQuantity={decreaseQuantity}
              increaseQuantity={increaseQuantity}
              totalPrice={totalPrice}
            />
          </StyledCol>
        </Row>
        <DescriptionTechnicalInfoContainer>
          <Col md={12}>
            <Description description={description} />
            <TechnicalInfo data={technicalData} />;
          </Col>
        </DescriptionTechnicalInfoContainer>
      </ProductPageContainer>
    </animated.div>
  );
};

export default ProductPage;
