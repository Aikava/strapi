import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Checkbox } from '../../assets/icons/Checkbox@2x.svg'

const StyledSearchWhenDragInput = styled.button`
  border: none;
  background: white;
  width: 257px;
  height: 40px;
  position: absolute;
  top: 28px;
  left: 50%;
  margin-left: -123.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-left: 40px;
`;

const StyledCheckbox = styled(Checkbox)`
  margin-right: 6px;
`;
const StyledUncheckedCheckbox = styled.div`
  width: 14px;
  height: 14px;
  margin-right: 6px;
  border: 1px solid #f9cb1c;
  border-radius: 16px;
`

export function SearchWhenDrag(): JSX.Element {
  const [isChecked, setIsChecked] = useState(true);
  const onCheck = useCallback(() => {
    setIsChecked((prevState: boolean) => {
      return !prevState;
    });
  }, []);
  return (
    <StyledSearchWhenDragInput onClick={onCheck}>
      {isChecked && <StyledCheckbox />}
      {!isChecked && <StyledUncheckedCheckbox />}
      Search when I drag the map
    </StyledSearchWhenDragInput>
  );
}
