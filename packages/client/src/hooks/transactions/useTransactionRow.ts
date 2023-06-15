import { readAccountController } from "@/controllers/account";
import { removeTransactionController } from "@/controllers/transaction";
import { IAccount, ITransaction, ITransactionWithAccounts } from "@/interface";
import {
    getTransactionService,
    readTransactionService,
} from "@/services/transaction";
import { useHookstate } from "@hookstate/core";
import { useEffect } from "react";

export function useTransactionRow(data: ITransaction) {
    const transaction = useHookstate<ITransactionWithAccounts | null>(null);

    const fromAccount = transaction.ornull?.get().fromAccount;
    const toAccount = transaction.ornull?.get().toAccount;

    useEffect(() => {
        (async function () {
            const result = await readTransactionService(data);
            transaction.set(result);
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
            openState.set(false);
        },
        open() {
            openState.set(true);
        },
    };
}
