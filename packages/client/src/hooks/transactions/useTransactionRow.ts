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
  const openState = useHookstate(false);
  const isOpen = openState.get();

  return {
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

