import { IAccount } from "@/interface";
import { searchAccounts } from "@/services/account";
import { useHookstate } from "@hookstate/core";
import { useEffect } from "react";

export function useAccounts(initial: IAccount[] = [], deps: any[] = []) {
  const accountsState = useHookstate<IAccount[]>(initial);

  const accounts = accountsState.get();

  useEffect(() => {
    void (async function () {
      searchAccounts({ name: "", page: 1 }).then((e) =>
        accountsState.set(e.results)
      );
    })();
  }, deps);

  return { accounts };
}

