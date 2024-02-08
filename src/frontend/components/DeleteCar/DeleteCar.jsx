import React from 'react';
import {
  BtnBox,
  CancelBtnStyle,
  ConfirmBtnStyle,
  RequestDel,
} from '../ModalDelete/ModalDeleteStyle';

export const DeleteCar = ({ deleteCar, carSign, close }) => {
  const handleConfirmClick = () => {
    deleteCar(carSign);
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
