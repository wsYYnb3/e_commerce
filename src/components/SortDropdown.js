import React from "react";
import { Dropdown } from "react-bootstrap";
import { FaSortAmountDownAlt } from "react-icons/fa";

const SortDropdown = ({ onSelect }) => (
  <Dropdown onSelect={onSelect}>
    <Dropdown.Toggle variant='outline-secondary' id='dropdown-basic'>
      <FaSortAmountDownAlt /> Sort By
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item eventKey='low'>Price: Low to High</Dropdown.Item>
      <Dropdown.Item eventKey='high'>Price: High to Low</Dropdown.Item>
      <Dropdown.Item eventKey='name'>Name</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export default SortDropdown;
