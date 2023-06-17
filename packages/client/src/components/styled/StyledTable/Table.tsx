import styled from "styled-components";

export const Table = styled.article`
	background: #f1f3f5;

	--border-color: #999;
	border: solid 1px var(--border-color);

	th,
	td {
		padding: 0.9rem 1.6rem;
		border-collapse: collapse;

		&:not(:last-child) {
			border-right: var(--border-color);
		}
	}
`;
