import { textColor2, textColor3, textColor4 } from "@/colors"
import styled from "styled-components"
import { Button } from "./Button"
import { FieldSet } from "./FieldSet"
import { Input } from "./Input"

export const AuthPageCard = styled.div`
    padding: 4.4rem;
    padding-top: 6.4rem;
    width: 45rem;
    border-radius: 9px;

    box-shadow: 0px 0px 40px 17px rgba(0, 0, 0, 0.03);

    h2 {
        text-align: center;
        color: ${textColor2};
        font-weight: normal;
        font-size: 2.4rem;
    }

    a {
        all: none;
        text-decoration: none;
        text-align: right;
        color: ${textColor4} !important;
    }

    form {
        width: 100%;
        ${Input}, ${FieldSet} {
            width: 100%;
        }
        gap: 2rem;
    }
    ${Button} {
        margin-top: 0.5rem;
        background: ${textColor3};
        border-radius: 1.6rem;
        width: 100%;
        padding: 1.6rem;
        font-size: 1.8rem;
    }
`
