import { Container } from "@/components/styled/Container";
import { Form } from "@/components/styled/Form";
import { FieldSet } from "@/components/styled/FieldSet";
import { Label } from "@/components/styled/Label";
import { Input } from "@/components/styled/Input";
import { Button } from "@/components/styled/Button";
import { SearchAccount } from "@/interface";
import { search } from "@/state/accountsState";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

export const StyledSearchAccount = styled(Container);

export function SearchAccount() {
	const { register, handleSubmit, getValues } = useForm<SearchAccount>({
		defaultValues: {
			page: 1,
			name: "",
		},
	});

	useEffect(() => {
		search(getValues());
	}, []);

	return (
		<Form
			direction="row"
			onSubmit={handleSubmit(async (data) => {
				await search(data);
			})}
		>
			<FieldSet>
				<Label>Name</Label>
				<Input type="text" {...register("name")} />
			</FieldSet>
			<FieldSet>
				<Label>Page</Label>
				<Input
					type="number"
					{...register("page", {
						valueAsNumber: true,
					})}
				/>
			</FieldSet>
			<Button type="submit">Search</Button>
		</Form>
	);
}
