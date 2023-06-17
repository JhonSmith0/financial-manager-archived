import { IAccount } from "@/interface";
import { searchAccounts } from "@/services/account";
import { useHookstate } from "@hookstate/core";
import { useEffect } from "react";

export function useAccounts(initial: IAccount[] = [], deps: any[] = []) {
	const accountsState = useHookstate<IAccount[]>(initial);

	const accounts = accountsState.get() as IAccount[];

	async function read() {
		searchAccounts({ name: "", page: 1 }).then((e) => {
			accountsState.set(e.results);
		});
	}

	useEffect(() => {
		read();
	}, deps);

	return { accounts, read };
}
