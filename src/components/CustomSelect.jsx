import React, { useState } from "react";
import styled from "styled-components";

const SelectWrapper = styled.div`
  position: relative;
  width: 490px;
  outline: none;
`;

const SelectButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 6px;
  background-color: white;
  font-size: 16px;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OptionsWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border: none;
  margin-top: 5px;
  border-radius: 6px;
  background-color: white;
  z-index: 1;
`;

const Option = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const DropdownIcon = styled.span`
  margin-left: auto;
`;

const CustomSelect = () => {
  const categories = [
    "Категория 1",
    "Категория 2",
    "Категория 3",
    "Категория 4",
    "Категория 5",
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <SelectWrapper>
      <SelectButton onClick={toggleOpen}>
        {selectedOption || "Выбрать"}
        <DropdownIcon>{isOpen ? "▲" : "▼"}</DropdownIcon>
      </SelectButton>
      {isOpen && (
        <OptionsWrapper>
          {categories.map((category, index) => (
            <Option key={index} onClick={() => handleOptionClick(category)}>
              {category}
            </Option>
          ))}
        </OptionsWrapper>
      )}
    </SelectWrapper>
  );
};

export default CustomSelect;
