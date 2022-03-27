import { Marker } from 'react-map-gl';
import { ReactComponent as Pointer } from 'src/assets/icons/Pointer@2x.svg';
import { ReactComponent as SelectedPointer } from 'src/assets/icons/Pointer_selected@2x.svg';

type TMapMarker = {
  isSelected?: boolean;
  longitude: number;
  latitude: number;
  onClick?: (markerInfo: any) => void;
}

export function MapMarker({ isSelected, longitude, latitude, onClick }: TMapMarker): JSX.Element {
  return (
    <Marker
      longitude={longitude}
      latitude={latitude}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      {!isSelected && <Pointer />}
      {isSelected && <SelectedPointer />}
    </Marker>
  );
}
