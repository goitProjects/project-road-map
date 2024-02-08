import styled from 'styled-components';
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

export const RouteList = styled.ul`
  min-width: 500px;
  max-height: 500px;
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  li {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

export const EditButton = styled.button`
  color: var(--white);
  background: #282828;
  text-align: start;
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export const StyledDeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  padding: 12px;
  border: none;
  border-radius: 50%;
  background-color: #191413;
  cursor: pointer;
  &:hover {
    background-color: darkred;
  }
`;

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

export const IconStyleCalendar = styled(Icon)`
  cursor: pointer;
  bottom: 15%;
  right: 5%;
  z-index: 1;
`;
