import { useAccounts } from "@/hooks/accounts/useAccounts";
import { ITransaction, ITransactionWithAccounts } from "@/interface";
import updateTransactionSchema from "@/schemas/transaction/updateTransactionSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Card } from "./Card";
import { Form } from "./styled/Form";
import { FieldSet } from "./styled/FieldSet";
import { Label } from "./styled/Label";
import { Input } from "./styled/Input";
import { Button } from "./styled/Button";
import { IconList } from "./styled/IconList";

interface Props {
	transaction: ITransactionWithAccounts;
	onClose(): any;
	onSave(data: ITransaction): any;
}

export const StyledUpdateTransaction = styled(Card)`
	${Input} {
		width: 100%;
	}
	${FieldSet} {
		margin-bottom: 1.8rem;
	}
	${IconList} {
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

	const { accounts } = useAccounts([], [props]);

	return (
		<StyledUpdateTransaction onSubmit={handleSubmit(props.onSave)}>
			<Card title="Update Transaction" onClose={props.onClose}>
				<Form>
					<FieldSet>
						<Label>Id</Label>
						<Input disabled {...register("id")} />
					</FieldSet>
					<FieldSet>
						<Label>Date</Label>
						<Input {...register("date", { valueAsDate: true })} type="date" />
					</FieldSet>
					<FieldSet>
						<Label>Description</Label>
						<Input {...register("description")} />
					</FieldSet>
					<FieldSet>
						<Label>Amount</Label>
						<Input {...register("amount", { valueAsNumber: true })} />
					</FieldSet>
					<FieldSet>
						<Label>From Account</Label>
						<select {...register("fromAccountId")}>
							{accounts.map((each) => (
								<option value={each.id} key={each.id}>
									{each.name}
								</option>
							))}
						</select>
					</FieldSet>
					<FieldSet>
						<Label>To Account</Label>
						<select {...register("toAccountId")}>
							{accounts.map((each) => (
								<option value={each.id} key={each.id}>
									{each.name}
								</option>
							))}
						</select>
					</FieldSet>
					<IconList>
						<Button>
							<span>Salvar</span>
						</Button>
						<Button onClick={props.onClose}>
							<span>Sair</span>
						</Button>
					</IconList>
				</Form>
			</Card>
		</StyledUpdateTransaction>
	);
}
