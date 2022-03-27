import algoliasearch from 'algoliasearch/lite';
import { BookingButtonComponent, DepartureDatePickerComponent, DepartureSearchComponent } from './components';
import styled from 'styled-components';
import { InstantSearch, Configure } from 'react-instantsearch-hooks';

const searchClient = algoliasearch('UORHJCOG49', '74fb98e8049e4753ce230f010774b425');

const StyledSearchBar = styled.div`
  background: #333333;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-grow: 1;
`;

export function SearchBarComponent(): JSX.Element {
  return (
    <StyledSearchBar>
      <InstantSearch
        searchClient={searchClient}
        indexName="space-centers"
      >
        <Configure
          facets={['*','planet_code']}
          facetFilters={[['planet_code:EAR']]}
        />
        <DepartureSearchComponent />
        <DepartureDatePickerComponent />
      </InstantSearch>
    </StyledSearchBar>
  );
}
