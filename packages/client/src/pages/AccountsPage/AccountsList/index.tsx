import { IAccount } from "@/interface";
import accountsState from "@/state/accountsState";
import { useHookstate } from "@hookstate/core";
import { SearchAccount } from "../SearchAccount";
import styled from "styled-components";
import { AccountCard } from "../AccountCard";
import { StyledContainer, StyledTitle } from "@/components/styled";

export const StyledAccountList = styled(StyledContainer)`
  .list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
    margin-top: 4.8rem;
  }

  color: #343a40;
  font-family: "Inter";
`;

export function AccountList() {
  const state = useHookstate<IAccount[]>(accountsState);
  const accounts = state.get();

  return (
    <StyledAccountList>
      <StyledTitle>Accounts</StyledTitle>
      <SearchAccount />
      <div className="list">
        {accounts.map((data) => (
          <AccountCard data={data} key={data.id} />
        ))}
      </div>
    </StyledAccountList>
  );
}
