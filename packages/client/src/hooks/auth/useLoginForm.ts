import { ILoginSchema } from "@/interface"
import loginSchema from "@/schemas/auth/loginSchema"
import login from "@/services/login"
import { yupResolver } from "@hookform/resolvers/yup"
import { useHookstate } from "@hookstate/core"
import { useForm } from "react-hook-form"

export default function useLoginForm(onSucess: () => any) {
    const form = useForm<ILoginSchema>({
        resolver: yupResolver(loginSchema),
        mode: "onBlur",
    })

    const loading = useHookstate(false)
    const error = useHookstate("")

    return {
        form: {
            onSubmit: form.handleSubmit(async (data) => {
                try {
                    const result = await login(data)
                    onSucess()
                } catch (e) {
                    error.set((e as any).response.data.message)
                }
            }),
            ...form,
        },
        loading,
        error,
    }
}
