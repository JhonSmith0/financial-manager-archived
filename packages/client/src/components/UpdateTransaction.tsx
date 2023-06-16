import { useAccounts } from "@/hooks/accounts/useAccounts";
import { ITransaction, ITransactionWithAccounts } from "@/interface";
import updateTransactionSchema from "@/schemas/transaction/updateTransactionSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Card } from "./Card";
import {
	StyledButton,
	StyledCard,
	StyledFieldSet,
	StyledForm,
	StyledIconsList,
	StyledInput,
	StyledLabel,
} from "./styled";

interface Props {
  transaction: ITransactionWithAccounts;
  onClose(): any;
  onSave(data: ITransaction): any;
}

export const StyledUpdateTransaction = styled(StyledCard)`
  ${StyledInput} {
    width: 100%;
  }
  ${StyledFieldSet} {
    margin-bottom: 1.8rem;
  }
  ${StyledIconsList} {
    margin-left: auto;
  }
`;

export function UpdateTransaction(props: Props) {
	const { register, handleSubmit } = useForm<ITransaction>({
		defaultValues: {
			...props.transaction,
			date: new Date().toISOString().slice(0, 10),
		},
		resolver: yupResolver(updateTransactionSchema),
	});

	const { accounts } = useAccounts(
		[props.transaction.fromAccount, props.transaction.toAccount],
		[props.transaction]
	);

	return (
		<StyledUpdateTransaction onSubmit={handleSubmit(props.onSave)}>
			<Card title="Update Transaction" onClose={props.onClose}>
				<StyledForm>
					<StyledFieldSet>
						<StyledLabel>Id</StyledLabel>
						<StyledInput disabled {...register("id")} />
					</StyledFieldSet>
					<StyledFieldSet>
						<StyledLabel>Date</StyledLabel>
						<StyledInput
							{...register("date", { valueAsDate: true })}
							type="date"
						/>
					</StyledFieldSet>
					<StyledFieldSet>
						<StyledLabel>Description</StyledLabel>
						<StyledInput {...register("description")} />
					</StyledFieldSet>
					<StyledFieldSet>
						<StyledLabel>Amount</StyledLabel>
						<StyledInput {...register("amount", { valueAsNumber: true })} />
					</StyledFieldSet>
					<StyledFieldSet>
						<StyledLabel>From Account</StyledLabel>
						<select {...register("fromAccountId")}>
							{accounts.map((each) => (
								<option value={each.id} key={each.id}>
									{each.name}
								</option>
							))}
						</select>
					</StyledFieldSet>
					<StyledFieldSet>
						<StyledLabel>To Account</StyledLabel>
						<select {...register("toAccountId")}>
							{accounts.map((each) => (
								<option value={each.id} key={each.id}>
									{each.name}
								</option>
							))}
						</select>
					</StyledFieldSet>
					<StyledIconsList>
						<StyledButton>
							<span>Salvar</span>
						</StyledButton>
						<StyledButton onClick={props.onClose}>
							<span>Sair</span>
						</StyledButton>
					</StyledIconsList>
				</StyledForm>
			</Card>
		</StyledUpdateTransaction>
	);
}

