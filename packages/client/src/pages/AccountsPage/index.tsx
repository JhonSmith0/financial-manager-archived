import { StyledBar, StyledHomeOutLet } from "@/components/styled";
import styled from "styled-components";
import { AccountList } from "./AccountsList";
import { NewAccount } from "./CreateAccount";

export const StyledAccountsPage = styled(StyledHomeOutLet)`
  flex: 1;
  height: 100%;

  display: flex;
  flex-direction: column;

  --inline-padding: 2.4rem;

  ${StyledBar} {
    padding-inline: var(--inline-padding);
  }

  & > .content {
    flex: 1;
    padding: var(--inline-padding);
    padding-block: 3.2rem;

    display: flex;
    flex-direction: column;
    gap: 4.2rem;

    h2 {
      font-size: 2.4rem;
    }

    overflow-y: auto;
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