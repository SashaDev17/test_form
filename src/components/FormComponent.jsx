import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import CustomInputFiles from "./CustomInputFiles";
import CustomSelect from "./CustomSelect";

// Styles

const Headers = styled.label`
  color: rgba(147, 148, 170, 1);
  font-size: 14px;
  font-weight: 600;
`;

const FormWrapper = styled.div`
  margin: 0 auto;
  background: #f0f2f5;
  padding: 24px;
  border-radius: 12px;
  width: 538px;
  max-height: 827px;
`;

const FormField = styled.div`
  margin-bottom: 9px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const Input = styled.input`
  font-size: 16px;
  margin-top: 4px;
  height: 44px;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  ${(props) => props.error && "border-color: red;"}

  &:focus {
    outline: solid 1px #45a049;
  }
`;

const Button = styled.button`
  background-color: rgba(147, 148, 170, 1);
  color: white;
  font-weight: 600;
  padding: 10px 145px;
  border: none;
  width: 490px;
  height: 40px;
  justify-content: center;
  border-radius: 40px;
  cursor: pointer;
  transition: all.3s;
  &:hover {
    background-color: #45a049;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
`;

// Styles

const FormComponent = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const hasAccreditation = watch("hasAccreditation", false);
  const desiredAmount = watch("desiredAmount", "0");
  const sanitizedAmount = parseFloat(desiredAmount.replace(/\s/g, "") || 0);
  const totalAmount = hasAccreditation
    ? sanitizedAmount * 1.2
    : sanitizedAmount;

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField>
          <h1>Заполните форму</h1>
        </FormField>
        <FormField>
          <Headers>
            ФИО<span style={{ color: "red" }}>*</span>
          </Headers>
          <Input
            {...register("fio", {
              required: true,
              minLength: 10,
              maxLength: 30,
            })}
            placeholder="Заполнить"
            error={errors.fio}
          />
          {errors.fio && (
            <ErrorMessage>ФИО должно быть от 10 до 30 символов.</ErrorMessage>
          )}
        </FormField>

        <FormField>
          <Headers>
            Рейтинг<span style={{ color: "red" }}>*</span>
          </Headers>
          <Input
            type="number"
            {...register("rating", { required: true, min: 1, max: 100 })}
            error={errors.rating}
            placeholder="Введите значение от 1 до 100"
          />
          {errors.rating && (
            <ErrorMessage>Рейтинг должен быть числом от 1 до 100.</ErrorMessage>
          )}
        </FormField>

        <FormField>
          <Checkbox type="checkbox" {...register("hasAccreditation")} />
          <label>Имеется ли аккредитация</label>
        </FormField>
        <FormField>
          <Headers>
            Желаемая сумма, рубли<span style={{ color: "red" }}>*</span>
          </Headers>
          <Input
            type="text"
            {...register("desiredAmount", {
              required: true,
              pattern: /^[0-9\s]+(\.[0-9]{1,3})?$/,
            })}
            error={errors.desiredAmount}
            placeholder="0"
          />
          {errors.desiredAmount && (
            <ErrorMessage>
              Введите корректную сумму (например, 100 123.22).
            </ErrorMessage>
          )}
        </FormField>
        <FormField>
          <Headers>
            Категория<span style={{ color: "red" }}>*</span>
          </Headers>
          <CustomSelect />
          {errors.category && (
            <ErrorMessage>Выбор категории обязателен.</ErrorMessage>
          )}
        </FormField>
        <FormField>
          <Headers>Комментарий</Headers>
          <Input
            {...register("comment", { maxLength: 200 })}
            placeholder="Заполнить"
          />
        </FormField>
        <FormField>
          <label>Загрузите файл</label>
          <CustomInputFiles register={register} errors={errors} />
        </FormField>
        <FormField>
          <label style={{ fontSize: "20px", fontWeight: "600" }}>
            Итоговая сумма{" "}
            {totalAmount.toLocaleString("ru-ru").replace(",", ".")}
          </label>
        </FormField>

        <Button type="submit">Отправить</Button>
      </form>
    </FormWrapper>
  );
};

export default FormComponent;
