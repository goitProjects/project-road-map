import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { Icon } from '../Icon';

export const OverlayStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1200;
  background: rgba(34, 13, 91, 0.23);
  backdrop-filter: blur(3.5px);
  transition: opacity 500ms ease-in-out, visibility 500ms ease-in-out;
  opacity: 1;
  visibility: visible;

  @media screen and (min-width: 768px) {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 60px 0px;
  }
`;

export const ModalWindowStyle = styled.div`
  display: block;
  max-width: 800px;
  overflow-y: scroll;
  &::-webkit-scrollbar-thumb {
    border-radius: 15px;
    background: #282828;
  }
  &::-webkit-scrollbar-track {
    box-shadow: black;
  }
  &::-webkit-scrollbar {
    height: 112px;
    width: 0.5em;
  }

  position: relative;
  padding: 44px;
  display: flex;
  flex-direction: column;
  background: #202020;
  border-radius: 15px;
  box-shadow: 0px 4px 60px 0px rgba(0, 0, 0, 0.25);
`;

export const ButtonCloseStyle = styled.button`
  background-color: transparent;
  position: absolute;
  line-height: 0;
  border: none;
  cursor: pointer;
  display: none;
  top: 20px;
  right: 20px;

  @media screen and (min-width: 768px) {
    display: block;
  }

  &:hover {
    transform: scale(1.2);
    transition: transform 0.3s ease-in-out;
  }
  &:not(:hover) {
    transform: scale(1);
    transition: transform 0.3s ease-in-out;
  }
`;

export const InformTitle = styled.h3`
  color: #fbfcfc;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 28px;
`;

export const InputContainerDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 16px;
  margin-bottom: 44px;
`;

export const InputRowDiv = styled.div`
  display: flex;

  gap: 8px;
`;

export const InputLegendDiv = styled.div`
  display: grid;

  gap: 8px;
`;

export const InputMultiDiv = styled.div`
  display: flex;
  width: 100%;

  gap: 8px;
`;

// First Row
export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #fbfcfc;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  position: relative;
`;

export const CheckboxLabel = styled(Label)`
  display: flex;
  align-items: center;
  gap: 8px;
  > input[type='checkbox'] {
    height: 46px;
    width: 20px;
  }
`;

export const CheckboxDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const Legend = styled.legend`
  color: #fbfcfc;
  font-weight: 500;
  line-height: 18px;
  text-indent: 10px;
`;

export const Span = styled.span`
  margin-left: 10px;
`;

export const ErrorSpan = styled.span`
  font-size: 12px;
  font-weight: 400;
  position: absolute;
  top: 45px;
  left: 10px;
`;

export const InputDiv = styled.div`
  position: relative;
`;

// PICKER

export const PickerContainer = styled.div`
  .react-datepicker__view-calendar-icon input {
    padding: 0 !important;
  }

  .react-datepicker {
    background: #47523f;
    border: none;
  }
  .react-datepicker__header {
    border-radius: 8px;
    border: none;
    background: var(--black);

    font-weight: normal;
  }
  .react-datepicker__month-container {
    float: left;
    background: var(--black);
    border-radius: 8px;
  }
  .react-datepicker__triangle {
    visibility: hidden;
  }
  .react-datepicker__month {
    border-top: 1px solid rgba(243, 243, 243, 0.2);
  }

  .react-datepicker__day-name {
    color: rgba(243, 243, 243, 0.2);
  }

  .react-datepicker__day,
  .react-datepicker__time-name,
  .react-datepicker__current-month {
    color: var(--white);
  }

  .react-datepicker__day:hover {
    background: var(--white);
    color: var(--black);
    border-radius: 50%;
  }
  .react-datepicker__day--disabled,
  .react-datepicker__month-text--disabled,
  .react-datepicker__quarter-text--disabled,
  .react-datepicker__year-text--disabled {
    cursor: default;
    color: rgba(243, 243, 243, 0.2);
  }
  .react-datepicker__day--disabled:hover,
  .react-datepicker__month-text--disabled:hover,
  .react-datepicker__quarter-text--disabled:hover,
  .react-datepicker__year-text--disabled:hover {
    background: var(--white);
    color: var(--black);
    border-radius: 50%;
  }
  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background: var(--white);
    color: var(--black);
    border-radius: 50%;
  }
  .react-datepicker__month-read-view,
  .react-datepicker__year-read-view {
    color: var(--white);
    font-size: 16px;
  }
  .react-datepicker__navigation--years,
  .react-datepicker__navigation--years-previous {
    visibility: visible;
    border-color: var(--black);
  }
`;

export const DatePickerOne = styled(DatePicker)`
  text-indent: 10px;
  width: 135px;
  height: 46px;
  border-radius: 12px;
  background: #f3f3f3;
  border: none;
  color: var(--text-dark);
  cursor: pointer;
`;

export const DatePickerTwo = styled(DatePicker)`
  text-indent: 10px;
  width: 182x;
  height: 46px;
  border-radius: 12px;
  background: #282828;
  border: none;
  color: #fbfcfc;
  cursor: pointer;
`;

// Input S,M,L

export const ShortInputStyle = styled.input`
  text-indent: 10px;
  width: 135px;
  height: 46px;
  border-radius: 12px;
  font-weight: 600;
  color: #fbfcfc;
  background: #282828;

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-background-clip: text;
    -webkit-text-fill-color: var(--white);
    background-color: #282828;
    box-shadow: inset 0 0 20px 20px #282828;
    transition: all 0s 50000s;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

export const MidInputStyle = styled(ShortInputStyle)`
  width: 182px;
`;

export const LongInput = styled(ShortInputStyle)`
  width: 214px;
`;

export const ToLongInput = styled(ShortInputStyle)`
  width: 280px;
`;

export const BtnBox = styled.div`
  display: flex;
  gap: 8px;
  text-align: center;
`;

export const ConfirmBtnStyle = styled.button`
  width: 151px;
  height: 48px;
  color: #fbfcfc;
  border-radius: 12px;
  background: #47523f;
  line-height: 1.43;
  cursor: pointer;

  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.3s ease, transform 0.3s ease;

  &:hover {
    opacity: 0.8;
    transform: translateY(-1px);
  }
`;

export const CancelBtnStyle = styled.button`
  width: 132px;
  height: 48px;
  border-radius: 12px;
  line-height: 1.43;
  color: #fbfcfc;
  background-color: #282828;
  cursor: pointer;

  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.3s ease, transform 0.3s ease;

  &:hover {
    opacity: 0.8;
    transform: translateY(-1px);
  }
`;

export const IconStyleClock = styled(Icon)`
  position: absolute;
  cursor: pointer;
  bottom: 21%;
  right: 9%;
  z-index: 2;
`;

export const IconStyleCalendar = styled(Icon)`
  cursor: pointer;
  bottom: 15%;
  right: 5%;
  z-index: 1;
`;
