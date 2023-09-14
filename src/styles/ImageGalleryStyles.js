import styled from "styled-components";
import { Carousel } from "react-bootstrap";

export const StyledCarousel = styled(Carousel)`
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
