import { ITransactionWithAccounts } from "@/interface"
import { useHookstate } from "@hookstate/core"
import { BiCog } from "react-icons/bi"
import { FiTrash2 } from "react-icons/fi"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { StyledUpdateTransaction } from "./UpdateTransaction"
import { IconList } from "./styled/IconList"
import { Input } from "./styled/Input"
import { TableRow } from "./styled/StyledTable/TableRow"
import { TableRowItem } from "./styled/StyledTable/TableRowItem"

interface Props {
    data: ITransactionWithAccounts
    onRemoveButton(transaction: ITransactionWithAccounts): any
    onEditButton(transaction: ITransactionWithAccounts): any
    enableButtons?: boolean
}

export const StyledTransactionRow = styled(TableRow)`
    /* position: relative; */
    ${StyledUpdateTransaction} {
        position: absolute;
    }
`

export function TransactionRow({
    data,
    enableButtons = false,

    onEditButton,
    onRemoveButton,
}: Props) {
    const { fromAccount, toAccount } = data

    const editingState = useHookstate(false)
    const editing = editingState.get()

    return (
        <>
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
                            <button onClick={onRemoveButton.bind(null, data)}>
                                <FiTrash2 />
                            </button>
                            <button onClick={onEditButton.bind(null, data)}>
                                <BiCog />
                            </button>
                        </IconList>
                    </TableRowItem>
                )}
            </StyledTransactionRow>
        </>
    )
}
