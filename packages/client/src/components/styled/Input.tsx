import { placeHolderColor, textColor1 } from "@/colors"
import styled from "styled-components"

export const Input = styled.input`
    font-size: 1.8rem;
    padding: 1.6rem;

    color: ${textColor1};

    border: solid 1px ${placeHolderColor};
    outline: none;
    width: max-content;

    border-radius: 6px;

    &::placeholder {
        color: ${placeHolderColor};
    }

    background: none;
`
