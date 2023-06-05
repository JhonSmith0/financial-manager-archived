import {
  StyledContainer,
  StyledIconsList,
  StyledTitle,
} from "@/components/styled";
import StyledTable, {
  StyledTableRow,
  StyledTableRowItem,
} from "@/components/styled/StyledTable";
import styled from "styled-components";
import { HiOutlineTrash, HiOutlineCog } from "react-icons/hi";
import { ITransaction } from "@/interface";
import { TransactionRow } from "./TransactionRow";

export const StyledTransactionList = styled(StyledContainer)`
  ${StyledTableRow} {
    display: grid;
    grid-template-columns: repeat(5, 1fr) auto;
  }

  ${StyledIconsList} {
    svg {
      width: 2.4rem;
      height: 2.4rem;
      color: #222;
    }
  }
`;

interface Props {
  data: ITransaction[];
}
export function TransactionList(props: Props) {
  return (
    <StyledTransactionList>
      <StyledTitle size="medium">Transactions</StyledTitle>
      <StyledTable>
        <TransactionRow data={1 as any} />
      </StyledTable>
    </StyledTransactionList>
  );
}
