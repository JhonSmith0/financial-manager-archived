import { AccountUpdate } from "@/interface"
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form"
import styled from "styled-components"
import { Button } from "./styled/Button"
import { Container } from "./styled/Container"
import { FieldSet } from "./styled/FieldSet"
import { Form } from "./styled/Form"
import { IconList } from "./styled/IconList"
import { Input } from "./styled/Input"
import { Label } from "./styled/Label"
import { Title } from "./styled/Title"

export const StyledUpdateAccount = styled(Container)`
    font-size: 2rem;
    ${Label} {
        font-size: 2rem;
    }
`

interface Props {
    onSubmit: ReturnType<UseFormHandleSubmit<AccountUpdate>>
    register: UseFormRegister<AccountUpdate>
    onCancel?(): any
}

export function UpdateAccount(props: Props) {
    return (
        <StyledUpdateAccount>
            <Title size="medium">Update Account</Title>
            <Form onSubmit={props.onSubmit}>
                <FieldSet>
                    <Label>Name</Label>
                    <Input type="text" {...props.register("name")} />
                </FieldSet>
                <FieldSet>
                    <Label>Description</Label>
                    <Input type="text" {...props.register("description")} />
                </FieldSet>
                <IconList>
                    <Button type="submit">Update</Button>
                    <Button
                        onClick={(e) => {
                            e.preventDefault()
                            props.onCancel?.()
                        }}
                    >
                        Cancel
                    </Button>
                </IconList>
            </Form>
        </StyledUpdateAccount>
    )
}
