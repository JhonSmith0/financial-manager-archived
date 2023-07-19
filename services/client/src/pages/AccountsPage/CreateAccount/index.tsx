import { IAccount } from "@/interface"
import { createAccount } from "@/services/account"
import { addAccount } from "@/state/accountsState"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import { Container } from "@/components/styled/Container"
import { Title } from "@/components/styled/Title"
import { Form } from "@/components/styled/Form"
import { FieldSet } from "@/components/styled/FieldSet"
import { Label } from "@/components/styled/Label"
import { Input } from "@/components/styled/Input"
import { Button } from "@/components/styled/Button"

export const StyledNewAccount = styled(Container)`
    ${Button} {
        padding-block: 0.6rem;
        align-self: end;
    }
`

export function NewAccount() {
    const { register, handleSubmit, reset } =
        useForm<Pick<IAccount, "name" | "description">>()

    return (
        <StyledNewAccount>
            <Title size="medium">New Account</Title>
            <Form
                direction="row"
                onSubmit={handleSubmit(async (data) => {
                    const acc = await createAccount(data)
                    addAccount(acc)
                    reset()
                })}
            >
                <FieldSet>
                    <FieldSet>Name</FieldSet>
                    <Input type="text" {...register("name")} />
                </FieldSet>
                <FieldSet>
                    <Label>Description</Label>
                    <Input type="text" {...register("description")} />
                </FieldSet>
                <Button type="submit">Create</Button>
            </Form>
        </StyledNewAccount>
    )
}
