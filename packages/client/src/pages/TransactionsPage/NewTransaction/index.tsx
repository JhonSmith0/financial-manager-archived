import {
	StyledButton,
	StyledContainer,
	StyledFieldSet,
	StyledForm,
	StyledInput,
	StyledLabel,
	StyledTitle,
} from "@/components/styled";
import { useNewTransaction } from "@/hooks/transactions/useNewTransaction";
import accountsS, { search } from "@/state/accountsState";
import { useHookstate } from "@hookstate/core";
import { useEffect } from "react";
import styled from "styled-components";

export const StyledNewTransaction = styled(StyledContainer)`
  ${StyledTitle} {
    margin-bottom: 1.8rem;
  }

  ${StyledForm} {
    gap: 4rem;
  }

  ${StyledButton} {
    padding-block: 0.6rem;
    align-self: end;
  }
`;

export function NewTransactionForm() {
	const accountsState = useHookstate(accountsS);
	const accounts = accountsState.get();

	const {
		form: { register, onSubmit, watch },
	} = useNewTransaction();

	useEffect(() => {
		search({ name: "", page: 1 });
	}, []);

	const values = watch();



	return (
		<StyledNewTransaction onSubmit={onSubmit}>
			<StyledTitle size="medium">New Transaction</StyledTitle>
			<StyledForm direction="row">
				<StyledFieldSet>
					<StyledLabel>Date</StyledLabel>
					<StyledInput
						type="date"
						defaultValue={new Date().toISOString().slice(0, 10)}
						{...register("date", { valueAsDate: true })}
					/>
				</StyledFieldSet>
				<StyledFieldSet>
					<StyledLabel>Amount</StyledLabel>
					<StyledInput
						type="number"
						{...register("amount", { valueAsNumber: true })}
					/>
				</StyledFieldSet>
				<StyledFieldSet>
					<StyledLabel>Description</StyledLabel>
					<StyledInput type="text" {...register("description")} />
				</StyledFieldSet>
				<StyledFieldSet>
					<StyledLabel>From Account</StyledLabel>
					<select {...register("fromAccountId")}>
						{accounts.map((obj) => (
							<option key={obj.id} value={obj.id}>
								{obj.name}
							</option>
						))}
					</select>
				</StyledFieldSet>
				<StyledFieldSet>
					<StyledLabel>To Account</StyledLabel>
					<select {...register("toAccountId")}>
						{accounts.map((obj) => (
							<option key={obj.id} value={obj.id}>
								{obj.name}
							</option>
						))}
					</select>
				</StyledFieldSet>
				<StyledButton type="submit">Send</StyledButton>
			</StyledForm>
		</StyledNewTransaction>
	);
}
