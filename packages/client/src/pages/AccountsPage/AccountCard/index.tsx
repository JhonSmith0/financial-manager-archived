import { IAccount } from "@/interface";
import { remove } from "@/state/accountsState";
import styled from "styled-components";
import { StyledBar } from "@/components/styled";
import { HiOutlineTrash } from "react-icons/hi";

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
  return (
    <StyledAccountCard>
      <StyledBar as={"header"}>
        <span>{data.name}</span>
        <button
          onClick={async () => {
            await remove(data.id);
          }}
        >
          <HiOutlineTrash />
        </button>
      </StyledBar>
      <div className="content">
        <p>{data.description}</p>
      </div>
    </StyledAccountCard>
  );
}
