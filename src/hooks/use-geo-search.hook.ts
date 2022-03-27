import { useConnector } from 'react-instantsearch-hooks';
import connectGeoSearch from 'instantsearch.js/es/connectors/geo-search/connectGeoSearch';
import type {
  GeoSearchConnectorParams,
  GeoSearchWidgetDescription,
} from 'instantsearch.js/es/connectors/geo-search/connectGeoSearch';

export function useGeoSearch(props?: GeoSearchConnectorParams) {
  return useConnector<GeoSearchConnectorParams, GeoSearchWidgetDescription>(connectGeoSearch, props);
}
