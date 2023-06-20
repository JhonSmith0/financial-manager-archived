import { IconList } from "./styled/IconList"
import { TableRow } from "./styled/StyledTable/TableRow"
import { Table } from "./styled/StyledTable/Table"
import {
    ITransaction,
    ITransactionWithAccounts,
    RemoveTransaction,
    UpdateTransaction,
} from "@/interface"
import styled from "styled-components"
import { TransactionRow } from "./TransactionRow"

export const StyledTransactionList = styled.div`
    ${TableRow} {
        display: grid;
        grid-template-columns: repeat(5, 1fr) auto;
    }

    ${Table} {
        max-height: 100vh;
        overflow-y: auto;
    }

    ${IconList} {
        svg {
            width: 2.4rem;
            height: 2.4rem;
            /* color: #222; */
        }
    }
`

interface Props {
    data: ITransactionWithAccounts[]
    onRemove(transaction: RemoveTransaction): any
    onUpdate(transaction: UpdateTransaction): any
    enableButtons?: boolean
}

export function TransactionList({
    data,
    onRemove,
    onUpdate,
    enableButtons = false,
}: Props) {
    return (
        <StyledTransactionList>
            {!!data.length && (
                <Table>
                    {data.map((e) => (
                        <TransactionRow
                            data={e}
                            key={e.id}
                            onRemove={onRemove}
                            onUpdate={onUpdate}
                            enableButtons={enableButtons}
                        />
                    ))}
                </Table>
            )}
        </StyledTransactionList>
    )
}
