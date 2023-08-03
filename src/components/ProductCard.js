import React from "react";
import { Card } from "react-bootstrap";

const ProductCard = ({ product }) => (
  <Card style={{ width: "18rem" }}>
    <Card.Img variant='top' src={product.image} />
    <Card.Body>
      <Card.Title>{product.name}</Card.Title>
      <Card.Text>{product.description}</Card.Text>
      <Card.Text>
        {product.price} ${product.discount ? ` (-${product.discount}$)` : ""}
      </Card.Text>
    </Card.Body>
  </Card>
);

export default ProductCard;
