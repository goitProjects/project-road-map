import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { Icon } from '../Icon';

// ----------------------------------------------------------------------

export const ModalTitle = styled.h3`
  white-space: nowrap;
  /* padding-right: 440px; */
  color: #fbfcfc;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 40px;
  margin-top: 20px;
`;

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
  display: block;
  height: 552px;
  position: relative;
  width: 704px;
  padding: 44px;
  display: flex;
  flex-direction: column;
  background: #202020;
  border-radius: 15px;
  box-shadow: 0px 4px 60px 0px rgba(0, 0, 0, 0.25);
`;

// ----------------

export const TitlePlusDiv = styled.div`
  display: flex;
  gap: 220px;
  justify-content: center;
  align-items: center;
`;

export const BtnPlus = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  background-color: #47523f;
  color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.3s ease, transform 0.3s ease;

  &:hover {
    opacity: 0.8;
    transform: translateY(-1px);
  }
`;
// ---------input BOX------------

export const MainDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 16px;
  margin-bottom: 44px;
`;

export const InputRowDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 11px;
`;

export const Label = styled.label`
  color: #fbfcfc;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
`;

export const Span = styled.span`
  margin-left: 10px;
`;

export const Hr = styled.hr`
  width: 616px;
  height: 0px;
  flex-shrink: 0;
  border: 1px solid rgba(251, 252, 252, 0.4);
`;

export const DatePickerStyle = styled(DatePicker)`
  width: 200px;
  height: 46px;
  border-radius: 12px;
  background: #282828;
  border: none;
  color: rgba(251, 252, 252, 0.3);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  text-indent: 10px;
  color: #fbfcfc;
  cursor: pointer;
`;
export const IconStyle = styled(Icon)`
  cursor: pointer;
  bottom: 15%;
  right: 5%;
`;

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

  .react-datepicker__current-month,
  .react-datepicker__navigation {
    /* width: 0px; */
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

  .react-datepicker-time__header {
    color: var(--white);
  }
  .react-datepicker__time-list-item {
    background-color: #47523f;
    color: var(--white);
    cursor: pointer;
  }

  .react-datepicker__time-list-item:hover {
    color: black;
  }
  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item--selected {
    background-color: wheat;
    color: var(--black);
  }
  .react-datepicker__time-container .react-datepicker__time {
    background: #47523f;
  }
`;

// -------------------------------------

//  ++++INPUTS +++++++++

export const MidInputStyle = styled.input`
  width: 200px;
  height: 46px;
  border-radius: 12px;
  background: #282828;
  border: none;
  color: rgba(251, 252, 252, 0.3);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  text-indent: 10px;
  color: #fbfcfc;
`;

export const ShortInput = styled.input`
  width: 148px;
  height: 46px;
  border-radius: 12px;
  background: #282828;
  border: none;
  color: rgba(251, 252, 252, 0.3);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  text-indent: 10px;
  color: #fbfcfc;
`;

// +++++++++++++

export const ButtonCloseStyle = styled.button`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: transparent;
  padding: 0;
  line-height: 0;
  border: none;
  cursor: pointer;
  display: none;

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

// ================

// /////////////////
export const CancelBtnStyle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 130px;
  height: 50px;
  padding: 13px 68px;
  background-color: #282828;
  border-radius: 12px;
  border: none;
  line-height: 1.5;
  font-size: 14px;
  letter-spacing: 1.8px;
  color: #fbfcfc;
  font-weight: 400;
  cursor: pointer;

  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.3s ease, transform 0.3s ease;

  &:hover {
    opacity: 0.8;
    transform: translateY(-1px);
  }
`;

export const AddBtnStyle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 130px;
  height: 50px;
  padding: 13px 68px;
  background-color: #47523f;
  border-radius: 12px;
  border: none;
  line-height: 1.5;
  font-size: 14px;
  letter-spacing: 1.8px;
  color: #fbfcfc;
  font-weight: 400;

  cursor: pointer;

  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.3s ease, transform 0.3s ease;

  &:hover {
    opacity: 0.8;
    transform: translateY(-1px);
  }
`;

export const BtnActive = styled.div`
  display: flex;

  text-align: center;
  gap: 8px;
  margin-top: 11px;
  margin-right: 295px;
`;
