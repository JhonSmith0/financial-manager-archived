import { Container } from "@/components/styled/Container"
import { Title } from "@/components/styled/Title"
import { Form } from "@/components/styled/Form"
import { Button } from "@/components/styled/Button"
import { useNewTransaction } from "@/hooks/transactions/useNewTransaction"
import { search } from "@/state/accountsState"
import { useEffect } from "react"
import styled from "styled-components"
import { NewTransactionForm } from "@/components/NewTransactionForm"
import { useAccounts } from "@/hooks/accounts/useAccounts"

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

export function NewTransaction() {
    const { accounts } = useAccounts()

    const { form, onSubmit } = useNewTransaction()

    useEffect(() => {
        search({ name: "" })
    }, [])

    return (
        <StyledNewTransaction>
            <Title size="medium">New Transaction</Title>
            <NewTransactionForm
                accounts={accounts}
                form={form}
                attrs={{
                    onSubmit,
                }}
            />
        </StyledNewTransaction>
    )
}
