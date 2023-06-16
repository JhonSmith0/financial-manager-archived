import useLoginForm from "@/hooks/auth/useLoginForm";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import RegisterForm from "./RegisterForm";
import { StyledFieldSet, StyledInput, StyledLabel } from "./styled";

const StyledLoginForm = styled.form`
  width: max-content;
  margin: 5rem auto;
`;

export default function LoginForm(props: { children?: any }) {
  const nav = useNavigate();

  const {
    form: {
      onSubmit,
      register,
      formState: { errors },
    },
    loading,
    error,
  } = useLoginForm(() => nav("/"));

  return (
    <StyledLoginForm as={"form"} onSubmit={onSubmit}>
      <StyledFieldSet>
        <StyledLabel>Email</StyledLabel>
        <StyledInput type="email" {...register("email")} />
        <p>{errors.email?.message}</p>
      </StyledFieldSet>
      <StyledFieldSet>
        <StyledLabel>Password</StyledLabel>
        <StyledInput type="password" {...register("password")} />
        <p>{errors.password?.message}</p>
      </StyledFieldSet>
      <p>{error.value}</p>
      {props.children}
    </StyledLoginForm>
  );
}

