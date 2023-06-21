import { NewTransaction } from "@/components/NewTransaction"
import { TransactionList } from "@/components/TransactionList"
import { Balance } from "@/components/styled/Balance"
import { Container } from "@/components/styled/Container"
import { Content } from "@/components/styled/Content"
import { StyledHomeOutLet } from "@/components/styled/StyledHomeOutLet"
import { Title } from "@/components/styled/Title"
import { useAccount } from "@/hooks/accounts/useAccount"
import { AccountPageInfos } from "@/loaders/accountPage"
import {
    removeTransactionService,
    updateTransactionService,
} from "@/services/transaction"
import { useLoaderData } from "react-router-dom"
import styled from "styled-components"

export const StyledAccountPage = styled(StyledHomeOutLet)`
    & > ${Title} {
        line-height: 1.2;
        margin: 0;
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
`

export function AccountPage() {
    const data = useLoaderData() as AccountPageInfos

    const infos = useAccount(data.account.id)

    return (
        <StyledAccountPage>
            <Title size="large">
                <span>{infos.account?.name}</span>
            </Title>
            <Content>
                <p>{infos.account?.description}</p>
            </Content>
            <Container>
                <NewTransaction onSubmit={infos.read} />
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
        </StyledAccountPage>
    )
}
