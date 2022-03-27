import { useEffect, useRef } from 'react';
import { CardFlightModel } from 'src/models/card-flight.model';
import styled, { css, keyframes } from 'styled-components';
import { ReactComponent as Rocket } from 'src/assets/icons/Rocket@2x.svg';


const StyledCard = styled.div`
  background: #ffffff;
  width: ${({ isMobile }: { isMobile?: boolean }) => isMobile ? '234px' : '400px' };
  height: ${({ isMobile }: { isMobile?: boolean }) => isMobile ? '149px' : '200px' };
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, .25);
  position: relative;
`;
const StyledName = styled.div`
  color: #4e4e4e;
  font-size: 16px;
  font-family: "Lato Bold";
  font-weight: bold;
  margin-bottom: 9px;
`;
const StyledDepartures = styled.div`
  color: #4e4e4e;
  font-size: 16px;
  font-family: 'Lato';
`;
const StyledPlanetName = styled.div`
  font-size: 12px;
  color: #4e4e4e;
  margin-bottom: 30px;
`;
const StyledBody = styled.div`
  padding: ${({ isMobile }: { isMobile?: boolean }) => isMobile ? '8px 8px 19px 8px' : '25px 24px 37px' };
  flex: 1 1 auto;
`;
const StyledButton = styled.button`
  width: 100%;
  background: #333333;
  height: 48px;
  cursor: pointer;
  color: #fafafb;
  font-size: 12px;
  border: none;
`;
const bounding = keyframes`
  0% { transform: translateY(0); }
  25% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  75% { transform: translateY(0); }
  100% { transform: translateY(0); }
`;
const StyledRocketWrapper = styled.div`
  position: absolute;
  top: 25px;
  right: 27px;
  animation: ${({ isSelected }: { isSelected?: boolean }) => isSelected ? css`0.5s ease-in-out ${bounding} 6` : 'none'};
`;

export function CardFlight(props: CardFlightModel & { isSelected?: boolean; isMobile?: boolean }) {
  const { destinationPlanet, name, departures = 0, isMobile } = props;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && props.isSelected) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [props.isSelected, ref.current]);

  return (
    <StyledCard id={props.uid} ref={ref} isMobile={isMobile}>
      {!isMobile && <RocketIcon isSelected={props.isSelected} />}
      <StyledBody isMobile={isMobile}>
        <StyledName>{name}</StyledName>
        <StyledPlanetName>{destinationPlanet}</StyledPlanetName>
        <StyledDepartures>{departures} departures planned today</StyledDepartures>
      </StyledBody>
      <StyledButton>
        SEE&nbsp;ALL&nbsp;FLIGHTS
      </StyledButton>
    </StyledCard>
  );
}

function RocketIcon({ isSelected }: { isSelected?: boolean }): JSX.Element {
  return (
    <StyledRocketWrapper isSelected={isSelected}>
      <Rocket />
    </StyledRocketWrapper>
  );
}

