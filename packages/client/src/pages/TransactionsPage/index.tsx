import { StyledHomeOutLet, StyledTitle } from "@/components/styled";
import styled from "styled-components";
import { NewTransactionForm } from "./NewTransaction";
import { TransactionList } from "./TransactionList";
import { InferStateValueType, useHookstate } from "@hookstate/core";
import transactionsState from "@/state/transaction/transactionsState";

const StyledTransactionsPage = styled(StyledHomeOutLet)`
  padding-top: 2.8rem;
`;

export function TransactionsPage() {
  const state = useHookstate(transactionsState);
  const data = state.get() as InferStateValueType<typeof state>;

  return (
    <StyledTransactionsPage>
      <StyledTitle>Transactions</StyledTitle>
      <NewTransactionForm />
      <TransactionList data={data} />
    </StyledTransactionsPage>
  );
}
