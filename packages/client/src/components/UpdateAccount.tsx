import { AccountUpdate, IAccount } from "@/interface"
import { UseFormReturn } from "react-hook-form"
import styled from "styled-components"
import { Button } from "./styled/Button"
import { Container } from "./styled/Container"
import { FieldSet } from "./styled/FieldSet"
import { Form } from "./styled/Form"
import { Input } from "./styled/Input"
import { Label } from "./styled/Label"
import { Title } from "./styled/Title"

export const StyledUpdateAccount = styled(Container)`
    font-size: 2rem;
    ${Label} {
        font-size: 2rem;
    }

    ${Button} {
        margin-block: 2.2rem;
    }
`

interface Props {
    data: IAccount
    onSubmit(data: AccountUpdate): any
    form: UseFormReturn<AccountUpdate>
}

export function UpdateAccount(props: Props) {
    const { register, handleSubmit } = props.form

    return (
        <StyledUpdateAccount>
            <Title size="medium">Update Account</Title>
            <Form onSubmit={handleSubmit(props.onSubmit)}>
                <FieldSet>
                    <Label>Name</Label>
                    <Input type="text" {...register("name")} />
                </FieldSet>
                <FieldSet>
                    <Label>Description</Label>
                    <Input type="text" {...register("description")} />
                </FieldSet>
                <Button type="submit">Create</Button>
            </Form>
        </StyledUpdateAccount>
    )
}
