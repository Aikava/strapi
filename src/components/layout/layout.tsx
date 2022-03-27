import { useMobile } from 'src/hooks';
import styled from 'styled-components';

const StyledLayout = styled.div`
  font-family: Lato;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: ${
    (props: { isMobile: boolean }): string  => props.isMobile ? 'auto' : '490px auto'
  };
  grid-template-rows: ${(props: { isMobile: boolean }): string  => props.isMobile ? '56px auto 230px' : '88px auto'};
  background: #f2f2f2;
`;

const StyledList = styled.div`
  grid-row: ${(props: { isMobile: boolean }): string  => props.isMobile ? '3' : '2'};
  overflow: scroll;
`;

const StyledHeaderCell = styled.div`
  grid-column: ${(props: { isMobile: boolean }): string  => props.isMobile ? '1' : '1 / span 2'};
`;

type TLayoutProps = {
  header: JSX.Element;
  flightList: JSX.Element;
  map: JSX.Element;
};
export function Layout(props: TLayoutProps): JSX.Element {
  const isMobile = useMobile();

  return (
    <StyledLayout isMobile={isMobile}>
      <StyledHeaderCell isMobile={isMobile}>{props.header}</StyledHeaderCell>
      <StyledList isMobile={isMobile}>{props.flightList}</StyledList>
      {props.map}
    </StyledLayout>
  );
}

