import React from 'react';
import { SearchBarComponent } from 'src/components/search-bar';
import { BookingButtonComponent } from 'src/components/search-bar/components';
import { useMobile } from 'src/hooks';
import styled from 'styled-components';

const StyledHeader = styled.div`
  background: white;
  box-shadow: 0 2px 4px rgba(199, 199, 199, .5);
  height: 100%;
  display: flex;
`

const StyledHeaderTitle = styled.div`
  width: ${({ isMobile }: { isMobile: boolean }) => isMobile ? '50%' : '490px'};
  size: 24px;
  padding-left: ${({ isMobile }: { isMobile: boolean }) => isMobile ? '18px' : '39px'};
  padding-top: ${({ isMobile }: { isMobile: boolean }) => isMobile ? '20px' : '39px'};
  box-sizing: border-box;
  font-weight: bold;
  letter-spacing: 3.69px;
`

export function Header(): JSX.Element {
  const isMobile = useMobile();

  return (
    <StyledHeader>
      <StyledHeaderTitle isMobile={isMobile}>
        SPACE&nbsp;TRIPS
      </StyledHeaderTitle>
      {!isMobile && <SearchBarComponent />}
      <BookingButtonComponent />
    </StyledHeader>
  );
}
