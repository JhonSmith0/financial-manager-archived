import { ILoginSchema } from "@/interface";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "@/schemas/loginSchema";
import login from "@/services/login";

export default function useLoginForm() {
  const form = useForm<ILoginSchema>({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  return {
    onSubmit: form.handleSubmit(async (data) => {
      console.log(login(data));
    }),
    ...form,
  };
}
