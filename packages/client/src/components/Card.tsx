import styled from "styled-components";
import {
	StyledBar,
	StyledContainer,
	StyledIconsList,
	StyledTitle,
} from "./styled";
import { Content } from "./styled/Content";
import Draggable from "react-draggable";
import { Icon } from "./styled/Icon";
import { HiX } from "react-icons/hi";

export const StyledCard = styled(StyledContainer)`
	box-shadow: 0px 12px 12px rgb(0, 0, 0, 0.05);
	border-radius: 4px;
	overflow: hidden;
	width: 50rem;
	position: absolute;

	background: #fff !important;
	z-index: 99;

	${StyledBar} {
		font-size: 2.4rem;
		color: white;
		background: #364fc7;

		justify-content: space-between;

		padding: var(--padding-block, 1.8rem) var(--padding-inline, 1.8rem) !important;

		${StyledIconsList} {
			display: flex;
			gap: 0.6rem;
			color: white;
		}

		${StyledTitle} {
			margin: 0;
		}
	}
`;

interface Props {
	title: string;
	children?: any;
	onClose(): any;
	className?: string;
}

export function Card(data: Props) {
  console.log('')
	return (
		<Draggable handle={StyledBar}>
			<StyledCard>
				<StyledBar as={"header"}>
					<StyledTitle size="small">{data.title}</StyledTitle>
					<StyledIconsList>
						<Icon as="button" onClick={data.onClose}>
							<HiX />
						</Icon>
					</StyledIconsList>
				</StyledBar>
				<Content>{data.children}</Content>
			</StyledCard>
		</Draggable>
	);
}
