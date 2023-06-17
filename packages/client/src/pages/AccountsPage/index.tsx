import { Bar } from "@/components/styled/Bar";
import { StyledHomeOutLet } from "@/components/styled/StyledHomeOutLet";
import styled from "styled-components";
import { AccountList } from "./AccountsList";
import { NewAccount } from "./CreateAccount";

export const StyledAccountsPage = styled(StyledHomeOutLet)`
	flex: 1;
	height: 100%;
	overflow-y: auto;

	display: flex;
	flex-direction: column;

	${Bar} {
		padding-inline: var(--inline-padding);
	}

	& > .content {
		flex: 1;

		display: flex;
		flex-direction: column;
		gap: 4.2rem;

		h2 {
			font-size: 2.4rem;
		}
	}
`;

export function AccountsPage() {
	return (
		<StyledAccountsPage>
			<div className="content">
				<NewAccount />
				<AccountList />
			</div>
		</StyledAccountsPage>
	);
}
