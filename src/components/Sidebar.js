import React from "react";
import { Form } from "react-bootstrap";
import { FaListUl } from "react-icons/fa";
import { RadioLabel, radioHighlight } from "../styles/StoreStyles";
import { useTranslation } from "react-i18next";

const Sidebar = ({ categories, selectedCategories, setSelectedCategories }) => {
  const { t } = useTranslation();

  const handleChange = (category) => {
    if (selectedCategories.some((cat) => cat.id === category.id)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat.id !== category.id)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div>
      <h5>Categories</h5>
      {categories.map((category) => {
        if (category.parent_id) {
          return (
            <div key={category.id}>
              <Form.Check
                type='checkbox'
                id={category.id}
                label={
                  <RadioLabel
                    style={
                      selectedCategories.some((cat) => cat.id === category.id)
                        ? { animation: `${radioHighlight} 0.5s forwards` }
                        : {}
                    }
                  >
                    <FaListUl className='mr-2' /> {t(category.name_key)}
                  </RadioLabel>
                }
                checked={selectedCategories.some(
                  (cat) => cat.id === category.id
                )}
                onChange={() => handleChange(category)}
              />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Sidebar;
