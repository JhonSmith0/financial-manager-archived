import { TransactionList } from "@/components/TransactionList"
import { Balance } from "@/components/styled/Balance"
import { Container } from "@/components/styled/Container"
import { Content } from "@/components/styled/Content"
import { StyledHomeOutLet } from "@/components/styled/StyledHomeOutLet"
import { Title } from "@/components/styled/Title"
import { AccountPageInfos } from "@/loaders/accountPage"
import { useLoaderData } from "react-router-dom"
import styled from "styled-components"

export const StyledAccountPage = styled(StyledHomeOutLet)`
    & > ${Title} {
        line-height: 1.2;
        margin: 0;
    }

    ${Container} {
        padding: 0;
        margin: 0;
        ${Balance} {
            margin-left: 1.8rem;
            font-size: 1.6rem;
            font-weight: 400;
        }
    }
`

export function AccountPage() {
    const data = useLoaderData() as AccountPageInfos

    return (
        <StyledAccountPage>
            <Title size="large">
                <span>{data.account.name}</span>
            </Title>

            <Content>
                <p>{data.account.description}</p>
            </Content>
            <Container>
                <Title size="big">
                    <span>Transactions</span>
                    <Balance amount={data.balance}>R$ {data.balance}</Balance>
                </Title>
                <TransactionList data={data.transactions}></TransactionList>
            </Container>
        </StyledAccountPage>
    )
}
