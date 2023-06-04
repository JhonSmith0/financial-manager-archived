import styled from "styled-components";

export const StyledContainer = styled.div``;

const StyledTitleSizes = {
  small: "1.8rem",
  medium: "2.4rem",
  big: "3.2rem",
  large: "4.2rem",
};
export const StyledTitle = styled.h2<{ size?: keyof typeof StyledTitleSizes }>`
  font-size: ${(props) => {
    return StyledTitleSizes[props.size || "big"];
  }} !important;

  text-overflow: ellipsis;
  overflow: hidden;
`;

export const StyledForm = styled.form``;

export const StyledFieldSet = styled.fieldset`
  margin-block: 1.2rem;
  border: none;
  font-size: 1.8rem;
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 0.8rem;
`;
export const StyledInput = styled.input`
  font-size: 1.4rem;
  padding: 0.6rem;

  border: solid 1px #999;
  outline: none;
  width: max-content;

  &:focus-visible {
    background: #f1f3f5;
  }
`;

export const StyledButton = styled.button`
  background: #4c6ef5;
  color: white;
  padding: 1.4rem 2.8rem;
  border-radius: 0.3rem;
`;

export const StyledBar = styled.div`
  height: 6.4rem;
  /* border-bottom: solid 1px #222; */
  padding: 1.2rem;
  padding-inline: var(--inline-padding);

  display: flex;
  align-items: center;

  font-size: 1.8rem;
`;

export const StyledHomeOutLet = styled.div``;

export const StyledCard = styled.div`
  min-width: 20rem;
  box-shadow: 0px 12px 12px rgb(0, 0, 0, 0.05);
  border-radius: 4px;
  overflow: hidden;

  --padding-inline: 1.4rem;
  background: #fff;
`;

export const StyledIconsList = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  height: max-content;
  width: max-content;
`;
