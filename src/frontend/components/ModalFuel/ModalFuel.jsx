import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';

import {
  ModalWindowStyle,
  OverlayStyle,
  ButtonCloseStyle,
  CancelBtnStyle,
  AddBtnStyle,
  BtnActive,
  ModalTitle,
  MainDiv,
  InputRowDiv,
  Label,
  MidInputStyle,
  Span,
  ShortInput,
  TitlePlusDiv,
  BtnPlus,
  Hr,
  DatePickerStyle,
  IconStyle,
  PickerContainer,
} from './ModalFuelStyle';

import { Icon } from '../Icon';
import { Icons } from '../Icons';

export default function Modal({
  showCloseIcon = true,
  onCloseFuel,
  onSubmitCallback,
  setDuplicated,
}) {
  const [duplicateInputs, setDuplicateInputs] = useState(1);

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    setDuplicated(duplicateInputs);
    onSubmitCallback(data); // Передача данных родительскому компоненту
    onCloseFuel(); // Закрытие модального окна
  };

  const handleBtnPlusClick = () => {
    setDuplicateInputs(prevCount => prevCount + 1);
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onCloseFuel();
    }
  };

  const closeClick = e => {
    if (e.target.name === 'cancel' || e.currentTarget.name === 'closeSvg') {
      onCloseFuel();
    }
  };
  const handleReset = () => {
    reset();
    setDuplicateInputs(1);
    for (let i = 0; i < duplicateInputs; i++) {
      setValue(`itemName_${i}`, '');
      setValue(`itemCode_${i}`, '');
      setValue(`availabilityBeforeDeparture_${i}`, '');
      setValue(`received_${i}`, '');
      setValue(`receivedDate_${i}`, null);
      setValue(`availability_${i}`, '');
      setValue(`spent_${i}`, '');
      setValue(`norm_${i}`, '');
      setValue(`saving_${i}`, '');
      setValue(`overuse_${i}`, '');
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      onCloseFuel();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        onCloseFuel();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloseFuel]);

  return (
    <OverlayStyle
      onClick={e => handleBackdropClick(e)}
      onKeyDown={handleKeyDown}
      tabIndex="0"
    >
      <Icons />
      <ModalWindowStyle>
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
          <TitlePlusDiv>
            <ModalTitle>
              Витрата пально-мастильних
              <br /> матеріалів (у літрах)
            </ModalTitle>
            <BtnPlus onClick={handleBtnPlusClick}>
              <Icon size={28} name="plus" />
            </BtnPlus>
          </TitlePlusDiv>

          <MainDiv>
            {[...Array(duplicateInputs)].map((_, index) => (
              <React.Fragment key={index}>
                <InputRowDiv>
                  <Label>
                    <Span>Найменування ПММ</Span>
                    <Controller
                      name={`itemName_${index}`}
                      control={control}
                      rules={{ required: "Обов'язкове поле" }}
                      render={({ field }) => (
                        <>
                          <MidInputStyle
                            type="text"
                            placeholder="Введіть текст"
                            {...field}
                            onChange={e =>
                              setValue(`itemName_${index}`, e.target.value)
                            }
                          />
                          {errors[`itemName_${index}`] && (
                            <span style={{ color: 'red' }}>
                              {errors[`itemName_${index}`].message}
                            </span>
                          )}
                        </>
                      )}
                    />
                  </Label>

                  <Label>
                    <Span>Код номенклатури</Span>
                    <Controller
                      name={`itemCode_${index}`}
                      control={control}
                      rules={{ required: "Обов'язкове поле" }}
                      render={({ field }) => (
                        <>
                          <MidInputStyle
                            type="text"
                            placeholder="Введіть текст"
                            {...field}
                            onChange={e =>
                              setValue(`itemCode_${index}`, e.target.value)
                            }
                          />
                          {errors[`itemCode_${index}`] && (
                            <span style={{ color: 'red' }}>
                              {errors[`itemCode_${index}`].message}
                            </span>
                          )}
                        </>
                      )}
                    />
                  </Label>

                  <Label>
                    <Span>Наявність перед виїздом</Span>
                    <Controller
                      name={`availabilityBeforeDeparture_${index}`}
                      control={control}
                      rules={{ required: "Обов'язкове поле" }}
                      render={({ field }) => (
                        <>
                          <MidInputStyle
                            type="text"
                            placeholder="Введіть текст"
                            {...field}
                            onChange={e =>
                              setValue(
                                `availabilityBeforeDeparture_${index}`,
                                e.target.value
                              )
                            }
                          />
                          {errors[`availabilityBeforeDeparture_${index}`] && (
                            <span style={{ color: 'red' }}>
                              {
                                errors[`availabilityBeforeDeparture_${index}`]
                                  .message
                              }
                            </span>
                          )}
                        </>
                      )}
                    />
                  </Label>
                </InputRowDiv>

                <InputRowDiv>
                  <Label>
                    <Span>Отримано</Span>
                    <Controller
                      name={`received_${index}`}
                      control={control}
                      rules={{ required: "Обов'язкове поле" }}
                      render={({ field }) => (
                        <>
                          <MidInputStyle
                            type="text"
                            placeholder="Кількість"
                            {...field}
                            onChange={e =>
                              setValue(`received_${index}`, e.target.value)
                            }
                          />
                          {errors[`received_${index}`] && (
                            <span style={{ color: 'red' }}>
                              {errors[`received_${index}`].message}
                            </span>
                          )}
                        </>
                      )}
                    />
                  </Label>

                  <Label>
                    <Span>Дата отримання</Span>

                    <Controller
                      name={`receivedDate_${index}`}
                      control={control}
                      rules={{
                        required: "Обов'язкове поле",
                      }}
                      render={({ field }) => (
                        <>
                          <PickerContainer>
                            <DatePickerStyle
                              selected={field.value}
                              onChange={date =>
                                setValue(`receivedDate_${index}`, date)
                              }
                              dateFormat="dd.MM.yyyy"
                              placeholderText="00.00.0000"
                              showIcon
                              icon={
                                <IconStyle
                                  size={16}
                                  height={18}
                                  name="calendar"
                                />
                              }
                              locale="uk"
                            />

                            {errors[`receivedDate_${index}`] && (
                              <span style={{ color: 'red' }}>
                                {errors[`receivedDate_${index}`].message}
                              </span>
                            )}
                          </PickerContainer>
                        </>
                      )}
                    />
                  </Label>

                  <Label>
                    <Span>Наявність при постановці </Span>
                    <Controller
                      name={`availability_${index}`}
                      control={control}
                      rules={{ required: "Обов'язкове поле" }}
                      render={({ field }) => (
                        <>
                          <MidInputStyle
                            type="text"
                            placeholder="Введіть текст"
                            {...field}
                            onChange={e =>
                              setValue(`availability_${index}`, e.target.value)
                            }
                          />
                          {errors[`availability_${index}`] && (
                            <span style={{ color: 'red' }}>
                              {errors[`availability_${index}`].message}
                            </span>
                          )}
                        </>
                      )}
                    />
                  </Label>
                </InputRowDiv>

                <InputRowDiv>
                  <Label>
                    <Span>Витрачено</Span>
                    <Controller
                      name={`spent_${index}`}
                      control={control}
                      rules={{
                        required: "Обов'язкове поле",
                      }}
                      render={({ field }) => (
                        <>
                          <ShortInput
                            type="text"
                            placeholder="0"
                            {...field}
                            onChange={e => {
                              const onlyDigits = e.target.value.replace(
                                /[^0-9]/g,
                                ''
                              );
                              setValue(`spent_${index}`, onlyDigits);
                            }}
                            inputMode="numeric"
                          />
                          {errors[`spent_${index}`] && (
                            <span style={{ color: 'red' }}>
                              {errors[`spent_${index}`].message}
                            </span>
                          )}
                        </>
                      )}
                    />
                  </Label>

                  <Label>
                    <Span>Належить за нормою</Span>
                    <Controller
                      name={`norm_${index}`}
                      control={control}
                      rules={{
                        required: "Обов'язкове поле",
                      }}
                      render={({ field }) => (
                        <>
                          <ShortInput
                            type="text"
                            placeholder="0"
                            {...field}
                            onChange={e => {
                              const onlyDigits = e.target.value.replace(
                                /[^0-9]/g,
                                ''
                              );
                              setValue(`norm_${index}`, onlyDigits);
                            }}
                            inputMode="numeric"
                          />
                          {errors[`norm_${index}`] && (
                            <span style={{ color: 'red' }}>
                              {errors[`norm_${index}`].message}
                            </span>
                          )}
                        </>
                      )}
                    />
                  </Label>

                  <Label>
                    <Span>Економія</Span>
                    <Controller
                      name={`saving_${index}`}
                      control={control}
                      rules={{
                        required: "Обов'язкове поле",
                      }}
                      render={({ field }) => (
                        <>
                          <ShortInput
                            type="text"
                            placeholder="0"
                            {...field}
                            onChange={e => {
                              const onlyDigits = e.target.value.replace(
                                /[^0-9]/g,
                                ''
                              );
                              setValue(`saving_${index}`, onlyDigits);
                            }}
                            inputMode="numeric"
                          />
                          {errors[`saving_${index}`] && (
                            <span style={{ color: 'red' }}>
                              {errors[`saving_${index}`].message}
                            </span>
                          )}
                        </>
                      )}
                    />
                  </Label>

                  <Label>
                    <Span>Перевитрата</Span>
                    <Controller
                      name={`overuse_${index}`}
                      control={control}
                      rules={{
                        required: "Обов'язкове поле",
                      }}
                      render={({ field }) => (
                        <>
                          <ShortInput
                            type="text"
                            placeholder="0"
                            {...field}
                            onChange={e => {
                              const onlyDigits = e.target.value.replace(
                                /[^0-9]/g,
                                ''
                              );
                              setValue(`overuse_${index}`, onlyDigits);
                            }}
                            inputMode="numeric"
                          />
                          {errors[`overuse_${index}`] && (
                            <span style={{ color: 'red' }}>
                              {errors[`overuse_${index}`].message}
                            </span>
                          )}
                        </>
                      )}
                    />
                  </Label>
                </InputRowDiv>
                <Hr />
              </React.Fragment>
            ))}
          </MainDiv>

          <BtnActive>
            <AddBtnStyle type="submit" name="add">
              Додати
            </AddBtnStyle>
            <CancelBtnStyle type="button" name="cancel" onClick={handleReset}>
              Видалити
            </CancelBtnStyle>
          </BtnActive>
        </form>
      </ModalWindowStyle>
    </OverlayStyle>
  );
}
