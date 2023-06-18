import { Input } from "./styled/Input"
import { IconList } from "./styled/IconList"
import { TableRowItem } from "./styled/StyledTable/TableRowItem"
import { TableRow } from "./styled/StyledTable/TableRow"
import {
    getTransactionsController,
    updateTransactionController,
} from "@/controllers/transaction"
import { useTransactionRow } from "@/hooks/transactions/useTransactionRow"
import { ITransactionWithAccounts } from "@/interface"
import { BiCog } from "react-icons/bi"
import { FiTrash2 } from "react-icons/fi"
import styled from "styled-components"
import { StyledUpdateTransaction, UpdateTransaction } from "./UpdateTransaction"

interface Props {
    data: ITransactionWithAccounts
}

export const StyledTransactionRow = styled(TableRow)`
    position: relative;
    ${StyledUpdateTransaction} {
        position: absolute;
    }
`

export function TransactionRow({ data }: Props) {
    const { isOpen, close, open, remove } = useTransactionRow(data)
    const { fromAccount, toAccount } = data

    return (
        <>
            {isOpen && (
                <UpdateTransaction
                    transaction={data}
                    onClose={close}
                    onSave={async (data) => {
                        await updateTransactionController(data)
                        await getTransactionsController({})
                        close()
                    }}
                />
            )}
            <StyledTransactionRow>
                <TableRowItem>
                    <Input
                        value={new Date(data.date).toISOString().slice(0, 10)}
                        type="date"
                        disabled
                    />
                </TableRowItem>
                <TableRowItem>R$ {data.amount}</TableRowItem>
                <TableRowItem>{data.description}</TableRowItem>
                <TableRowItem>{fromAccount?.name}</TableRowItem>
                <TableRowItem>{toAccount?.name}</TableRowItem>
                <TableRowItem>
                    <IconList>
                        <button onClick={remove}>
                            <FiTrash2 />
                        </button>
                        <button onClick={open}>
                            <BiCog />
                        </button>
                    </IconList>
                </TableRowItem>
            </StyledTransactionRow>
        </>
    )
}
