import { IAccount, SearchAccount } from "@/interface";
import { removeAccount, searchAccounts } from "@/services/account";
import { hookstate } from "@hookstate/core";

const accountsState = hookstate<IAccount[]>([]);

export function addAccount(acc: IAccount) {
	accountsState.merge([acc]);
}

export async function search(data: SearchAccount) {
	const { results } = await searchAccounts(data);
	accountsState.set(results);
}

export async function remove(id: string) {
	await removeAccount(id);

	const newState = accountsState
		.get({ noproxy: true })
		.filter((e) => e.id !== id);

	accountsState.set(newState);
}

export function stateUpdateAccount(id: IAccount["id"], data: IAccount) {
	const state = accountsState.find((e) => e.id.value === id);
	if (state) {
		state.merge(data);
	}
}

export default accountsState;
