import { IconList } from "./styled/IconList";
import { TableRow } from "./styled/StyledTable/TableRow";
import { Table } from "./styled/StyledTable/Table";
import { ITransactionWithAccounts } from "@/interface";
import styled from "styled-components";
import { TransactionRow } from "./TransactionRow";

export const StyledTransactionList = styled.div`
	${TableRow} {
		display: grid;
		grid-template-columns: repeat(5, 1fr) auto;
	}

	${Table} {
		max-height: 100vh;
		overflow-y: auto;
	}

	${IconList} {
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
			{!!data.length && (
				<Table>
					{data.map((e) => (
						<TransactionRow data={e} key={e.id} />
					))}
				</Table>
			)}
		</StyledTransactionList>
	);
}
