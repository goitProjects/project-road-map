import { NavLink } from 'react-router-dom';
import Select from 'react-select';
import styled from 'styled-components';

export const BtnSection = styled.section`
  padding: 0 20px;
  margin-bottom: 10px;
`;

export const TableSection = styled.section`
  background: #fbfcfc;
  border-radius: 15px;
  padding: 28px 20px;

  @media print {
    visibility: visible;
    position: absolute;
    left: 0;
    top: 0;
    border-collapse: collapse;
    overflow-y: visible;
    height: auto;
  }
`;

/*  ========================= btn section ========================= */
export const SectionHead = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 36px;
`;

export const StyledTitle = styled.h1`
  font-size: 32px;
  line-height: 1;
`;

export const BtnBox = styled.div`
  display: flex;
  gap: 8px;
`;

export const InfoBtn = styled.button`
  font-weight: 600;
  line-height: 1.43;
  padding: 14px 28px;
  border-radius: 12px;
  border: 1px solid rgba(71, 82, 63, 0.2);
  transition: var(--fast);

  &:hover:not(:disabled) {
    cursor: pointer;
    color: var(--white);
    background: var(--btn-active);
  }
  &:disabled {
    cursor: not-allowed;
  }
`;

export const SaveBtn = styled(InfoBtn)`
  padding: 14px 22px;
  background: var(--white);
`;

export const StyledNav = styled.nav`
  display: flex;
  gap: 32px;
`;

export const StyledLink = styled(NavLink)`
  position: relative;
  color: var(--gray);
  text-decoration: none;

  &.active {
    color: var(--text-dark);
  }
  &.active:before {
    content: '';
    position: absolute;
    top: 35px;
    width: 100%;
    border-bottom: solid 2px var(--modal-btn-add);
  }
  &:hover:not(.active) {
    color: var(--text-dark);
  }
`;

export const Line = styled.hr`
  border: none;
  margin: 16px 0 20px;
  border-top: 1px solid #e2e2e2;
`;

export const StyledText = styled.p`
  color: var(--gray);
  font-size: 12px;
  font-weight: 600;
  line-height: 1.5;
`;

export const StyledSpan = styled.span`
  color: var(--text-dark);
`;

/*  ========================= table ========================= */

export const TableScroll = styled.div`
  position: relative;
  width: 1408px;
  height: 286px;

  z-index: 1;
  overflow-y: auto;
  &::-webkit-scrollbar-thumb {
    border-radius: 15px;
    background: #f0f0f0;
  }
  &::-webkit-scrollbar-track {
    box-shadow: black;
  }
  &::-webkit-scrollbar {
    width: 0.5em;
  }
  margin-bottom: 20px;
`;

export const StyledTable = styled.table`
  width: 1368px;
  display: block;
  border-collapse: separate;
  border-spacing: 0;

  td,
  th {
    text-align: center;
    border: 1px solid #e2e2e2;
  }
`;

export const StyledTHead = styled.thead`
  height: 120px;
  color: var(--gray);
  font-size: 12px;
  line-height: 1.3;

  th {
    font-weight: 500;
    padding: 14px 0;
    vertical-align: top;
  }
`;

export const StyledTBody = styled.tbody``;

export const StyledTFoot = styled.tfoot`
  background: #fbfcfc;
  z-index: 20;
  position: sticky;
  bottom: 0;

  th,
  td {
  }
`;

export const THeadRow = styled.tr`
  th {
  }
`;

export const SubRow = styled.tr`
  th {
    padding: 6px 10px;
  }
`;

export const SubSubRow = styled(SubRow)`
  font-size: 10px;
  line-height: 1.2;

  th {
    width: 48px;
    padding: 6px 4px;
  }
`;

export const TBodyRow = styled.tr`
  height: 60px;
  /* position: relative; */

  td:first-child {
    width: 260px;
    text-align: left;
    padding: 10px 24px;
  }
  td:last-child {
    width: 395px;
    padding: 10px 24px;
  }
  td:nth-child(2),
  td:nth-child(3) {
    width: 92px;
    padding: 10px 15px;
  }
  td:nth-child(2),
  td:nth-child(3) {
    width: 92px;
    padding: 10px 15px;
  }

  /* td:last-child::after {
    content: 'strelka';
    position: absolute;
    top: 0;
    left: 0;
  } */
`;

export const TFootRow = styled.tr`
  height: 40px;

  th {
    text-align: left;
    padding: 10px 24px;
  }
`;

/* ========================= Rest ========================= */

export const CalcDiv = styled.div`
  margin-left: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 35px;

  p {
    position: relative;
  }
  span {
    margin-left: 55px;
  }
  p:last-child > span {
    margin-left: 50px;
  }

  span:after {
    content: '';
    height: 1px;
    width: 120px;
    border-top: 1px solid #e2e2e2;
    position: absolute;
    bottom: 2px;
    left: 142px;
  }
  p:first-child:after {
    content: 'км';
    position: absolute;
    left: 265px;
  }
  p:last-child:after {
    content: 'л';
    position: absolute;
    left: 265px;
  }
`;

export const PersonnelDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;

  p {
    font-weight: 500;
    line-height: 1.29;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  gap: 8px;

  input {
    width: fit-content;
    text-overflow: ellipsis;
    font-weight: 500;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid var(--transparent-gray);
    cursor: not-allowed;
  }
  input:hover {
    border: 1px solid var(--dark);
  }
`;

export const StyledSelect = styled(Select)`
  width: 220px;

  .Select__control {
    font-weight: 500;
    line-height: 1.29;
    color: var(--text-dark);
    cursor: pointer;
    height: 42px;
    border-radius: 12px;
    border: 1px solid var(--transparent-gray);

    &:hover {
      border-color: var(--dark);
    }
  }

  .Select__value-container {
    padding: 12px 16px;
  }
  .css-t3ipsp-control {
    border: 1px solid var(--transparent-gray);
    box-shadow: none;
  }
  .Select__input-container {
    padding: 0;
    margin: 0;
  }

  .Select__placeholder {
    color: var(--gray);
    font-weight: 500;
    line-height: 1.29;
  }

  .Select__indicator {
    width: auto;
  }

  .Select__indicator-separator {
    display: none;
  }

  .Select__dropdown-indicator {
    color: black;
  }

  .Select__menu {
    padding: 12px 16px;
    border-radius: 12px;
  }
  .Select__menu-list {
    max-height: 102px;
    padding: 0;
    color: var(--text-dark);
    font-weight: 500;
    line-height: 1.29;

    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #f0f0f0;
      border-radius: 12px;
    }
  }

  .Select__option {
    padding: 0;
    margin-bottom: 10px;
    background-color: rgba(255, 255, 255, 0.1);
    cursor: pointer;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .Select__option--is-selected {
    text-decoration: underline;
    color: var(--text-dark);
  }
`;

export const AuxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
