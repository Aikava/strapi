import {
  ChangeEvent,
  PropsWithChildren,
  RefObject,
  useCallback,
  useRef,
  useState
} from 'react';
import { useHits, useSearchBox } from 'react-instantsearch-hooks';
import { SpaceCenter } from 'src/models/space-center.model';
import styled from 'styled-components';
import { Control } from '../../control';
import ReactDOM from 'react-dom';

const StyledSearchInput = styled.input`
  width: 176px;
`;

export function DepartureSearchComponent(): JSX.Element {
  const { refine } = useSearchBox();
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);

    refine(value);
  }, []);
  const [inputValue, setInputValue] = useState('');
  const { hits } = useHits<SpaceCenter>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSuggestOpen, setSuggestOpen] = useState(false);
  const handleItemClick = useCallback((hit: SpaceCenter) => {
    setInputValue(hit.name);
    setSuggestOpen(false);
  }, []);

  return (
    <Control
      label="Departure"
    >
      <StyledSearchInput
        ref={inputRef}
        value={inputValue}
        onChange={handleChange}
        onFocus={() => setSuggestOpen(true)}
        onBlur={() => setSuggestOpen(false)}
      />
      <SearchSuggest
        isOpen={isSuggestOpen}
        parentRef={inputRef}
      >
        {hits.map((hit: SpaceCenter) => {
          return (
            <SearchSuggestItem key={hit.uid} value={hit.name} onClick={() => handleItemClick(hit)}/>
          );
        })}
      </SearchSuggest>
    </Control>
  );
}

type TSearchSuggestProps = {
  isOpen?: boolean;
  parentRef: RefObject<HTMLElement>;
}

function SearchSuggest({ isOpen, parentRef, children }: PropsWithChildren<TSearchSuggestProps>): JSX.Element | null {
  if (!isOpen || !parentRef.current) {
    return null;
  }

  const { offsetTop: top, offsetHeight: height, offsetLeft: left } = parentRef.current;

  return ReactDOM.createPortal(
    <SearchSuggestComponent isShowed={isOpen} top={top + height} left={left}>
      {children}
    </SearchSuggestComponent>,
    document.body
  );
}

type TSearchSuggestContentProps = {
  top: number;
  left: number;
  isShowed?: boolean;
};

const StyledSuggest = styled.div`
  top: ${({ top }: TSearchSuggestContentProps) => top}px;
  left: ${({ left }: TSearchSuggestContentProps) => left}px;
  position: absolute;
  max-height: 128px;
  background: white;
  overflow: scroll;
`;

function SearchSuggestComponent(props: PropsWithChildren<TSearchSuggestContentProps>): JSX.Element {
  if (!props.isShowed) return <div />;

  return (
    <StyledSuggest top={props.top} left={props.left}>
      {props.children}
    </StyledSuggest>
  );
}

const StyledItem = styled.div`
  cursor: pointer;
  margin-top: 5px;
  margin-left: 8px;
  padding-block: 5px;
  border-bottom: 1px solid #eeeeee;
  font-family: Lato;
  size: 11px;
  z-index: 2;
  
  &:hover {
    font-weight: bold;
  }
`;
type TSearchSuggestItemProps = {
  value: string;
  onClick?: VoidFunction;
}
function SearchSuggestItem({ value, onClick }: TSearchSuggestItemProps): JSX.Element {
  return (
    <StyledItem onMouseDown={onClick}>
      {value}
    </StyledItem>
  );
}
