import { Container } from "@/components/styled/Container";
import { Title } from "@/components/styled/Title";
import { Form } from "@/components/styled/Form";
import { FieldSet } from "@/components/styled/FieldSet";
import { Label } from "@/components/styled/Label";
import { Input } from "@/components/styled/Input";
import { Button } from "@/components/styled/Button";
import { useNewTransaction } from "@/hooks/transactions/useNewTransaction";
import accountsS, { search } from "@/state/accountsState";
import { useHookstate } from "@hookstate/core";
import { useEffect } from "react";
import styled from "styled-components";

export const StyledNewTransaction = styled(Container)`
	${Title} {
		margin-bottom: 1.8rem;
	}

	${Form} {
		gap: 4rem;
	}

	${Button} {
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
			<Title size="medium">New Transaction</Title>
			<Form direction="row">
				<FieldSet>
					<Label>Date</Label>
					<Input
						type="date"
						defaultValue={new Date().toISOString().slice(0, 10)}
						{...register("date", { valueAsDate: true })}
					/>
				</FieldSet>
				<FieldSet>
					<Label>Amount</Label>
					<Input
						type="number"
						{...register("amount", { valueAsNumber: true })}
					/>
				</FieldSet>
				<FieldSet>
					<Label>Description</Label>
					<Input type="text" {...register("description")} />
				</FieldSet>
				<FieldSet>
					<Label>From Account</Label>
					<select {...register("fromAccountId")}>
						{accounts.map((obj) => (
							<option key={obj.id} value={obj.id}>
								{obj.name}
							</option>
						))}
					</select>
				</FieldSet>
				<FieldSet>
					<Label>To Account</Label>
					<select {...register("toAccountId")}>
						{accounts.map((obj) => (
							<option key={obj.id} value={obj.id}>
								{obj.name}
							</option>
						))}
					</select>
				</FieldSet>
				<Button type="submit">Send</Button>
			</Form>
		</StyledNewTransaction>
	);
}
