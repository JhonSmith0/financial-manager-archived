import { IAccount } from "@/interface";
import { createAccount } from "@/services/account";
import { addAccount } from "@/state/accountsState";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
  StyledButton,
  StyledContainer,
  StyledFieldSet,
  StyledForm,
  StyledInput,
  StyledLabel,
  StyledTitle,
} from "@/components/styled";

export const StyledNewAccount = styled(StyledContainer)``;

export function NewAccount() {
  const { register, handleSubmit, reset } =
    useForm<Pick<IAccount, "name" | "description">>();

  return (
    <StyledNewAccount>
      <StyledTitle>New Account</StyledTitle>
      <StyledForm
        onSubmit={handleSubmit(async (data) => {
          const acc = await createAccount(data);
          addAccount(acc);
          reset();
        })}
      >
        <StyledFieldSet>
          <StyledFieldSet>Name</StyledFieldSet>
          <StyledInput type="text" {...register("name")} />
        </StyledFieldSet>
        <StyledFieldSet>
          <StyledLabel>Description</StyledLabel>
          <StyledInput type="text" {...register("description")} />
        </StyledFieldSet>
        <StyledButton type="submit">Create</StyledButton>
      </StyledForm>
    </StyledNewAccount>
  );
}