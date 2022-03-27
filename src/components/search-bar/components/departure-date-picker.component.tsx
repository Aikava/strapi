import { useCallback, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Control } from '../../control';
import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const StyledDatePicker = styled.div`
  display: flex;
  align-items: center;
  color: #fafafb;
  size: 14px;
`;
const StyledReactDatepickerPopper = createGlobalStyle`
  .react-datepicker {
    border: none;
    border-radius: 0;
  }
  .react-datepicker__popper {
    z-index: 3;
    border: none;
  }
`;
export function DepartureDatePickerComponent(): JSX.Element {
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<Date>(new Date());
  const handleDateChange = useCallback((newDate: Date) => {
    setDate(newDate);
  }, []);
  const handleTimeChange = useCallback((newTime: Date) => {
    setTime(newTime);
  }, []);

  return (
    <StyledDatePicker>
      <Control label="Departure&nbsp;time">
        <ReactDatePicker
          selected={date}
          onChange={handleDateChange}
          popperClassName="react-datepicker__popper"
          showPopperArrow={false}
        />
      </Control>
      –
      <Control>
        <ReactDatePicker
          showTimeSelectOnly
          showTimeSelect
          selected={time}
          onChange={handleTimeChange}
          dateFormat="h:mm aa"
          popperClassName="react-datepicker__popper"
          showPopperArrow={false}
        />
      </Control>
      <StyledReactDatepickerPopper />
    </StyledDatePicker>
  );
}
