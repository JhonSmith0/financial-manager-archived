import { NewTransactionForm } from "@/components/NewTransactionForm"
import { Button } from "@/components/styled/Button"
import { Container } from "@/components/styled/Container"
import { Form } from "@/components/styled/Form"
import { Title } from "@/components/styled/Title"
import { useAccounts } from "@/hooks/accounts/useAccounts"
import { useNewTransaction } from "@/hooks/transactions/useNewTransaction"
import { IAccount, TransactionCreate } from "@/interface"
import { search } from "@/state/accountsState"
import { useEffect } from "react"
import styled from "styled-components"

export const StyledNewTransaction = styled(Container)`
    ${Title} {
        margin-bottom: 1.8rem;
    }

    ${Form} {
        gap: 4rem;
    }

    ${Button} {
        padding-block: 0.6rem;
        align-self: end;
    }
`

interface Props {
    onSubmit?(data: TransactionCreate): any
    fromAccount: IAccount[]
    toAccount: IAccount[]
}

export function NewTransaction(props: Props) {
    const { form, onSubmit } = useNewTransaction()

    return (
        <StyledNewTransaction>
            <Title size="medium">New Transaction</Title>
            <NewTransactionForm
                fromAccount={props.fromAccount}
                toAccount={props.toAccount}
                form={form}
                attrs={{
                    async onSubmit(e) {
                        await onSubmit(e)
                        props.onSubmit?.(form.getValues())
                    },
                }}
            />
        </StyledNewTransaction>
    )
}
