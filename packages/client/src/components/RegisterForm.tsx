import useRegisterForm from "@/hooks/auth/useRegisterForm"
import { IRegisterSchema } from "@/interface"
import { HTMLInputTypeAttribute, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { FieldSet } from "./styled/FieldSet"
import { Input } from "./styled/Input"
import { Label } from "./styled/Label"

export const StyledRegisterForm = styled.form`
    margin: 5rem auto;
    width: max-content;
`

export default function RegisterForm(props: { children?: any }) {
    const nav = useNavigate()

    const {
        form: {
            register,
            onSubmit,
            formState: { errors },
        },
        loading,
        error,
    } = useRegisterForm(() => nav("/"))

    const RenderInput = useCallback(
        function ({
            type,
            registerKey,
        }: {
            registerKey: keyof IRegisterSchema
            type: HTMLInputTypeAttribute
        }) {
            return (
                <>
                    <Input type={type} {...register(registerKey)} />
                    <p>{errors[registerKey]?.message}</p>
                </>
            )
        },
        [errors, register]
    )

    return (
        <StyledRegisterForm onSubmit={onSubmit}>
            <FieldSet>
                <Label>Email</Label>
                <RenderInput registerKey={"email"} type="email" />
            </FieldSet>
            <FieldSet>
                <Label>Name</Label>
                <RenderInput registerKey={"name"} type="text" />
            </FieldSet>
            <FieldSet>
                <Label>Password</Label>
                <RenderInput registerKey={"password"} type="password" />
            </FieldSet>
            <p>{error.value}</p>
            {props.children}
        </StyledRegisterForm>
    )
}
