import styled from 'styled-components';
import { ReactComponent as FullScreenIcon } from 'src/assets/icons/FULLSCREEN@2x.svg';
import { ReactComponent as IncreaseIcon } from 'src/assets/icons/+@2x.svg';
import { ReactComponent as DecreaseIcon } from 'src/assets/icons/-@2x.svg';

const StyledMapControl = styled.div`
  width: 40px;
  position: absolute;
  right: 42px;
  top: 28px;
`
export const StyledMapButton = styled.button`
  width: 40px;
  height: 40px;
  background: white;
  border: none;
  cursor: pointer;
`;

// type TMapControlProps = { mapRef: RefObject<HTMLElement> };

export function MapControl(): JSX.Element {
  // const [isFullscreen, setIsFullscreen] = useState(false);
  // const handleFullScreen = useCallback(() => {
  //   if (isFullscreen) {
  //     document.exitFullscreen()
  //       .then(() => {
  //         setIsFullscreen(false)
  //       });
  //     return;
  //   }
  //
  //   if (mapRef.current) {
  //     mapRef.current
  //           .requestFullscreen()
  //           .then(() => {
  //             setIsFullscreen(true);
  //           })
  //           .catch();
  //   }
  // }, []);

  return (
    <StyledMapControl>
      <StyledMapButton>
        <IncreaseIcon />
      </StyledMapButton>
      <StyledMapButton>
        <DecreaseIcon />
      </StyledMapButton>
      {/*<StyledMapButton onClick={handleFullScreen}>*/}
      {/*{!isFullscreen && <FullScreenIcon />}*/}
      {/*{isFullscreen && <FullscreenOutIcon />}*/}
     {/*</StyledMapButton>*/}
      <StyledMapButton>
        <FullScreenIcon />
      </StyledMapButton>
    </StyledMapControl>
  );
}
