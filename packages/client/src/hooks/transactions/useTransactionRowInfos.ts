import { readAccountController } from "@/controllers/account";
import { IAccount, ITransaction } from "@/interface";
import { useHookstate } from "@hookstate/core";
import { useEffect } from "react";

export function useTransactionRowInfos(data: ITransaction) {
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

  return {
    fromAccount,
    toAccount,
  };
}
