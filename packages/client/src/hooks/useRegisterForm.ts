import { IRegisterSchema } from "@/interface";
import registerSchema from "@/schemas/registerSchema";
import register from "@/services/register";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHookstate } from "@hookstate/core";
import { useForm } from "react-hook-form";

export default function useRegisterForm(onSucess: () => any) {
	const form = useForm<IRegisterSchema>({
		resolver: yupResolver(registerSchema),
		mode: "onBlur",
	});

	const loading = useHookstate(false);
	const error = useHookstate("");

	return {
		form: {
			onSubmit: form.handleSubmit(async (data) => {
				try {
					const result = await register(data);
					onSucess();
				} catch (e) {
					error.set((e as any).response.data.message);
				}
			}),
			...form,
		},
		loading,
		error,
	};
}
