import { Icon } from '../Icon';
import React, { useEffect, useState } from 'react';
import {
  StyledTableBody,
  StyledTableBodyTd,
  StyledTableBodyTr,
  StyledTableDeleteButton,
  StyledTableEditButton,
  StyledTableHeaderTh,
  StyledTableHeaderTr,
  StyledTableScrollWrapper,
  StyledTableShortTd,
  StyledTableWrapper,
  StyledWhiteWrapper,
} from '../Directory/Directory.styled';
import { selectIsLoading, selectPersonnel } from 'redux/infos/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { deletePersonnelThunk, fetchInfosThunk } from 'redux/infos/operations';
import EditPersonnelForm from '../EditPersonnelForm/EditPersonnelForm';
import DeletePersonnelForm from '../DeletePersonnelForm/DeletePersonnelForm';
import ModalDelete from '../ModalDelete/ModalDelete';
import {
  StyledEmptyTableTh,
  StyledPersonnelTableButtonWrapper,
  StyledTableHeadPersonnel,
  StyledTableHeaderShortTh,
} from './Personnel.styled';
import { Loader } from '../Loader/Loader';

const Personnel = () => {
  const personnel = useSelector(selectPersonnel);
  const loading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const [selectedDriverId, setSelectedDriverId] = useState(null);
  const [isDeleteDriverModalVisible, setDeleteDriverModalVisible] =
    useState(false);
  const [isEditDriverModalVisible, setEditDriverModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchInfosThunk());
  }, [dispatch]);

  const openDeleteDriverModal = idx => {
    setSelectedDriverId(idx);
    setDeleteDriverModalVisible(true);
  };

  const closeDeleteDriverModal = () => {
    setDeleteDriverModalVisible(false);
  };

  const openEditDriverModal = name => {
    setSelectedDriverId(name);
    setEditDriverModalVisible(true);
  };

  const closeEditDriverModal = () => {
    setEditDriverModalVisible(false);
  };

  const handleDeleteDriver = idx => {
    dispatch(deletePersonnelThunk(idx));
  };

  return (
    <>
      {loading && <Loader />}
      <StyledWhiteWrapper>
        <StyledTableScrollWrapper>
          <StyledTableWrapper>
            <StyledTableHeadPersonnel>
              <StyledTableHeaderTr>
                <StyledTableHeaderTh>Посада</StyledTableHeaderTh>
                <StyledTableHeaderTh>Звання</StyledTableHeaderTh>
                <StyledTableHeaderShortTh>
                  Звання скорочено
                </StyledTableHeaderShortTh>
                <StyledTableHeaderTh>ПІБ</StyledTableHeaderTh>
                <StyledEmptyTableTh></StyledEmptyTableTh>
              </StyledTableHeaderTr>
            </StyledTableHeadPersonnel>
            <StyledTableBody>
              {personnel?.map((person, idx) => (
                <StyledTableBodyTr key={person.name}>
                  <StyledTableBodyTd
                    $wordWrap={person.position.length > 20 && 'break-word'}
                  >
                    {person.position}
                  </StyledTableBodyTd>
                  <StyledTableBodyTd>{person.rank}</StyledTableBodyTd>
                  <StyledTableShortTd>{person.rankShort}</StyledTableShortTd>
                  <StyledTableBodyTd>{person.name}</StyledTableBodyTd>
                  <StyledTableBodyTd>
                    <StyledPersonnelTableButtonWrapper>
                      <StyledTableEditButton
                        onClick={() => openEditDriverModal(person.name)}
                      >
                        <Icon name="edit" size={16} />
                      </StyledTableEditButton>
                      <StyledTableDeleteButton
                        onClick={() => openDeleteDriverModal(person.name)}
                      >
                        <Icon name="trash" size={16} />
                      </StyledTableDeleteButton>
                    </StyledPersonnelTableButtonWrapper>
                  </StyledTableBodyTd>
                </StyledTableBodyTr>
              ))}
            </StyledTableBody>
          </StyledTableWrapper>
        </StyledTableScrollWrapper>
      </StyledWhiteWrapper>
      {isEditDriverModalVisible && (
        <EditPersonnelForm
          close={closeEditDriverModal}
          showCloseIcon={true}
          id={selectedDriverId}
        />
      )}
      {isDeleteDriverModalVisible && (
        <ModalDelete showCloseIcon={true} close={closeDeleteDriverModal}>
          <DeletePersonnelForm
            deletePersonnel={() => handleDeleteDriver(selectedDriverId)}
            id={selectedDriverId}
            close={closeDeleteDriverModal}
          />
        </ModalDelete>
      )}
    </>
  );
};

export default Personnel;
