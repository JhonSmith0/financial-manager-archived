import styled from "styled-components";

export const TableRowItem = styled.div`
	padding: 1.2rem;

	text-overflow: ellipsis;
	overflow: hidden;

	white-space: nowrap;

	display: flex;
	align-items: center;

	&:not(:last-child) {
		border-right: solid 1px var(--border-color);
	}
`;
