import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRef } from "react";

const StyledCarousel = styled(Carousel)`
  @media (min-width: 1125px) {
    height: 255px;
    width: 452px;
  }
  
  @media (min-width: 768px) and (max-width: 1024px) {
    height: 400px;
    width: 255px;
  }
  
  @media (max-width: 1124px) {
    height: 265px;
    width: 370px;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    display: none;
  }
`;

const CarouselButton = styled.button`
  background: none;
  border: none;
  color: #000;
  position: absolute;
  top: 50%;
  z-index: 5;
  font-size: 2rem;
`;

const CarouselButtonPrev = styled(CarouselButton)`
  left: 10px;
`;

const CarouselButtonNext = styled(CarouselButton)`
  right: 10px;
`;

const ImageGallery = ({ images }) => {
    const carouselRef = useRef(null);
  
    const next = () => {
      carouselRef.current.next();
    };
  
    const prev = () => {
      carouselRef.current.prev();
    };
  
    return (
      <StyledCarousel controls={false} indicators={false} ref={carouselRef}>
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={image.src}
              alt={image.alt}
            />
            <CarouselButtonPrev className="carousel-control-prev" role="button" onClick={prev}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </CarouselButtonPrev>
            <CarouselButtonNext className="carousel-control-next" role="button" onClick={next}>
              <FontAwesomeIcon icon={faArrowRight} />
            </CarouselButtonNext>
          </Carousel.Item>
        ))}
      </StyledCarousel>
    );
  };
  
  export default ImageGallery;