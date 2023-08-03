import React from 'react';
import { Form } from 'react-bootstrap';
import { FaListUl } from 'react-icons/fa';
import { RadioLabel, radioHighlight } from '../styles/StoreStyles';

const Sidebar = ({ categories, selectedCategories, setSelectedCategories }) => {
  const handleChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div>
      <h5>Categories</h5>
      {categories.map((category, index) => (
        <div key={index}>
          <Form.Check 
            type="checkbox"
            id={`category-${index}`}
            label={
              <RadioLabel 
                style={selectedCategories.includes(category) ? { animation: `${radioHighlight} 0.5s forwards` } : {}}
              >
                <FaListUl className="mr-2" /> {category}
              </RadioLabel>
            }
            checked={selectedCategories.includes(category)}
            onChange={() => handleChange(category)}
          />
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
