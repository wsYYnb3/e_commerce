import styled from "styled-components";
import { Carousel } from "react-bootstrap";

export const StyledCarousel = styled(Carousel)`
  margin-bottom: 1.2rem;
  margin-top: 2rem;
  .carousel-item {
    img {
      width: 90%;
      height: 90%;
      object-fit: cover;
      border-radius: 10px;
    }
  }
  @media (min-width: 1125px) {
    height: 400px;
    width: 400px;

    .carousel-item {
      height: 90%;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    height: 500px;
    width: 500px;
    .carousel-item {
      height: 500px;
    }
  }

  @media (max-width: 1124px) {
    height: 500px;
    width: 500px;
    .carousel-item {
      height: 500px;
    }
  }
  @media (max-width: 768px) {
    height: 350px;
    width: 350px;
    .carousel-item {
      height: 350px;
    }
  }

  img {
    width: 100%;
    height: 100%;
  }

  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    display: none;
  }
`;

export const CarouselButton = styled.button`
  background: none;
  border: none;
  color: #000;
  position: absolute;
  top: 50%;
  z-index: 5;
  font-size: 2rem;
`;

export const CarouselButtonPrev = styled(CarouselButton)`
  left: 10px;
`;

export const CarouselButtonNext = styled(CarouselButton)`
  right: 10px;
`;
