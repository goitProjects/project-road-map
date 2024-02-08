import styled from 'styled-components';

export const StyledModalWindowWrapper = styled.div`
  width: 544px;
  height: 364px;
  position: relative;
  padding: 44px;
  display: flex;
  flex-direction: column;
  background: #202020;
  border-radius: 15px;
  box-shadow: 0px 4px 60px 0px rgba(0, 0, 0, 0.25);
`;

export const StyledModalInputWrapper = styled.div`
  display: flex;
  gap: 17px;
`;

export const StyledModalInput = styled.input`
  display: inline-flex;
  padding: 14px 16px 14px 16px;
  align-items: center;
  width: 220px;
  gap: 10px;

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  color: #fbfcfc;
  border: none;

  border-radius: 12px;
  background-color: #282828;
`;

export const StyledModalInputPosition = styled(StyledModalInput)`
  width: 100%;
`;

export const StyledErrorSpan = styled.span`
  color: red;
  position: absolute;
`;

export const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledInputWrapperPosition = styled(StyledInputWrapper)`
  margin-bottom: 44px;
`;

export const StyledErrorSpanRank = styled(StyledErrorSpan)`
  position: relative;
  font-size: 11px;
  min-height: 20px;
`;

export const StyledErrorSpanName = styled(StyledErrorSpan)`
  position: relative;
  font-size: 11px;
  min-height: 20px;
`;

export const StyledErrorSpanPosition = styled(StyledErrorSpan)`
  position: relative;
  font-size: 11px;
`;
