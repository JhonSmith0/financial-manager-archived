import { TransactionList } from "@/components/TransactionList"
import { StyledHomeOutLet } from "@/components/styled/StyledHomeOutLet"
import { Title } from "@/components/styled/Title"
import { ITransactionWithAccounts } from "@/interface"
import {
    getTransactionService,
    removeTransactionService,
    updateTransactionService,
} from "@/services/transaction"
import { InferStateValueType, useHookstate } from "@hookstate/core"
import { useEffect } from "react"
import styled from "styled-components"
import { NewTransaction } from "./NewTransaction"

const StyledTransactionsPage = styled(StyledHomeOutLet)`
    padding-top: 2.8rem;

    /* overflow: auto; */
`

interface Props {
    onSubmit?(): any
}

export function TransactionsPage(props: Props) {
    const state = useHookstate<ITransactionWithAccounts[]>([])
    const data = state.get() as InferStateValueType<typeof state>

    async function read() {
        const result = await getTransactionService({})
        state.set(result.results)
    }

    useEffect(() => {
        ;(async () => {
            await read()
        })()
    }, [])

    return (
        <StyledTransactionsPage onSubmit={props.onSubmit}>
            <Title>Transactions</Title>
            <NewTransaction onSubmit={read} />
            <TransactionList
                data={data}
                onRemove={async (data) => {
                    await removeTransactionService(data)
                    await read()
                }}
                onUpdate={async (data) => {
                    await updateTransactionService(data)

                    await read()
                }}
                enableButtons={true}
            />
        </StyledTransactionsPage>
    )
}
