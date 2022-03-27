import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const StyledLabel = styled.span`
  display: flex;
  align-items: center;
  color: #fafafb;
  size: 14px;
  font-family: Lato;

  input {
    background: none;
    border: 0;
    outline: none;
    color: #fafafb;
    size: 14px;

    &:focus {
      outline: none;
    }
    border-bottom: 1px solid #ffffff;
  }
`;
const StyledLabelText = styled.p`
  padding-right: 43px;
  padding-left: 49px;
`;
type TControlProps = {
  label?: string;
}

export function Control({ children, label }: PropsWithChildren<TControlProps>): JSX.Element {
  return (
    <StyledLabel>
      {label && <StyledLabelText>{label}</StyledLabelText>}
      {children}
    </StyledLabel>
  );
}
