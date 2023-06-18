import { newTransactionController } from "@/controllers/transaction/newTransactionController"
import { TransactionCreate } from "@/interface"
import newTransactionSchema from "@/schemas/transaction/newTransactionSchema"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"

export function useNewTransaction(defaultValues?: Partial<TransactionCreate>) {
    const form = useForm<TransactionCreate>({
        resolver: yupResolver(newTransactionSchema),
        defaultValues,
    })

    return {
        form,
        onSubmit: form.handleSubmit(async (data) => {
            form.reset()
            console.log({ data })

            await newTransactionController(data)
        }),
    }
}
