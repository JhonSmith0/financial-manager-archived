import { AccountUpdate, IAccount } from "@/interface"
import { updateAccountSchema } from "@/schemas/account/updateAccountSchema"
import { updateAccount } from "@/services/account"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export function useUpdateAccount(account: IAccount) {
    const form = useForm<AccountUpdate>({
        defaultValues: account,
        resolver: yupResolver(updateAccountSchema),
    })

    useEffect(() => {
        console.log("changed")
        form.reset(account)
    }, [account])

    return {
        form,
        onSubmit: form.handleSubmit(async (data) => {
            await updateAccount(account.id, data)
        }),
    }
}
