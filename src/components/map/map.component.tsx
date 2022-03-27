import { useContext } from 'react';
import ReactMapGL, {
  FullscreenControl,
  NavigationControl,
} from 'react-map-gl';
import { useSearchSpaceCenters } from 'src/hooks/use-search-space-centers.hook';
import { MapStateContext, updateCurrentMarker } from 'src/state/application.state';
import { SpaceCenterPopup } from './space-center.popup';
import { MapControl, SearchWhenDrag } from '../map-control';
import { MapMarker } from './map-marker';
import debounce from 'lodash.debounce';

const viewport = {
  width: '100%',
  height: 900,
  latitude: 41.579606918652054,
  longitude: 4.244298260567439,
  zoom: 3.5,
  bearing: 0,
  pitch: 0,
  transitionDuration: 1000
};

export function SpaceCenterMap(): JSX.Element {
  const { mapState, dispatchMapState } = useContext(MapStateContext);
  const { currentMarker, spaceCenters } = mapState;
  const { mapRef, updateBounds } = useSearchSpaceCenters();
  const handleMove = debounce(updateBounds, 100)

  return (
    <ReactMapGL
      ref={mapRef}
      mapboxAccessToken="pk.eyJ1IjoiYWlrYXZhLWtpenVuYSIsImEiOiJjbDEybTV2bngwODZzM2ltdmx0MmV3anVrIn0.MN2k7ygi5GxktBJrVmI7dg"
      initialViewState={viewport}
      mapStyle="mapbox://styles/mapbox/dark-v8"
      attributionControl={false}
      style={{ position: 'relative' }}
      onMove={() => handleMove}
      onMoveEnd={() => updateBounds()}
      onLoad={() => updateBounds()}
    >
      {spaceCenters.map((item) => {
        const { uid, _geoloc } = item;
        return (
          <MapMarker
            isSelected={currentMarker?.uid === uid}
            key={uid}
            longitude={_geoloc.lng}
            latitude={_geoloc.lat}
            onClick={() => dispatchMapState(updateCurrentMarker(item))}
          />
        );
      })}
      <SpaceCenterPopup
        isOpen={!!currentMarker}
        onClose={() => dispatchMapState(updateCurrentMarker(null))}
        data={currentMarker}
      />
      <FullscreenControl />
      <NavigationControl showCompass={false}/>
      <SearchWhenDrag />
      <MapControl />
    </ReactMapGL>
  );
}
