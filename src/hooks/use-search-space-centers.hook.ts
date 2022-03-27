import { useContext, useEffect, useRef } from 'react';
import { MapRef } from 'react-map-gl';
import { useGeoSearch } from './use-geo-search.hook';
import { useMapBoundsHook } from './use-map-bounds.hook';
import { MapStateContext, updateSpaceCenters } from '../state/application.state';

export function useSearchSpaceCenters() {
  const { dispatchMapState } = useContext(MapStateContext);
  const mapRef = useRef<MapRef>(null);
  const [bounds, updateBounds] = useMapBoundsHook(mapRef);
  const { items, refine } = useGeoSearch();

  useEffect(() => dispatchMapState(updateSpaceCenters(items)), [items]);
  useEffect(() => {
    if (bounds) {
      refine({ northEast: bounds.getNorthEast(), southWest: bounds.getSouthWest() });
    }
  }, [bounds]);

  return {
    mapRef,
    updateBounds,
  };
}
