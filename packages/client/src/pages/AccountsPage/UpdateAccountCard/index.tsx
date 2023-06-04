import {
  StyledBar,
  StyledButton,
  StyledCard,
  StyledFieldSet,
  StyledForm,
  StyledIconsList,
  StyledInput,
  StyledLabel,
  StyledTitle,
} from "@/components/styled";
import styled from "styled-components";
import { VscClose } from "react-icons/vsc";
import Draggable from "react-draggable";
import { IAccount } from "@/interface";
import { useHookstate } from "@hookstate/core";

export const StyledUpdateAccountCard = styled(StyledCard)`
  position: absolute;
  width: max-content;
  max-width: 30rem;

  ${StyledBar} {
    button {
      height: max-content;
    }
  }

  .buttons {
    margin-block: 2.4rem;
    display: flex;
    gap: 0.9rem;
  }
`;

interface Props {
  onClose(): any;
  onSave(data: IAccount): any;
  data: IAccount;
}

export function UpdateAccountCard(props: Props) {
  const state = useHookstate<IAccount>({ ...props.data });
  const values = state.get();

  return (
    <Draggable handle=".header">
      <StyledUpdateAccountCard>
        <StyledBar as={"header"} className="header">
          <StyledTitle size="small">{values.name}</StyledTitle>
          <StyledIconsList>
            <button onClick={props.onClose}>
              <VscClose />
            </button>
          </StyledIconsList>
        </StyledBar>
        <div className="content">
          <StyledForm
            onSubmit={(e) => {
              e.preventDefault();
              props.onSave(values);
            }}
          >
            <StyledFieldSet>
              <StyledLabel>Name</StyledLabel>
              <StyledInput
                value={values.name}
                onChange={(e) => state.name.set(e.target.value)}
              />
            </StyledFieldSet>
            <StyledFieldSet>
              <StyledLabel>Description</StyledLabel>
              <StyledInput
                value={values.description}
                onChange={(e) => state.description.set(e.target.value)}
              />
            </StyledFieldSet>
            <div className="buttons">
              <StyledButton>Salvar</StyledButton>
              <StyledButton onClick={props.onClose}>Cancelar</StyledButton>
            </div>
          </StyledForm>
        </div>
      </StyledUpdateAccountCard>
    </Draggable>
  );
}
