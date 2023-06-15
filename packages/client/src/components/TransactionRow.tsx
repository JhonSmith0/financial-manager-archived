import { StyledIconsList, StyledInput } from "@/components/styled";
import {
  StyledTableRow,
  StyledTableRowItem,
} from "@/components/styled/StyledTable";
import { useTransactionRow } from "@/hooks/transactions/useTransactionRow";
import { ITransaction } from "@/interface";
import { FiTrash2 } from "react-icons/fi";
import { BiCog } from "react-icons/bi";
import { removeTransactionController } from "@/controllers/transaction/removeTransactionController";

interface Props {
  data: ITransaction;
}

export function TransactionRow({ data }: Props) {
  const { fromAccount, toAccount, remove } = useTransactionRow(data);

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
      <StyledTableRowItem>
        <StyledIconsList>
          <button onClick={remove}>
            <FiTrash2 />
          </button>
          <button>
            <BiCog />
          </button>
        </StyledIconsList>
      </StyledTableRowItem>
    </StyledTableRow>
  );
}
