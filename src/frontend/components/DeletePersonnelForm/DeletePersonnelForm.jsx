import React from 'react';
import {
  BtnBox,
  ConfirmBtnStyle,
  RequestDel,
} from '../ModalDelete/ModalDeleteStyle';
import { CancelBtnStyle } from '../modal/Modal.styled';

const DeletePersonnelForm = ({ deletePersonnel, id, close }) => {
  const handleConfirmClick = () => {
    deletePersonnel(id);
    close();
  };

  const closeClick = e => {
    if (e.target.name === 'cancel' || e.currentTarget.name === 'closeSvg') {
      close();
    }
  };

  return (
    <>
      <RequestDel>
        Впевнені, що <br /> бажаєте видалити <br />
        цю стрічку ?
      </RequestDel>
      <BtnBox>
        <ConfirmBtnStyle
          type="button"
          name="confirm"
          onClick={handleConfirmClick}
        >
          Так, видалити
        </ConfirmBtnStyle>
        <CancelBtnStyle type="button" name="cancel" onClick={closeClick}>
          Відмінити
        </CancelBtnStyle>
      </BtnBox>
    </>
  );
};

export default DeletePersonnelForm;
