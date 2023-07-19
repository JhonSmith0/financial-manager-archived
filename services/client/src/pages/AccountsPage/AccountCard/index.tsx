import { StyledTransactionList } from "@/components/TransactionList"
import { Balance } from "@/components/styled/Balance"
import { Bar } from "@/components/styled/Bar"
import { Content } from "@/components/styled/Content"
import { IconList } from "@/components/styled/IconList"
import { Title } from "@/components/styled/Title"
import { useAccountBalance } from "@/hooks/accounts/useAccountBalance"
import { IAccount } from "@/interface"
import { useHookstate } from "@hookstate/core"
import { Link } from "react-router-dom"
import styled from "styled-components"
interface Props {
    account: IAccount
}

export const StyledAccountCard = styled(Link)`
    box-shadow: 0px 12px 12px rgb(0, 0, 0, 0.05);
    border-radius: 4px;
    overflow: hidden;
    text-decoration: none;

    --padding-inline: 1.4rem;

    ${Bar} {
        font-size: 2.4rem;
        color: white;
        background: #364fc7;

        span {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }

        justify-content: space-between;

        padding: 0 var(--padding-inline) !important;

        text-transform: capitalize;
        gap: 1.8rem;

        display: grid;
        grid-template-columns: 1fr auto auto;

        ${IconList} {
            /* margin-left: auto; */
            display: flex;
            gap: 0.6rem;
            justify-content: right;
        }
    }

    svg {
        color: #fff;
    }

    ${Content} {
        max-width: 100%;
        color: #212529 !important;
        display: grid;
        gap: 3.2rem;
        ${Title} {
            color: #495057;
            font-weight: 400;
        }
    }

    ${StyledTransactionList} {
        svg {
            color: black;
        }
    }
`

export function AccountCard({ account: data }: Props) {
    const editing = useHookstate(false)

    const { balance } = useAccountBalance(data.id)

    return (
        <StyledAccountCard to={`/account/${data.id}`}>
            <Bar as={"header"}>
                <span>{data.name}</span>
                {balance && <Balance amount={balance}>R$ {balance}</Balance>}
            </Bar>
        </StyledAccountCard>
    )
}
