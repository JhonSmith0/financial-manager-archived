import { ILoginSchema } from "@/interface";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "@/schemas/loginSchema";
import login from "@/services/login";
import { AxiosError, AxiosResponse } from "axios";
import { useHookstate } from "@hookstate/core";

export default function useLoginForm(onSucess: () => any) {
  const form = useForm<ILoginSchema>({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  const loading = useHookstate(false);
  const error = useHookstate("");

  return {
    form: {
      onSubmit: form.handleSubmit(async (data) => {
        try {
          const result = await login(data);
          onSucess()
        } catch (e) {
          error.set((e as any).data.message);
        }
      }),
      ...form,
    },
    loading,
    error,
  };
}
