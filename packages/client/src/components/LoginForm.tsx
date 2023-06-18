import useLoginForm from "@/hooks/auth/useLoginForm"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { FieldSet } from "./styled/FieldSet"
import { Label } from "./styled/Label"
import { Input } from "./styled/Input"

const StyledLoginForm = styled.form`
    width: max-content;
    margin: 5rem auto;
`

export default function LoginForm(props: { children?: any }) {
    const nav = useNavigate()

    const {
        form: {
            onSubmit,
            register,
            formState: { errors },
        },
        loading,
        error,
    } = useLoginForm(() => nav("/"))

    return (
        <StyledLoginForm as={"form"} onSubmit={onSubmit}>
            <FieldSet>
                <Label>Email</Label>
                <Input type="email" {...register("email")} />
                <p>{errors.email?.message}</p>
            </FieldSet>
            <FieldSet>
                <Label>Password</Label>
                <Input type="password" {...register("password")} />
                <p>{errors.password?.message}</p>
            </FieldSet>
            <p>{error.value}</p>
            {props.children}
        </StyledLoginForm>
    )
}
