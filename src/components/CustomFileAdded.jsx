import React from "react";
import styled from "styled-components";

const InputAddedContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 490px;
  height: 48px;
  margin-bottom: 21px;
  align-items: center;
  justify-content: center;
  border: 2px dashed rgba(216, 221, 237, 1);
  color: rgba(147, 148, 170, 1);
  font-size: 14px;

  span {
    color: #45a049;
  }
`;

const InputFiles = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const CustomFileAdded = ({ register, validateFileType, errors }) => {
  return (
    <InputAddedContainer>
      <p>Нажмите на область или перетащите файлы сюда.</p>
      <p>5 МБ максимальный размер </p>

      <InputFiles
        type="file"
        name="file"
        id="file"
        accept="application/pdf"
        {...register("file", {
          required: true,
          validate: validateFileType,
        })}
        error={errors.file}
      />
      <label for="file">
        <span>Выбрать файл</span>
      </label>
      <p>(pdf)</p>
    </InputAddedContainer>
  );
};

export default CustomFileAdded;
