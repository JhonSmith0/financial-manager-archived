import Draggable from "react-draggable";
import { Card, CardProps } from "./Card";
import { Bar } from "./styled/Bar";

export function DraggableCard(data: CardProps) {
	return (
		<Draggable handle={Bar}>
			<Card {...data}/>
		</Draggable>
	);
}
