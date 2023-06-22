import { placeHolderColor } from "@/colors"
import useLoginForm from "@/hooks/auth/useLoginForm"
import { useHookstate } from "@hookstate/core"
import { HTMLInputTypeAttribute } from "react"
import { HiOutlineEye, HiOutlineEyeOff, HiOutlineMail } from "react-icons/hi"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { InputWithIcon } from "./InputWithIcon"
import { ErrorSpan } from "./styled/ErrorSpan"
import { FieldSet } from "./styled/FieldSet"
import { Icon } from "./styled/Icon"
import { Label } from "./styled/Label"

export const StyledLoginForm = styled.form`
    width: max-content;
    margin: 5rem auto;

    display: grid;
    gap: 1.6rem;

    ${ErrorSpan} {
        display: block;
        text-align: right;
        margin-top: 6px;
    }

    ${Icon} {
        cursor: pointer;
        svg {
            height: 3rem;
            width: 3rem;
        }
        color: ${placeHolderColor};
    }
`

export default function LoginForm(props: { children?: any }) {
    const nav = useNavigate()

    const {
        form: {
            onSubmit,
            register,
            formState: { errors, dirtyFields },
        },
        loading,
        error,
    } = useLoginForm(() => nav("/"))

    const passwordTypeState = useHookstate<HTMLInputTypeAttribute>("password")
    const passwordType = passwordTypeState.get()

    function togglePasswordIcon() {
        passwordTypeState.set(passwordType === "password" ? "text" : "password")
    }
    function handlePasswordIcon() {
        return passwordType === "password" ? (
            <HiOutlineEyeOff />
        ) : (
            <HiOutlineEye />
        )
    }

    return (
        <StyledLoginForm as={"form"} onSubmit={onSubmit}>
            <FieldSet>
                <Label>Email</Label>
                <InputWithIcon
                    attrs={{
                        placeholder: "Your Email...",
                        type: "email",
                        ...register("email"),
                    }}
                    icon={
                        <Icon>
                            <HiOutlineMail />
                        </Icon>
                    }
                ></InputWithIcon>
                {/* <Input

                /> */}
                <ErrorSpan>
                    {dirtyFields.email && errors.email?.message}
                </ErrorSpan>
            </FieldSet>
            <FieldSet>
                <Label>Password</Label>
                <InputWithIcon
                    attrs={{
                        placeholder: "Your password...",
                        type: passwordType,
                        ...register("password"),
                    }}
                    icon={
                        <Icon onClick={togglePasswordIcon}>
                            {handlePasswordIcon()}
                        </Icon>
                    }
                />
                <ErrorSpan>
                    {dirtyFields.password && errors.password?.message}
                </ErrorSpan>
            </FieldSet>
            {props.children}
        </StyledLoginForm>
    )
}
