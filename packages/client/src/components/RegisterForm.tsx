import useRegisterForm from "@/hooks/useRegisterForm";
import { IRegisterSchema } from "@/interface";
import { HTMLInputTypeAttribute, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { StyledFieldSet, StyledInput, StyledLabel } from "./styled";

export const StyledRegisterForm = styled.form`
  margin: 5rem auto;
  width: max-content;
`;

export default function RegisterForm(props: { children?: any }) {
  const nav = useNavigate();

  const {
    form: {
      register,
      onSubmit,
      formState: { errors },
    },
    loading,
    error,
  } = useRegisterForm(() => nav("/"));

  const Input = useCallback(
    function Input({
      type,
      registerKey,
    }: {
      registerKey: keyof IRegisterSchema;
      type: HTMLInputTypeAttribute;
    }) {
      return (
        <>
          <StyledInput type={type} {...register(registerKey)} />
          <p>{errors[registerKey]?.message}</p>
        </>
      );
    },
    [errors, register]
  );

  return (
    <StyledRegisterForm onSubmit={onSubmit}>
      <StyledFieldSet>
        <StyledLabel>Email</StyledLabel>
        <Input registerKey={"email"} type="email" />
      </StyledFieldSet>
      <StyledFieldSet>
        <StyledLabel>Name</StyledLabel>
        <Input registerKey={"name"} type="text" />
      </StyledFieldSet>
      <StyledFieldSet>
        <StyledLabel>Password</StyledLabel>
        <Input registerKey={"password"} type="password" />
      </StyledFieldSet>
      <p>{error.value}</p>
      {props.children}
    </StyledRegisterForm>
  );
}
