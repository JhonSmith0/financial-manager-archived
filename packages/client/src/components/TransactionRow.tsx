import { StyledIconsList, StyledInput } from "@/components/styled";
import {
  StyledTableRow,
  StyledTableRowItem,
} from "@/components/styled/StyledTable";
import {
  getTransactionsController,
  updateTransactionController,
} from "@/controllers/transaction";
import { useTransactionRow } from "@/hooks/transactions/useTransactionRow";
import { ITransactionWithAccounts } from "@/interface";
import { BiCog } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import styled from "styled-components";
import {
  StyledUpdateTransaction,
  UpdateTransaction,
} from "./UpdateTransaction";

interface Props {
  data: ITransactionWithAccounts;
}

export const StyledTransactionRow = styled(StyledTableRow)`
  position: relative;
  ${StyledUpdateTransaction} {
    position: absolute;
  }
`;

export function TransactionRow({ data }: Props) {
  const { isOpen, close, open, remove } = useTransactionRow(data);
  const { fromAccount, toAccount } = data;

  return (
    <>
      {isOpen && (
        <UpdateTransaction
          transaction={data}
          onClose={close}
          onSave={async (data) => {
            await updateTransactionController(data);
            await getTransactionsController({});
            close();
          }}
        />
      )}
      <StyledTransactionRow>
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
            <button onClick={open}>
              <BiCog />
            </button>
          </StyledIconsList>
        </StyledTableRowItem>
      </StyledTransactionRow>
    </>
  );
}

