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
  .css-1u9des2-indicatorSeparator {
    display: none;
  }

  @media screen and (min-width: 768px) {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 60px 0px;
  }
`;

export const ModalWindowStyle = styled.div`
  display: block;
  height: 656px;
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
  width: 746px;
  /* min-height: 700px; */
  padding: 44px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
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
// --------------INFROM TITLE

export const InformTitle = styled.h3`
  color: #fbfcfc;

  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 28px;
`;

//   InputContainerDiv

export const InputContainerDiv = styled.div`
  /* position: relative; */
  /* margin-top: -160px; */
  display: flex;
  flex-wrap: wrap;
  row-gap: 16px;
  margin-bottom: 44px;
`;

// InputRowDiv

export const InputRowDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  gap: 8px;
`;

// First Row
export const Label = styled.label`
  color: #fbfcfc;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  position: relative;
`;

export const Span = styled.span`
  margin-left: 10px;
`;
export const DocumentNumber = styled.p`
  position: absolute;
  color: #fbfcfc;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  left: 157px;
  top: -25px;
`;

export const MilitaryBase = styled.p`
  position: absolute;
  color: #fbfcfc;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  left: 303px;
  top: -25px;
`;

export const Driver = styled.p`
  position: absolute;
  color: #fbfcfc;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  left: 493px;
  top: -25px;
`;

// OdometerTitle

export const OdometerTitle = styled.h3`
  color: #fbfcfc;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  white-space: nowrap;
`;

// -----

export const OdomPlusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 35px;

  gap: 340px;
`;

//  BtnPlus

export const BtnPlus = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
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

// Time container

export const BtnTrash = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #191413;
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

export const TimeDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 36px;
  margin-bottom: 44px;
`;
export const InputTimeDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

// PICKER

export const DatePickerOne = styled(DatePicker)`
  text-indent: 10px;
  width: 135px;
  height: 46px;
  border-radius: 12px;
  background: #282828;
  border: none;
  color: #fbfcfc;
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

export const DatePickerOneLeave = styled(DatePicker)`
  text-indent: 10px;
  width: 330px;
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
  background: #282828;
  border: none;
  color: #fbfcfc;
`;

export const MidInputStyle = styled.input`
  text-indent: 10px;
  width: 182x;
  height: 46px;
  border-radius: 12px;
  background: #282828;
  border: none;
  color: #fbfcfc;
`;

export const LongInput = styled.input`
  text-indent: 10px;
  width: 214px;
  height: 46px;
  border-radius: 12px;
  background: #282828;
  border: none;
  color: #fbfcfc;
`;

export const ToLongInput = styled.input`
  text-indent: 10px;
  width: 220px;
  height: 46px;
  border-radius: 12px;
  background: #282828;
  border: none;
  color: #fbfcfc;
`;

// ------------------------

// 22222222222222222222222222

export const BtnBox = styled.div`
  display: flex;
  gap: 8px;
  text-align: center;
`;

export const ConfirmBtnStyle = styled.button`
  width: 151px;
  height: 48px;
  color: #fbfcfc;
  border: none;
  border-radius: 12px;
  background: #47523f;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
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

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #282828;
  border-radius: 12px;
  border: none;
  line-height: 20px;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 1.8px;
  color: #fbfcfc;

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
