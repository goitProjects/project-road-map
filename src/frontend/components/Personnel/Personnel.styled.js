import styled from 'styled-components';
import {
  StyledTableHead,
  StyledTableHeaderTh,
} from '../Directory/Directory.styled';

export const StyledEmptyTableTh = styled.th`
  background-color: #f0f0f0;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  width: 300px;
`;

export const StyledPersonnelTableButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: end;
`;

export const StyledTableHeadPersonnel = styled(StyledTableHead)`
  height: 40px;
`;

export const StyledTableHeaderShortTh = styled(StyledTableHeaderTh)`
  width: 300px;
`;
