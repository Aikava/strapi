import { useContext, useEffect, useRef, useState } from 'react';
import { useMobile } from 'src/hooks';
import { MapStateContext } from 'src/state/application.state';
import styled from 'styled-components';
import { apiService } from 'src/services/api-service';
import { CardFlightModel } from 'src/models/card-flight.model';
import { CardFlight } from '../card-flight';

const StyledList = styled.div`
  display: flex;
  flex-direction: ${({ isMobile }: { isMobile?: boolean}) =>  isMobile ? 'row' : 'column'};
  height: 100%;
  padding: 32px 50px 32px 40px;
`;

export function FlightList() {
  const { mapState: { spaceCenters, currentMarker } } = useContext(MapStateContext);
  const [flights, setFlights] = useState<Array<CardFlightModel>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!spaceCenters.length) return;

    setIsLoading(true);
    const promiseFlights = spaceCenters.map((spaceCenter) => {
      return apiService.getFlightsByUID('2019-09-23', spaceCenter.uid)
    });

    let cancelPromiseResolver: (value?: unknown) => void;
    let isCanceled = false;
    let cancelPromise = new Promise((res, rej) => {
      cancelPromiseResolver = res;
    });
    const finalPromise = Promise.all(promiseFlights)
      .then((data) => {
        if (isCanceled) return;
        setFlights(data);
        setIsLoading(false);
      });
    void Promise.race([finalPromise, cancelPromise]);

    return () => {
      isCanceled = true;
      cancelPromiseResolver();
    };
  }, [spaceCenters]);
  const isMobile = useMobile();

  return (
    // @ts-ignore
    <StyledList ref={listRef} isMobile={isMobile}>
      {!isLoading && flights.map((cardFlight: CardFlightModel) => {
        return (
          <CardFlight
            isMobile={isMobile}
            isSelected={currentMarker?.uid === cardFlight.uid}
            key={cardFlight.id}
            {...cardFlight}
          />);
      })}
      {isLoading && (<div>Loading...</div>)}
    </StyledList>
  );
}
