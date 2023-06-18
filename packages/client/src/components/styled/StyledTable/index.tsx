import styled from "styled-components";

const StyledTable = styled.article`
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

export const StyledTableRow = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);

  &:not(:last-child) {
    border-bottom: solid 1px var(--border-color);
  }
`;
export const StyledTableRowItem = styled.div`
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

export default StyledTable;
