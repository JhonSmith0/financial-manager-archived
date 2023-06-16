import { newTransactionController } from "@/controllers/transaction/newTransactionController";
import { TransactionCreate } from "@/interface";
import newTransactionSchema from "@/schemas/transaction/newTransactionSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export function useNewTransaction(defaultValues?: Partial<TransactionCreate>) {
	const { register, handleSubmit, ...others } = useForm<TransactionCreate>({
		resolver: yupResolver(newTransactionSchema),
		defaultValues,
	});

	return {
		form: {
			register,
			onSubmit: handleSubmit(async (data) => {
				others.reset();
				console.log({ data });

				await newTransactionController(data);
			}),
			...others,
		},
	};
}
