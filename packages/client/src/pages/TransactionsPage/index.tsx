import { StyledHomeOutLet, StyledTitle } from "@/components/styled";
import styled from "styled-components";
import { NewTransaction } from "./NewTransaction";
import { TransactionList } from "./TransactionList";

const StyledTransactionsPage = styled(StyledHomeOutLet)`
  padding-top: 2.8rem;
`;

export function TransactionsPage() {
  return (
    <StyledTransactionsPage>
      <StyledTitle>Transactions</StyledTitle>
      <NewTransaction />
      <TransactionList data={[]} />
    </StyledTransactionsPage>
  );
}
