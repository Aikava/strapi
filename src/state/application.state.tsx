import { GeoHit } from 'instantsearch.js/es/connectors/geo-search/connectGeoSearch';
import { createContext, Dispatch, ReactChild, ReactChildren, useReducer } from 'react';

type TMapState = {
  spaceCenters: Array<GeoHit>;
  currentMarker: GeoHit | null;
};

const initialMapState: TMapState = {
  spaceCenters: [],
  currentMarker: null
}

export enum MapStateAction {
  updateCurrentMarker = 'update-current-marker',
  updateSpaceCenters = 'update-space-centers'
}

interface TMapStateActionUpdateCurrentMarker {
  type: MapStateAction.updateCurrentMarker;
  payload: GeoHit | null;
}

interface TMapStateActionUpdateSpaceCenters {
  type: MapStateAction.updateSpaceCenters;
  payload: Array<GeoHit>;
}

type TMapStateAction = TMapStateActionUpdateSpaceCenters | TMapStateActionUpdateCurrentMarker;

function reducer(state: TMapState, action: TMapStateAction) {
  switch (action.type) {
    case MapStateAction.updateCurrentMarker:
      return { ...state, currentMarker: action.payload };
    case MapStateAction.updateSpaceCenters:
      return { ...state, spaceCenters: action.payload};
    default:
      return state;
  }
}
type TMapStateContext = {
  mapState: TMapState;
  dispatchMapState: Dispatch<TMapStateAction>;
}

export const MapStateContext = createContext<TMapStateContext>({
  mapState: initialMapState,
  dispatchMapState: value => { return void 0; }
});

export function updateCurrentMarker(marker: GeoHit | null): TMapStateActionUpdateCurrentMarker {
  return { type: MapStateAction.updateCurrentMarker, payload: marker };
}

export function updateSpaceCenters(spaceCenters: Array<GeoHit>): TMapStateActionUpdateSpaceCenters {
  return { type: MapStateAction.updateSpaceCenters, payload: spaceCenters };
}
export function MapStateProvider({ children }: { children: ReactChildren | ReactChild }): JSX.Element {
  const [mapState, dispatch] = useReducer(reducer, initialMapState);

  return (
    <MapStateContext.Provider value={{ mapState, dispatchMapState: dispatch }}>
      { children }
    </MapStateContext.Provider>
  );
}

