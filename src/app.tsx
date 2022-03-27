import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Configure } from 'react-instantsearch-hooks';
import { MapStateProvider } from './state/application.state';
import { Header } from './components/header';
import { Layout } from './components/layout';
import { SpaceCenterMap } from './components/map';
import { FlightList } from './components/flight-list';

const searchClient = algoliasearch('UORHJCOG49', '74fb98e8049e4753ce230f010774b425');

export function App(): JSX.Element {
  return (
    <MapStateProvider>
      <Layout
        header={<Header />}
        flightList={<FlightList />}
        map={
          <InstantSearch
            searchClient={searchClient}
            indexName="space-centers"
          >
            <Configure
              facets={['*','planet_code']}
              facetFilters={[['planet_code:EAR']]}
            />
            <SpaceCenterMap />
          </InstantSearch>
        }
      />
    </MapStateProvider>
  );
}



