import { NewTransaction } from "@/components/NewTransaction"
import { TransactionList } from "@/components/TransactionList"
import { UpdateAccount, StyledUpdateAccount } from "@/components/UpdateAccount"
import { Balance } from "@/components/styled/Balance"
import { Button } from "@/components/styled/Button"
import { Container } from "@/components/styled/Container"
import { Content } from "@/components/styled/Content"
import { RedButton } from "@/components/styled/RedButton"
import { StyledHomeOutLet } from "@/components/styled/StyledHomeOutLet"
import { Title } from "@/components/styled/Title"
import { useAccount } from "@/hooks/accounts/useAccount"
import { useAccounts } from "@/hooks/accounts/useAccounts"
import { useUpdateAccount } from "@/hooks/accounts/useUpdateAccount"
import { AccountPageInfos } from "@/loaders/accountPage"
import { removeAccount } from "@/services/account"
import {
    removeTransactionService,
    updateTransactionService,
} from "@/services/transaction"
import { useLoaderData, useNavigate } from "react-router-dom"
import styled from "styled-components"

export const StyledAccountPage = styled(StyledHomeOutLet)`
    & > ${Title} {
        line-height: 1.2;
        margin: 0;
        text-transform: capitalize;
    }

    & > ${Content} {
        padding-inline: 0;
    }

    ${Container} {
        padding: 0;
        &:not(:last-child) {
            margin-bottom: 4.8rem;
        }
        ${Balance} {
            margin-left: 1.8rem;
            font-size: 1.6rem;
            font-weight: 400;
        }
    }

    ${StyledUpdateAccount} {
        ${Button} {
            padding: 0.5rem;
            margin-block: 2.2rem;
        }
    }

    ${RedButton} {
        padding: 0.8rem;
    }
`

export function AccountPage() {
    const data = useLoaderData() as AccountPageInfos

    const infos = useAccount(data.account.id)
    const nav = useNavigate()

    const { form, onSubmit } = useUpdateAccount(data.account)

    async function deleteAccount() {
        if (
            !confirm(
                `This will delete this account and all its transactions are you sure ?`
            )
        )
            return
        await removeAccount(data.account.id)
        nav("/accounts")
    }

    const { accounts } = useAccounts()

    return (
        <StyledAccountPage>
            <Title size="large">
                <span>{infos.account?.name}</span>
            </Title>
            <Content>
                <p>{infos.account?.description}</p>
            </Content>
            <Container>
                <NewTransaction
                    fromAccount={[data.account]}
                    onSubmit={infos.read}
                    toAccount={accounts}
                />
            </Container>
            <Container>
                <Title size="medium">
                    <span>Transactions</span>
                    <Balance amount={infos.balance}>R$ {infos.balance}</Balance>
                </Title>
                <TransactionList
                    enableButtons
                    onRemove={async (data) => {
                        await removeTransactionService(data)
                        await infos.read()
                    }}
                    onUpdate={async (data) => {
                        await updateTransactionService(data)
                        await infos.read()
                    }}
                    data={infos.transactions ?? []}
                ></TransactionList>
            </Container>
            <UpdateAccount
                register={form.register}
                onSubmit={async (e) => {
                    await onSubmit(e)
                    await infos.read()
                }}
                onCancel={form.reset.bind(null, data.account)}
            />
            <Container>
                <Title size="medium">Delete accouunt</Title>
                <RedButton onClick={deleteAccount}>Delete</RedButton>
            </Container>
        </StyledAccountPage>
    )
}
