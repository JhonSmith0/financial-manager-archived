import { useTransactionRow } from "@/hooks/transactions/useTransactionRow"
import {
    IAccount,
    ITransactionWithAccounts,
    RemoveTransaction,
    UpdateTransaction,
} from "@/interface"
import { BiCog } from "react-icons/bi"
import { FiTrash2 } from "react-icons/fi"
import { Link } from "react-router-dom"
import styled from "styled-components"
import {
    StyledUpdateTransaction,
    UpdateTransaction as UpdateTransactionComponent,
} from "./UpdateTransaction"
import { IconList } from "./styled/IconList"
import { Input } from "./styled/Input"
import { TableRow } from "./styled/StyledTable/TableRow"
import { TableRowItem } from "./styled/StyledTable/TableRowItem"
import { remove } from "@/state/accountsState"
import { useHookstate } from "@hookstate/core"

interface Props {
    data: ITransactionWithAccounts
    onRemove(transaction: RemoveTransaction): any
    onUpdate(transaction: UpdateTransaction): any
    enableButtons?: boolean
}

export const StyledTransactionRow = styled(TableRow)`
    position: relative;
    ${StyledUpdateTransaction} {
        position: absolute;
    }
`

export function TransactionRow({
    data,
    onRemove,
    onUpdate,
    enableButtons = false,
}: Props) {
    const { fromAccount, toAccount } = data

    const editingState = useHookstate(false)
    const editing = editingState.get()

    return (
        <>
            {editing && (
                <UpdateTransactionComponent
                    onClose={editingState.set.bind(null, false)}
                    onSave={onUpdate.bind(null)}
                    transaction={data}
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
                <TableRowItem>
                    <Link to={`/account/${fromAccount.id}`}>
                        {fromAccount?.name}
                    </Link>
                </TableRowItem>
                <TableRowItem>
                    <Link to={`/account/${toAccount.id}`}>
                        {toAccount?.name}
                    </Link>
                </TableRowItem>
                {enableButtons && (
                    <TableRowItem>
                        <IconList>
                            <button onClick={onRemove.bind(null, data)}>
                                <FiTrash2 />
                            </button>
                            <button onClick={editingState.set.bind(null, true)}>
                                <BiCog />
                            </button>
                        </IconList>
                    </TableRowItem>
                )}
            </StyledTransactionRow>
        </>
    )
}
