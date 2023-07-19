import { IAccount, SearchAccount } from "@/interface"
import { searchAccounts } from "@/services/account"
import { useHookstate } from "@hookstate/core"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export function useSearchAccounts(defaultValues?: SearchAccount) {
    const form = useForm<SearchAccount>({
        defaultValues: {
            name: "",
            ...defaultValues,
        },
    })

    const accounts = useHookstate<IAccount[]>([])

    async function search(data: SearchAccount) {
        const { results } = await searchAccounts(data)
        accounts.set(results)
    }

    useEffect(() => {
        search({ name: "" })
    }, [defaultValues])

    return {
        form,
        accounts: accounts.get() as IAccount[],
        onSubmit: form.handleSubmit(search),
    }
}
