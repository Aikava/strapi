import mapboxgl from 'mapbox-gl';
import { RefObject, useCallback, useEffect, useState } from 'react';
import { MapRef } from 'react-map-gl';

export function useMapBoundsHook(mapRef: RefObject<MapRef>):
  [mapboxgl.LngLatBounds | null, (value?:mapboxgl.LngLatBounds) => void] {
  const [bounds, setBounds] = useState<mapboxgl.LngLatBounds | null>(null);
  const update = useCallback((value?: mapboxgl.LngLatBounds) => {
    if (value) {
      if (!validateBounds(value)) return;
      setBounds(value);
      return;
    }

    if (mapRef.current) {
      setBounds(mapRef.current.getBounds());
    }
  }, [mapRef.current]);
  useEffect(() => {
    if (mapRef.current) {
      const bounds = mapRef.current.getBounds();
      const isValidBounds = validateBounds(bounds);

      isValidBounds ? update(bounds) : update(mapboxgl.LngLatBounds.convert([180, 90, -180, -90]));
    }
  }, [mapRef.current]);

  return [bounds, update];
}

function validateBounds(bounds: mapboxgl.LngLatBounds): boolean {
  const [swLng, swLat] = bounds.getSouthWest().toArray();
  const [neLng, neLat] = bounds.getNorthEast().toArray();

  return [swLng, neLng].some((val) => val > 180 || val < -180) ||
         [swLat, neLat].some((val) => val > 90 || val < -90);
}
