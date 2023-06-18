import styled from "styled-components";
import { StyledTitleSizes } from "./StyledTitleSizes";
import { StyledTitleMargin } from "./StyledTitleMargin";

export const Title = styled.h2<{ size?: keyof typeof StyledTitleSizes }>`
	font-size: ${(props) => {
		return StyledTitleSizes[props.size || "big"];
	}} !important;

	margin-bottom: ${(props) => StyledTitleMargin[props.size || "big"]};

	text-overflow: ellipsis;
	overflow: hidden;
`;
