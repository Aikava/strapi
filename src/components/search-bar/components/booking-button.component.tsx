import styled from 'styled-components';
import { ReactComponent as Arrow } from 'src/assets/icons/Arrow.svg';

const StyledBookingButton = styled.button`
  cursor: pointer;
  width: 100px;
  height: 100%;
  background: #ffd34d;
  border: none;
`;

export function BookingButtonComponent(): JSX.Element {
  return (
    <StyledBookingButton>
      <Arrow />
    </StyledBookingButton>
  );
}
