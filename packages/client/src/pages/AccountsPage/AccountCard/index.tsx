import {
    StyledTransactionList,
    TransactionList,
} from "@/components/TransactionList"
import { Balance } from "@/components/styled/Balance"
import { Bar } from "@/components/styled/Bar"
import { IconList } from "@/components/styled/IconList"
import { useAccount } from "@/hooks/accounts/useAccount"
import { IAccount, ITransactionWithAccounts } from "@/interface"
import { updateAccount } from "@/services/account"
import { remove, stateUpdateAccount } from "@/state/accountsState"
import { useHookstate } from "@hookstate/core"
import { HiOutlineCog, HiOutlineTrash } from "react-icons/hi"
import styled from "styled-components"
import { UpdateAccountCard } from "../UpdateAccountCard"

interface Props {
    account: IAccount
}

export const StyledAccountCard = styled.div`
    box-shadow: 0px 12px 12px rgb(0, 0, 0, 0.05);
    border-radius: 4px;
    overflow: hidden;

    --padding-inline: 1.4rem;

    ${Bar} {
        font-size: 2.4rem;
        color: white;
        background: #364fc7;

        justify-content: space-between;

        padding: 0 var(--padding-inline) !important;

        text-transform: capitalize;

        ${Balance} {
            margin-right: 1.8rem;
        }

        .icons {
            margin-left: auto;
            display: flex;
            gap: 0.6rem;
        }
    }

    svg {
        color: #fff;
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

    return (
        <StyledAccountCard>
            {editing.get() && (
                <UpdateAccountCard
                    data={data}
                    onClose={onClose}
                    onSave={onSave}
                />
            )}
            <Bar as={"header"}>
                <span>{data.name}</span>
                <IconList>
                    <Balance amount={balance}>R$ {balance}</Balance>
                    <button onClick={() => editing.set(true)}>
                        <HiOutlineCog />
                    </button>
                    <button
                        onClick={async () => {
                            const value = confirm(
                                `Are you sure you want to delete ${data.name}?`
                            )
                            value && (await remove(data.id))
                        }}
                    >
                        <HiOutlineTrash />
                    </button>
                </IconList>
            </Bar>
            <TransactionList
                data={transactions as ITransactionWithAccounts[]}
            />
        </StyledAccountCard>
    )
}
