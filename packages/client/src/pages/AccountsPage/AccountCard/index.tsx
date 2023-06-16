import { IAccount } from "@/interface";
import { remove, stateUpdateAccount } from "@/state/accountsState";
import styled from "styled-components";
import { StyledBar, StyledIconsList } from "@/components/styled";
import { HiOutlineTrash, HiOutlineCog } from "react-icons/hi";
import { useHookstate } from "@hookstate/core";
import { UpdateAccountCard } from "../UpdateAccountCard";
import { updateAccount } from "@/services/account";

interface Props {
  data: IAccount;
}

export const StyledAccountCard = styled.div`
  box-shadow: 0px 12px 12px rgb(0, 0, 0, 0.05);
  border-radius: 4px;
  overflow: hidden;

  --padding-inline: 1.4rem;

  ${StyledBar} {
    font-size: 2.4rem;
    color: white;
    background: #364fc7;

    justify-content: space-between;

    padding: 0 var(--padding-inline) !important;

    .icons {
      display: flex;
      gap: 0.6rem;
    }
  }

  svg {
    color: white;
  }

  .content {
    padding: var(--padding-inline);
    font-size: 1.6rem;

    padding-bottom: 2.4rem;
  }
`;

export function AccountCard({ data }: Props) {
  const editing = useHookstate(false);

  function onClose() {
    editing.set(false);
  }

  async function onSave(data: IAccount) {
    const newAcc = await updateAccount(data.id, data);
    onClose();
    stateUpdateAccount(data.id, newAcc);
  }

  return (
    <StyledAccountCard>
      {editing.get() && (
        <UpdateAccountCard data={data} onClose={onClose} onSave={onSave} />
      )}
      <StyledBar as={"header"}>
        <span>{data.name}</span>
        <StyledIconsList>
          <button onClick={() => editing.set(true)}>
            <HiOutlineCog />
          </button>
          <button
            onClick={async () => {
              const value = confirm(
                `Are you sure you want to delete ${data.name}?`
              );
              value && (await remove(data.id));
            }}
          >
            <HiOutlineTrash />
          </button>
        </StyledIconsList>
      </StyledBar>
      <div className="content">
        <p>{data.description}</p>
      </div>
    </StyledAccountCard>
  );
}
