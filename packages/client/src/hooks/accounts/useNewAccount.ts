import { IAccount } from "@/interface";
import { createAccount } from "@/services/account";
import { addAccount } from "@/state/accountsState";
import { useForm } from "react-hook-form";

export function useNewAccount() {
	const form = useForm<Pick<IAccount, "name" | "description">>();

	return {
		form,
		onSubmit: form.handleSubmit(async (data) => {
			const acc = await createAccount(data);
			addAccount(acc);
			form.reset();
		}),
	};
}
