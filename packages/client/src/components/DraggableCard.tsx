import Draggable from "react-draggable"
import { Card, CardProps } from "./Card"

interface Props extends CardProps {
    handle: string
}

export function DraggableCard(data: Props) {
    return (
        <Draggable handle={data.handle}>
            <Card {...data} />
        </Draggable>
    )
}
