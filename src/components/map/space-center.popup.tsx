import { GeoHit } from 'instantsearch.js/es/connectors/geo-search/connectGeoSearch';
import { Popup } from 'react-map-gl';
import styled, { createGlobalStyle } from 'styled-components';

type TSpaceCenterPopupProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  data: GeoHit | null;
}
const StyledPopup = createGlobalStyle`
  .map-popup {
    z-index: 10;
    width: 255px;
    
    .mapboxgl-popup-content {
      border-radius: 0;
      padding: 0;
    }
  }
`;
const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const Description = styled.div`
  padding: 16px 32px 21px 19px;
  size: 16px;
  font-weight: bold;
  font-family: Lato;
`;
const Image = styled.img`
  width: 100%;
  height: 144px;
`;

export function SpaceCenterPopup(props: TSpaceCenterPopupProps): JSX.Element | null {
  const { isOpen, data, onClose } = props;
  if (!isOpen || !data) {
    return null;
  }

  return (
    <>
      <Popup
        closeOnClick={false}
        onClose={onClose}
        longitude={data._geoloc.lng}
        latitude={data._geoloc.lat}
        className="map-popup"
      >
        <PopupContent>
          <Image />
          <Description>{data.name}</Description>
        </PopupContent>
      </Popup>
      <StyledPopup />
    </>
  );
}
