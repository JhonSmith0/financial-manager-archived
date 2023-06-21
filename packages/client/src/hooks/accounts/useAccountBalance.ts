import { accountBalance } from "@/services/account"
import { useHookstate } from "@hookstate/core"
import { useEffect } from "react"

export function useAccountBalance(id: string) {
    const data = useHookstate<number | null>(null)
    const error = useHookstate<null | Error>(null)
    const isLoading = useHookstate<boolean>(true)

    useEffect(() => {
        accountBalance(id)
            .then((e) => data.set(e))
            .catch((e) => error.set(e))
            .finally(isLoading.set.bind(null, false))
    }, [])

    return {
        isLoading: isLoading.get(),
        balance: data.get(),
        error: error.get(),
    }
}
