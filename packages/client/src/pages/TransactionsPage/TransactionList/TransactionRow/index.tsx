import { StyledTableRow, StyledTableRowItem } from "@/components/styled/StyledTable";
import { ITransaction } from "@/interface";

interface Props {
    data: ITransaction;
}

export function TransactionRow(props: Props) {
  return (
    <StyledTableRow>
      <StyledTableRowItem>Data</StyledTableRowItem>
      <StyledTableRowItem>Amount</StyledTableRowItem>
      <StyledTableRowItem>Description</StyledTableRowItem>
      <StyledTableRowItem>From Account</StyledTableRowItem>
      <StyledTableRowItem>To Account</StyledTableRowItem>
    </StyledTableRow>
  );
}
