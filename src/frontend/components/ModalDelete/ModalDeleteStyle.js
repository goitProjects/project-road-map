import styled from 'styled-components';

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
  width: 450px;
  height: 338px;
  padding: 41px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #202020;

  position: relative;
  box-shadow: 0px 4px 60px 0px rgba(0, 0, 0, 0.25);

  @media screen and (min-width: 768px) {
    width: 100%;
    height: 100%;

    padding: calc(20 * (100vw / 480));
    min-width: 300px;
  }

  @media screen and (min-width: 768px) {
    width: 450px;
    height: 338px;
  }

  @media screen and (min-width: 1280px) {
    border-radius: 15px;
    padding: calc(20 * (100vw / 480));
    width: 420px;
    height: 318px;
  }
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
// ---------------------------

export const RequestDel = styled.h3`
  top: 70px;
  position: absolute;
  color: #fbfcfc;
  text-align: center;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 28.5px;
`;

export const BtnBox = styled.div`
  display: flex;
  gap: 8px;
  position: absolute;
  text-align: center;
  justify-content: center;
  bottom: 80px;
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
  position: relative;
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
