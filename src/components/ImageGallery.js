import React from "react";
import { Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import {
  StyledCarousel,
  CarouselButtonPrev,
  CarouselButtonNext,
} from "../styles/ImageGalleryStyles";

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
        <Carousel.Item key={image.image_id}>
          <img
            className='d-block w-100'
            src={image.image.file_path}
            alt={image.image.file_name}
          />
          <CarouselButtonPrev
            className='carousel-control-prev'
            role='button'
            onClick={prev}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </CarouselButtonPrev>
          <CarouselButtonNext
            className='carousel-control-next'
            role='button'
            onClick={next}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </CarouselButtonNext>
        </Carousel.Item>
      ))}
    </StyledCarousel>
  );
};

export default ImageGallery;
