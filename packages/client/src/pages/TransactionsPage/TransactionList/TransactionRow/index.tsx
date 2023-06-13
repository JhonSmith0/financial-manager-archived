import { StyledInput } from "@/components/styled";
import {
  StyledTableRow,
  StyledTableRowItem,
} from "@/components/styled/StyledTable";
import { useTransactionRowInfos } from "@/hooks/transactions/useTransactionRowInfos";
import { ITransaction } from "@/interface";

interface Props {
  data: ITransaction;
}

export function TransactionRow({ data }: Props) {
  const { fromAccount, toAccount } = useTransactionRowInfos(data);

  return (
    <StyledTableRow>
      <StyledTableRowItem>
        <StyledInput
          value={new Date(data.date).toISOString().slice(0, 10)}
          type="date"
          disabled
        />
      </StyledTableRowItem>
      <StyledTableRowItem>R$ {data.amount}</StyledTableRowItem>
      <StyledTableRowItem>{data.description}</StyledTableRowItem>
      <StyledTableRowItem>{fromAccount?.name}</StyledTableRowItem>
      <StyledTableRowItem>{toAccount?.name}</StyledTableRowItem>
    </StyledTableRow>
  );
}
