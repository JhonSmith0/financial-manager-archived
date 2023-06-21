import styled from "styled-components"

export const TableRow = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);

    &:not(:last-child) {
        border-bottom: solid 1px var(--border-color);
    }
`
