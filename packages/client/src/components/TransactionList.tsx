import {
	StyledContainer,
	StyledIconsList,
	StyledTitle,
} from "@/components/styled";
import StyledTable, { StyledTableRow } from "@/components/styled/StyledTable";
import { ITransactionWithAccounts } from "@/interface";
import styled from "styled-components";
import { TransactionRow } from "./TransactionRow";

export const StyledTransactionList = styled(StyledContainer)`
  ${StyledTableRow} {
    display: grid;
    grid-template-columns: repeat(5, 1fr) auto;
  }

  ${StyledTable} {
    max-height: 100vh;
    overflow-y: auto;
  }

  ${StyledIconsList} {
    svg {
      width: 2.4rem;
      height: 2.4rem;
      /* color: #222; */
    }
  }
`;

interface Props {
  data: ITransactionWithAccounts[];
}
export function TransactionList({ data }: Props) {
	return (
		<StyledTransactionList>
			<StyledTitle size="medium">Transactions</StyledTitle>
			{!!data.length && (
				<StyledTable>
					{data.map((e) => (
						<TransactionRow data={e} key={e.id} />
					))}
				</StyledTable>
			)}
		</StyledTransactionList>
	);
}

