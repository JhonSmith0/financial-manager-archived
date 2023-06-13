import { StyledHomeOutLet, StyledTitle } from "@/components/styled";
import { getTransactionsController } from "@/controllers/transaction/getTransactionsController";
import transactionsState from "@/state/transaction/transactionsState";
import { InferStateValueType, useHookstate } from "@hookstate/core";
import { useEffect } from "react";
import styled from "styled-components";
import { NewTransactionForm } from "./NewTransaction";
import { TransactionList } from "./TransactionList";

const StyledTransactionsPage = styled(StyledHomeOutLet)`
  padding-top: 2.8rem;
`;

export function TransactionsPage() {
  const state = useHookstate(transactionsState);
  const data = state.get() as InferStateValueType<typeof state>;

  useEffect(() => {
    (async () => {
      await getTransactionsController({});
    })();
  }, []);

  return (
    <StyledTransactionsPage>
      <StyledTitle>Transactions</StyledTitle>
      <NewTransactionForm />
      <TransactionList data={data} />
    </StyledTransactionsPage>
  );
}
