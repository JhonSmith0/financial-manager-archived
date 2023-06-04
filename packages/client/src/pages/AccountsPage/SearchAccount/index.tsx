import {
  StyledButton,
  StyledContainer,
  StyledFieldSet,
  StyledForm,
  StyledInput,
  StyledLabel,
} from "@/components/styled";
import { SearchAccount } from "@/interface";
import { search } from "@/state/accountsState";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

export const StyledSearchAccount = styled(StyledContainer);

export function SearchAccount() {
  const { register, handleSubmit, getValues } = useForm<SearchAccount>({
    defaultValues: {
      page: 1,
      name: "",
    },
  });

  useEffect(() => {
    search(getValues());
  }, []);

  return (
    <StyledForm
      onSubmit={handleSubmit(async (data) => {
        await search(data);
      })}
    >
      <StyledFieldSet>
        <StyledLabel>Name</StyledLabel>
        <StyledInput type="text" {...register("name")} />
      </StyledFieldSet>
      <StyledFieldSet>
        <StyledLabel>Page</StyledLabel>
        <StyledInput
          type="number"
          {...register("page", {
            valueAsNumber: true,
          })}
        />
      </StyledFieldSet>
      <StyledButton type="submit">Search</StyledButton>
    </StyledForm>
  );
}
