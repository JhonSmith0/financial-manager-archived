import { Button } from "@/components/styled/Button"
import { Container } from "@/components/styled/Container"
import { Title } from "@/components/styled/Title"
import { IAccount } from "@/interface"
import accountsState from "@/state/accountsState"
import { useHookstate } from "@hookstate/core"
import styled from "styled-components"
import { AccountCard } from "../AccountCard"
import { SearchAccount } from "../SearchAccount"

export const StyledAccountList = styled(Container)`
    margin-top: 0;
    .list {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 4.8rem;
        margin-top: 4.8rem;
    }

    ${Button} {
        padding-block: 0.6rem;
        align-self: end;
    }

    color: #343a40;
    font-family: "Inter";
`

export function AccountList() {
    const state = useHookstate<IAccount[]>(accountsState)
    const accounts = state.get()

    return (
        <StyledAccountList>
            <Title size="medium">Accounts</Title>
            <SearchAccount />
            <div className="list">
                {accounts.map((data) => (
                    <AccountCard account={data} key={data.id} />
                ))}
            </div>
        </StyledAccountList>
    )
}
