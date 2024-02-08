import styled from 'styled-components';

export const StyledHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 32px;
  margin-bottom: 32px;
`;

export const StyledTitleDirectory = styled.h2`
  font-size: 32px;
  font-weight: 600;
  line-height: 32px;
`;

export const StyledAddButton = styled.button`
  padding: 14px 28px;

  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  border-radius: 12px;
  border: 1px solid rgba(71, 82, 63, 0.2);
  cursor: pointer;

  &:hover {
    background-color: #47523f;
    color: #fff;
  }
`;

export const StyledWhiteWrapper = styled.div`
  background-color: #fbfcfc;
  padding-top: 28px;
  padding-bottom: 28px;
  border-radius: 15px;
`;

export const StyledTableScrollWrapper = styled.div`
  max-height: 55vh;
  overflow-y: scroll;
  margin-right: 6px;
  margin-left: 12px;
  &::-webkit-scrollbar-thumb {
    border-radius: 15px;
    background: #f0f0f0;
  }
  &::-webkit-scrollbar-track {
    box-shadow: black;
  }
  &::-webkit-scrollbar {
    width: 0.6em;
  }
`;

export const StyledTableWrapper = styled.table`
  width: 100%;
  padding: 0px 20px 0px 20px;
  border-radius: 15px;
  background-color: #fbfcfc;
  border-spacing: 0;
  position: relative;
`;

//  -----------------  THEAD  -----------------  //
export const StyledTableHead = styled.thead`
  height: 100px;

  text-align: left;

  position: sticky;
  z-index: 1;
  top: 0;
`;

export const StyledTableHeaderTr = styled.tr`
  padding: 14px 158px 14px 20px;
`;

export const StyledTableHeaderTh = styled.th`
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: #8a8a89;
  background-color: #f0f0f0;

  padding-left: 19px;
  padding-right: 19px;
  padding-top: 14px;
  padding-bottom: 14px;

  vertical-align: top;

  &:nth-child(1) {
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    padding-left: 20px;
  }
  &:nth-child(4) {
    width: 70px;
  }
  &:nth-child(8) {
    width: 100px;
  }
  &:nth-child(9) {
    width: 85px;
  }
  &:last-child {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    width: 120px;
  }
`;

//  -----------------  TBODY  -----------------  //
export const StyledTableBody = styled.tbody``;

export const StyledTableBodyTr = styled.tr`
  position: relative;

  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  padding: 28px 20px;
  height: 90px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #e2e2e2;
    height: 1px;
    width: 100%;
  }
`;

export const StyledTableBodyTd = styled.td`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: #191413;
  max-width: 50px;
  word-wrap: ${({ $wordWrap }) => $wordWrap || 'normal'};

  padding-left: 19px;
  padding-right: 19px;
`;

export const StyledTableShortTd = styled(StyledTableBodyTd)`
  max-width: 49px;
`;

export const StyledButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

export const StyledTableEditButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;
  padding: 12px;
  border: none;
  border-radius: 50%;
  background-color: #47523f;
  cursor: pointer;
  &:hover {
    background-color: rgba(40, 90, 70, 1);
  }
`;

export const StyledTableDeleteButton = styled.button`
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

// Table swithing

export const StyledActiveButton = styled.button`
  position: relative;

  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 1.43;
  cursor: pointer;

  color: var(--black);
  border: none;

  &::after {
    content: '';
    position: absolute;
    top: 37px;
    left: 0;
    width: 100%;
    border-bottom: solid 2px var(--modal-btn-add);
  }
`;

export const InnactiveButton = styled.button`
  font-size: 14.039px;
  font-style: normal;
  font-weight: 600;
  line-height: 20.056px;

  cursor: pointer;

  border: none;
  color: var(--gray);
`;
