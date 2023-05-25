import { ILoginSchema } from "@/interface";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "@/schemas/loginSchema";
import login from "@/services/login";
import { AxiosError, AxiosResponse } from "axios";

export default function useLoginForm(onError: (error: string) => any) {
  const form = useForm<ILoginSchema>({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  return {
    onSubmit: form.handleSubmit(async (data) => {
      try {
        const result = await login(data);
      } catch (error) {
        const result = (error as AxiosError<{ message: string }>).response
          ?.data;
        onError(result?.message || "");
      }
    }),
    ...form,
  };
}
