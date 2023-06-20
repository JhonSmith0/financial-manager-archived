import { StyledTransactionList } from "@/components/TransactionList"
import { Balance } from "@/components/styled/Balance"
import { Bar } from "@/components/styled/Bar"
import { Content } from "@/components/styled/Content"
import { IconList } from "@/components/styled/IconList"
import { Title } from "@/components/styled/Title"
import { useAccount } from "@/hooks/accounts/useAccount"
import { IAccount } from "@/interface"
import { updateAccount } from "@/services/account"
import { remove, stateUpdateAccount } from "@/state/accountsState"
import { useHookstate } from "@hookstate/core"
import { HiOutlineCog, HiOutlineTrash } from "react-icons/hi"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { UpdateAccountCard } from "../UpdateAccountCard"

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

    const { account, balance, transactions } = useAccount(data.id)

    function onClose() {
        editing.set(false)
    }

    async function onSave(data: IAccount) {
        const newAcc = await updateAccount(data.id, data)
        onClose()
        stateUpdateAccount(data.id, newAcc)
    }

    function onEdit(e: MouseEvent) {
        e.preventDefault()
        e.stopPropagation()
        editing.set(true)
    }

    async function onRemove(e: MouseEvent) {
        e.preventDefault()
        e.stopPropagation()
        const value = confirm(`Are you sure you want to delete ${data.name}?`)
        value && (await remove(data.id))
    }

    return (
        <StyledAccountCard to={`/account/${data.id}`}>
            {editing.get() && (
                <UpdateAccountCard
                    data={data}
                    onClose={onClose}
                    onSave={onSave}
                />
            )}
            <Bar as={"header"}>
                <span>{data.name}</span>
                <Balance amount={balance}>R$ {balance}</Balance>
                <IconList>
                    <button onClick={onEdit as any}>
                        <HiOutlineCog />
                    </button>
                    <button onClick={onRemove as any}>
                        <HiOutlineTrash />
                    </button>
                </IconList>
            </Bar>
        </StyledAccountCard>
    )
}
