import {
    ITransactionWithAccounts,
    RemoveTransaction,
    UpdateTransaction,
} from "@/interface"
import { useHookstate } from "@hookstate/core"
import Draggable from "react-draggable"
import styled from "styled-components"
import { StyledCard } from "./Card"
import { TransactionRow } from "./TransactionRow"
import { UpdateTransaction as UpdateTransactionComponent } from "./UpdateTransaction"
import { IconList } from "./styled/IconList"
import { Table } from "./styled/StyledTable/Table"
import { TableRow } from "./styled/StyledTable/TableRow"

export const StyledTransactionList = styled.div`
    ${TableRow} {
        display: grid;
        grid-template-columns: repeat(5, 1fr) auto;
    }

    ${Table} {
        max-height: 100vh;
        overflow-y: auto;
    }

    ${StyledCard} {
        position: absolute;
        z-index: 999;
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
    const editing = useHookstate<ITransactionWithAccounts | null>(null)
    const beingEdited = editing.ornull?.get()

    function onRemoveButton(data: ITransactionWithAccounts) {
        onRemove(data)
    }
    function onEditButton(data: ITransactionWithAccounts) {
        editing.set({ ...data })
    }

    return (
        <StyledTransactionList>
            {beingEdited && (
                <Draggable allowAnyClick={false} handle={"header"} scale={1.1}>
                    <div>
                        <UpdateTransactionComponent
                            onClose={() => editing.set(null)}
                            onSave={(data) => {
                                editing.set(null)
                                onUpdate(data)
                            }}
                            transaction={beingEdited}
                        />
                    </div>
                </Draggable>
            )}
            {!!data.length && (
                <Table>
                    {data.map((e) => (
                        <TransactionRow
                            data={e}
                            key={e.id}
                            onRemoveButton={onRemoveButton}
                            onEditButton={onEditButton}
                            enableButtons={enableButtons}
                        />
                    ))}
                </Table>
            )}
        </StyledTransactionList>
    )
}
