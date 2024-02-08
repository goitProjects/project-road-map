import Select from 'react-select';
import styled from 'styled-components';

// ----------------------------------------------------------------------
export const LongInput = styled.input`
  width: 315px;
  height: 46px;
  border-radius: 12px;
  background: #282828;
  border: none;
  color: #fbfcfc;
  text-indent: 10px;
`;

export const ShortInput = styled.input`
  width: 152px;
  height: 46px;
  border-radius: 12px;
  background: #282828;
  border: none;
  color: #fbfcfc;
  text-indent: 10px;
`;

////////////////////////////////////////////////////////////////////////////////==============================

export const ModalTitle = styled.h3`
  white-space: nowrap;
  padding-right: 440px;
  color: #fbfcfc;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 30px;
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
  height: 656px;
  position: relative;
  width: 720px;
  padding: 44px;
  display: flex;
  flex-direction: column;
  background: #202020;
  border-radius: 15px;
  box-shadow: 0px 4px 60px 0px rgba(0, 0, 0, 0.25);
`;

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

export const MainDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 25px;
  margin-bottom: 44px;
`;

export const InputDiv = styled.div`
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
  color: rgba(251, 252, 252, 0.4);
`;

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
  margin-top: 15px;
  margin-right: 295px;
`;

export const StyledSelect = styled(Select)`
  .css-1u9des2-indicatorSeparator {
    background-color: transparent;
  }
`;
