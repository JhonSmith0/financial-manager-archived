import { removeTransactionController } from "@/controllers/transaction";
import { ITransaction } from "@/interface";


import { useHookstate } from "@hookstate/core";

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

