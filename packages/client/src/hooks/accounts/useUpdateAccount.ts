import { AccountUpdate, IAccount } from "@/interface"
import { updateAccountSchema } from "@/schemas/account/updateAccountSchema"
import { updateAccount } from "@/services/account"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"

export function useUpdateAccount(account: IAccount) {
    const form = useForm<AccountUpdate>({
        defaultValues: account,
        resolver: yupResolver(updateAccountSchema),
    })

    return {
        form,
        onSubmit: form.handleSubmit(async (data) => {
            await updateAccount(account.id, data)
        }),
    }
}
