import {
  StyledTableRow,
  StyledTableRowItem,
} from "@/components/styled/StyledTable";
import { ITransaction } from "@/interface";

interface Props {
  data: ITransaction;
}

export function TransactionRow({ data }: Props) {
  return (
    <StyledTableRow>
      <StyledTableRowItem>{data.date}</StyledTableRowItem>
      <StyledTableRowItem>{data.amount}</StyledTableRowItem>
      <StyledTableRowItem>{data.description}</StyledTableRowItem>
      <StyledTableRowItem>{data.fromAccountId}</StyledTableRowItem>
      <StyledTableRowItem>{data.toAccountId}</StyledTableRowItem>
    </StyledTableRow>
  );
}
