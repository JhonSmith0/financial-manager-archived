import { placeHolderColor } from "@/colors"
import useRegisterForm from "@/hooks/auth/useRegisterForm"
import { IRegisterSchema } from "@/interface"
import { useHookstate } from "@hookstate/core"
import { HTMLInputTypeAttribute, ReactNode, useCallback } from "react"
import {
    HiOutlineEye,
    HiOutlineEyeOff,
    HiOutlineMail,
    HiOutlineUser,
} from "react-icons/hi"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { InputWithIcon } from "./InputWithIcon"
import { ErrorSpan } from "./styled/ErrorSpan"
import { FieldSet } from "./styled/FieldSet"
import { Icon } from "./styled/Icon"
import { Label } from "./styled/Label"

export const StyledRegisterForm = styled.form`
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
            icon,
        }: {
            registerKey: keyof IRegisterSchema
            type: HTMLInputTypeAttribute
            icon: ReactNode
        }) {
            return (
                <>
                    <InputWithIcon
                        attrs={{
                            type,
                            ...register(registerKey),
                        }}
                        icon={icon}
                    />
                    <ErrorSpan>{errors[registerKey]?.message}</ErrorSpan>
                </>
            )
        },
        [errors, register]
    )

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
        <StyledRegisterForm onSubmit={onSubmit}>
            <FieldSet>
                <Label>Name</Label>
                <RenderInput
                    icon={
                        <Icon>
                            <HiOutlineUser />
                        </Icon>
                    }
                    registerKey={"name"}
                    type="text"
                />
            </FieldSet>
            <FieldSet>
                <Label>Email</Label>
                <RenderInput
                    icon={
                        <Icon>
                            <HiOutlineMail />
                        </Icon>
                    }
                    registerKey={"email"}
                    type="email"
                />
            </FieldSet>
            <FieldSet>
                <Label>Password</Label>
                <RenderInput
                    icon={
                        <Icon onClick={togglePasswordIcon}>
                            {handlePasswordIcon()}
                        </Icon>
                    }
                    registerKey={"password"}
                    type={passwordType}
                />
            </FieldSet>
            {props.children}
        </StyledRegisterForm>
    )
}
