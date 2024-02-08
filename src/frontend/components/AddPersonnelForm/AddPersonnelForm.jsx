import React, { useEffect } from 'react';
import {
  AddBtnStyle,
  BtnActive,
  ButtonCloseStyle,
  CancelBtnStyle,
  ModalTitle,
  OverlayStyle,
} from '../modal/Modal.styled';
import { useDispatch } from 'react-redux';
import { addPersonnelThunk } from 'redux/infos/operations';
import { Controller, useForm } from 'react-hook-form';
import {
  StyledErrorSpanName,
  StyledErrorSpanPosition,
  StyledErrorSpanRank,
  StyledInputWrapper,
  StyledInputWrapperPosition,
  StyledModalInput,
  StyledModalInputPosition,
  StyledModalInputWrapper,
  StyledModalWindowWrapper,
} from './AddPersonnelForm.styled';
import { toast } from 'react-toastify';

const AddPersonnelForm = ({ showCloseIcon = true, close }) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    trigger,
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = data => {
    dispatch(addPersonnelThunk(data))
      .unwrap()
      .then(() => {
        toast.success('Службовець успішно додано');
        close();
      })
      .catch(err => {
        toast.error(
          err.includes('409')
            ? 'Такий службовець вже існує'
            : 'Помилка валідації'
        );
      });
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        close();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [close]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      close();
    }
  };

  const closeClick = e => {
    if (e.currentTarget.name === 'closeSvg') {
      close();
    }
  };

  const handleReset = () => {
    setValue('rank', '');
    setValue('name', '');
    setValue('position', '');
  };
  return (
    <OverlayStyle onClick={e => handleBackdropClick(e)}>
      <StyledModalWindowWrapper>
        {showCloseIcon && (
          <ButtonCloseStyle type="button" name="closeSvg" onClick={closeClick}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1L17 17" stroke="#FBFBFB" />
              <path d="M1 17L17 0.999999" stroke="#FBFBFB" />
            </svg>
          </ButtonCloseStyle>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalTitle>Додати людину</ModalTitle>
          <StyledModalInputWrapper>
            <Controller
              name="rank"
              control={control}
              rules={{
                required: "Обов'язкове поле",
                pattern: {
                  value: /^[a-zA-Zа-яА-ЯіІїЇєЄ0-9 -]*$/,
                  message: 'Може містити літери та цифри',
                },
              }}
              render={({ field }) => (
                <StyledInputWrapper>
                  <StyledModalInput
                    type="text"
                    placeholder="Військове звання"
                    {...field}
                    onChange={e => {
                      setValue('rank', e.target.value);
                      trigger('rank');
                    }}
                  />
                  {errors.rank && (
                    <StyledErrorSpanRank>
                      {errors.rank.message}
                    </StyledErrorSpanRank>
                  )}
                </StyledInputWrapper>
              )}
            />
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Обов'язкове поле",
                pattern: {
                  value:
                    /^[А-ЩЬЮЯЄІЇа-щьюяєії]+\s([А-ЩЬЮЯЄІЇа-щьюяєії]\.[А-ЩЬЮЯЄІЇа-щьюяєії]\.|[А-ЩЬЮЯЄІЇа-щьюяєії]+\s[А-ЩЬЮЯЄІЇа-щьюяєії]+)$/,
                  message:
                    'Невірний формат (приклад: Бандера С.А. або Бандера Степан Андрійович). Може містити лише один пробіл між словами.',
                },
              }}
              render={({ field }) => (
                <StyledInputWrapper>
                  <StyledModalInput
                    type="text"
                    placeholder="Прізвище, ініціали"
                    {...field}
                    onChange={e => {
                      setValue('name', e.target.value);
                      trigger('name');
                    }}
                  />
                  <StyledErrorSpanName>
                    {errors.name ? errors.name.message : ''}
                  </StyledErrorSpanName>
                </StyledInputWrapper>
              )}
            />
          </StyledModalInputWrapper>
          <Controller
            name="position"
            control={control}
            rules={{
              required: "Обов'язкове поле",
              pattern: {
                value:
                  /^Старший \(технік\) підрозділу$|^[a-zA-Zа-яА-ЯіІїЇєЄ0-9 -]*$/,
                message: 'Може містити літери та цифри',
              },
            }}
            render={({ field }) => (
              <StyledInputWrapperPosition
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <StyledModalInputPosition
                  type="text"
                  placeholder="Посада"
                  {...field}
                  onChange={e => {
                    setValue('position', e.target.value);
                    trigger('position');
                  }}
                />
                {errors.position && (
                  <StyledErrorSpanPosition>
                    {errors.position.message}
                  </StyledErrorSpanPosition>
                )}
              </StyledInputWrapperPosition>
            )}
          />
          <BtnActive>
            <AddBtnStyle type="submit" name="add">
              Додати
            </AddBtnStyle>
            <CancelBtnStyle type="button" onClick={handleReset}>
              Очистити
            </CancelBtnStyle>
          </BtnActive>
        </form>
      </StyledModalWindowWrapper>
    </OverlayStyle>
  );
};

export default AddPersonnelForm;
