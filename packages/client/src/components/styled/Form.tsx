import styled, { CSSProperties } from "styled-components";

export const Form = styled.form<{
	direction?: CSSProperties["flexDirection"];
}>`
	display: flex;
	gap: 1.2rem;
	align-items: ${(props) => (props.direction === "row" ? "center" : "unset")};
	flex-direction: ${(props) => props.direction || "column"};
	flex-wrap: wrap;
`;
