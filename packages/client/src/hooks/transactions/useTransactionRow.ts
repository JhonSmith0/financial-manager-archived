import { readAccountController } from "@/controllers/account";
import { removeTransactionController } from "@/controllers/transaction";
import { IAccount, ITransaction } from "@/interface";
import { useHookstate } from "@hookstate/core";
import { useEffect } from "react";

export function useTransactionRow(data: ITransaction) {
    const fromAccountState = useHookstate<IAccount | null>(null);
    const toAccountState = useHookstate<IAccount | null>(null);

    const fromAccount = fromAccountState.ornull?.get();
    const toAccount = toAccountState.ornull?.get();

    useEffect(() => {
        (async function () {
            const from = await readAccountController(data.fromAccountId);
            const to = await readAccountController(data.toAccountId);
            from && fromAccountState.set(from);
            to && toAccountState.set(to);
        })();
    }, [data]);

    const openState = useHookstate(false);
    const isOpen = openState.get();

    return {
        fromAccount,
        toAccount,
        isOpen,

        async remove() {
            if (!confirm("Are you sure!")) return;
            await removeTransactionController(data);
        },
        toggleOpen() {
            openState.set(!isOpen);
        },
        close() {
            openState.set(false)
        }, 
        open() {
            openState.set(true)
        }
    };
}
