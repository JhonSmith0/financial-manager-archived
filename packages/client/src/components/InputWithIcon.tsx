import { InputHTMLAttributes, ReactNode } from "react"
import styled from "styled-components"
import { Input } from "./styled/Input"

export const StyledInputWithIcon = styled(Input)`
    display: flex;
    input {
        all: inherit;
        border: none;
        padding: 0;
        flex: 1;
    }
    gap: 2rem;
`

interface Props {
    attrs?: InputHTMLAttributes<any>
    icon: ReactNode
}

export function InputWithIcon(props: Props) {
    return (
        <StyledInputWithIcon as={"div"}>
            <Input type="text" {...props.attrs} />
            {props.icon}
        </StyledInputWithIcon>
    )
}
