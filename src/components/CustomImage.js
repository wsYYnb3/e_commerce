import React, { useState } from "react";
import LoadingIndicator from "./LoadingIndicator";
import { getImageById } from "../utils/utils";
const CustomImage = ({ imageId, altText }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const placeholderImage = "https://via.placeholder.com/150";
  const imageUrl = imageId ? getImageById(imageId) : placeholderImage;

  return (
    <>
      {isImageLoading && <LoadingIndicator />}
      <img
        src={imageUrl}
        alt={altText}
        onLoad={() => {
          console.log("Image Loaded:", imageId);
          setIsImageLoading(false);
        }}
        style={{ display: isImageLoading ? "none" : "block" }}
      />
    </>
  );
};

export default CustomImage;
