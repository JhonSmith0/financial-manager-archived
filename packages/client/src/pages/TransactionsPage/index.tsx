import { Title } from "@/components/styled/Title";
import { StyledHomeOutLet } from "@/components/styled/StyledHomeOutLet";
import { getTransactionsController } from "@/controllers/transaction/getTransactionsController";
import transactionsState from "@/state/transaction/transactionsState";
import { InferStateValueType, useHookstate } from "@hookstate/core";
import { useEffect } from "react";
import styled from "styled-components";
import { NewTransaction } from "./NewTransaction";
import { TransactionList } from "@/components/TransactionList";

const StyledTransactionsPage = styled(StyledHomeOutLet)`
	padding-top: 2.8rem;

	overflow: auto;
`;

export function TransactionsPage() {
	const state = useHookstate(transactionsState);
	const data = state.get() as InferStateValueType<typeof state>;

	console.log(data);

	useEffect(() => {
		(async () => {
			await getTransactionsController({});
		})();
	}, []);

	return (
		<StyledTransactionsPage>
			<Title>Transactions</Title>
			<NewTransaction />
			<TransactionList data={data} />
		</StyledTransactionsPage>
	);
}
