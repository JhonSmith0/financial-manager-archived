import { HiX } from "react-icons/hi"
import styled from "styled-components"
import { Bar } from "./styled/Bar"
import { Container } from "./styled/Container"
import { Content } from "./styled/Content"
import { Icon } from "./styled/Icon"
import { IconList } from "./styled/IconList"
import { Title } from "./styled/Title"

export const StyledCard = styled(Container)`
    box-shadow: 0px 12px 12px rgb(0, 0, 0, 0.05);
    border-radius: 4px;
    overflow: hidden;
    width: 50rem;

    background: #fff !important;

    ${Bar} {
        font-size: 2.4rem;
        color: white;
        background: #364fc7;

        justify-content: space-between;

        padding: var(--padding-block, 1.8rem) var(--padding-inline, 1.8rem) !important;

        ${IconList} {
            display: flex;
            gap: 0.6rem;
            color: white;
        }

        ${Title} {
            margin: 0;
        }
    }
`

export interface CardProps {
    title: string
    children?: any
    onClose(): any
    className?: string
}

export function Card(data: CardProps) {
    return (
        <StyledCard>
            <Bar as={"header"}>
                <Title size="small">{data.title}</Title>
                <IconList>
                    <Icon as="button" onClick={data.onClose}>
                        <HiX />
                    </Icon>
                </IconList>
            </Bar>
            <Content>{data.children}</Content>
        </StyledCard>
    )
}
