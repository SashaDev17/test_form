import React, { useEffect, useState } from "react";
import styled from "styled-components";

const InputFilesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 490px;
  height: 136px;
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

const CustomInputFiles = ({ register, errors }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    document.getElementById("file").addEventListener("change", function () {
      if (this.value) {
        setSelectedFile(this.value);
      }
    });
  }, []);

  const validateFileType = (value) => {
    if (value[0].type !== "application/pdf") {
      alert("Пожалуйста, загрузите файл в формате PDF");
    }
    return true;
  };

  return (
    <InputFilesContainer>
      <p>Нажмите на область или перетащите файлы сюда.</p>
      <p>5 МБ максимальный размер </p>

      <InputFiles
        type="file"
        name="file"
        id="file"
        accept=".pdf"
        {...register("file", {
          required: true,
          validate: validateFileType,
        })}
        error={errors.file}
      />
      <label htmlFor="file">
        <span>{selectedFile === null ? "Выбрать файл" : selectedFile}</span>
      </label>
      <p>(pdf)</p>
    </InputFilesContainer>
  );
};

export default CustomInputFiles;
