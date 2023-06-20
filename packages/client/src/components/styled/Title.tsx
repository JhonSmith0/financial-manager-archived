import styled from "styled-components"
import { StyledTitleMargin } from "./StyledTitleMargin"
import { StyledTitleSizes } from "./StyledTitleSizes"

export const Title = styled.h2<{ size?: keyof typeof StyledTitleSizes }>`
    font-size: ${(props) => {
        return StyledTitleSizes[props.size || "big"]
    }} !important;

    margin-bottom: ${(props) => StyledTitleMargin[props.size || "big"]};

    text-overflow: ellipsis;
    overflow: hidden;
`
