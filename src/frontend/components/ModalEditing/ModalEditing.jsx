import { useForm, Controller } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';
import { updateCarsThunk } from 'redux/infos/operations';
import {
  AddBtnStyle,
  BtnActive,
  ButtonCloseStyle,
  InputDiv,
  Label,
  LongInput,
  MainDiv,
  ModalTitle,
  ModalWindowStyle,
  OverlayStyle,
  ShortInput,
  Span,
  StyledSelect,
} from './ModalEditingStyle';
import { useEffect } from 'react';
import { selectCars, selectPersonnel } from 'redux/infos/selectors';
import { toast } from 'react-toastify';

export default function Modal({ showCloseIcon = true, close, id }) {
  const personnel = useSelector(selectPersonnel);
  const car = useSelector(selectCars).find(car => car.sign === id);

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      carName: car?.carName,
      sign: car?.sign,
      fuelType: car?.fuelType,
      fuelConsumption: car?.fuelConsumption,
      oilType: car?.oilType,
      oilConsumption: car?.oilConsumption,
      exploitationGroup: car?.exploitationGroup,
      exploitationGroupShort: car?.exploitationGroupShort,
      driver: { value: car?.driver, label: car?.driver },
      driverRank: car?.driverRank,
      unit: car?.unit,
      senior: { value: car?.senior, label: car?.senior },
      seniorRank: car?.seniorRank,
    },
  });

  const watchDriver = watch('driver');
  const watchSenior = watch('senior');

  const dispatch = useDispatch();

  const onSubmit = data => {
    const newData = {
      ...data,
      driver: data.driver.value.name,
      senior: data.senior.value.name,
      oldSign: car.sign,
    };
    dispatch(updateCarsThunk(newData))
      .unwrap()
      .then(() => {
        toast.success('Зміни збережено');
        close();
      })
      .catch(() => toast.error('Такий автомобіль вже існує'));
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

  const customStyles = {
    control: provided => ({
      ...provided,
      width: '315px',
      height: '46px',
      borderRadius: '12px',
      background: '#282828',
      border: 'none',
      color: '#fbfcfc',
      textIndent: '10px',
      cursor: 'pointer',
    }),
    singleValue: provided => ({
      ...provided,
      color: '#fbfcfc',
    }),
    dropdownIndicator: provided => ({
      ...provided,
      color: '#fbfcfc',
    }),
    menu: provided => ({
      ...provided,
      background: '#282828',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#505050' : '#282828',
      color: '#fbfcfc',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: '#505050',
      },
    }),
  };

  const driverArr = personnel.filter(el =>
    el.position.toLowerCase().includes('водій')
  );
  const driverOptions = driverArr.map(({ name, rank }) => ({
    value: { name, rank },
    label: name,
  }));

  const seniorArr = personnel.filter(el =>
    el.position.toLowerCase().includes('старший')
  );
  const seniorOptions = seniorArr.map(({ name, rank }) => ({
    value: { name, rank },
    label: name,
  }));

  return (
    <OverlayStyle onClick={e => handleBackdropClick(e)}>
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
          <ModalTitle>Редагування даних</ModalTitle>

          <MainDiv>
            <InputDiv>
              <Label>
                <Span>Назва автомобіля</Span>
                <Controller
                  name="carName"
                  control={control}
                  rules={{
                    required: "Обов'язкове поле",
                    pattern: {
                      value: /^[a-zA-Zа-яА-ЯіІїЇєЄ0-9 -]*$/,
                      message: 'Може містити літери та цифри',
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <LongInput
                        type="text"
                        placeholder="Введіть текст"
                        {...field}
                        onChange={e => setValue('carName', e.target.value)}
                      />
                      {errors.carName && (
                        <span style={{ color: 'red' }}>
                          {errors.carName.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </Label>
              <Label>
                <Span>Номерний знак</Span>
                <Controller
                  name="sign"
                  control={control}
                  rules={{
                    required: "Обов'язкове поле",
                    pattern: {
                      value: /^[a-zA-Zа-яА-Я0-9]{2}\d{4}[a-zA-Zа-яА-Я0-9]{2}$/,
                      message:
                        'Невірний формат (приклад правильного формату: АА1234ББ)',
                    },
                    validate: value => {
                      const forbiddenLetters = ['І', 'О', 'Є', 'Ї', 'Й'];
                      const forbiddenLetterFound = forbiddenLetters.some(
                        letter => value.includes(letter)
                      );
                      return (
                        !forbiddenLetterFound ||
                        'Заборонені літери: І, О, Є, Ї, Й'
                      );
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <LongInput
                        type="text"
                        placeholder="Введіть текст"
                        {...field}
                        onChange={e => setValue('sign', e.target.value)}
                      />
                      {errors.sign && (
                        <span style={{ color: 'red' }}>
                          {errors.sign.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </Label>
            </InputDiv>

            <InputDiv>
              <Label>
                <Span>Тип палива</Span>
                <Controller
                  name="fuelType"
                  control={control}
                  rules={{ required: "Обов'язкове поле" }}
                  render={({ field }) => (
                    <ShortInput
                      type="text"
                      placeholder="Введіть текст"
                      {...field}
                      onChange={e => setValue('fuelType', e.target.value)}
                    />
                  )}
                />
                {errors.fuelType && (
                  <span style={{ color: 'red' }}>
                    {errors.fuelType.message}
                  </span>
                )}
              </Label>
              <Label>
                <Span>Розхід палива на...</Span>
                <Controller
                  name="fuelConsumption"
                  control={control}
                  rules={{ required: "Обов'язкове поле" }}
                  render={({ field }) => (
                    <ShortInput
                      type="text"
                      placeholder="0"
                      {...field}
                      onChange={e =>
                        setValue('fuelConsumption', e.target.value)
                      }
                    />
                  )}
                />
                {errors.fuelConsumption && (
                  <span style={{ color: 'red' }}>
                    {errors.fuelConsumption.message}
                  </span>
                )}
              </Label>
              <Label>
                <Span>Тип мастила</Span>
                <Controller
                  name="oilType"
                  control={control}
                  rules={{ required: "Обов'язкове поле" }}
                  render={({ field }) => (
                    <ShortInput
                      type="text"
                      placeholder="Введіть текст"
                      {...field}
                      onChange={e => setValue('oilType', e.target.value)}
                    />
                  )}
                />
                {errors.oilType && (
                  <span style={{ color: 'red' }}>{errors.oilType.message}</span>
                )}
              </Label>
              <Label>
                <Span>Розхід оливи</Span>
                <Controller
                  name="oilConsumption"
                  control={control}
                  rules={{ required: "Обов'язкове поле" }}
                  render={({ field }) => (
                    <ShortInput
                      type="text"
                      placeholder="0"
                      {...field}
                      onChange={e => setValue('oilConsumption', e.target.value)}
                    />
                  )}
                />
                {errors.oilConsumption && (
                  <span style={{ color: 'red' }}>
                    {errors.oilConsumption.message}
                  </span>
                )}
              </Label>
            </InputDiv>

            <InputDiv>
              <Label>
                <Span>Група експлуатації</Span>
                <Controller
                  name="exploitationGroup"
                  control={control}
                  rules={{ required: "Обов'язкове поле" }}
                  render={({ field }) => (
                    <ShortInput
                      type="text"
                      placeholder="Введіть текст"
                      {...field}
                      onChange={e =>
                        setValue('exploitationGroup', e.target.value)
                      }
                    />
                  )}
                />
                {errors.exploitationGroup && (
                  <span style={{ color: 'red' }}>
                    {errors.exploitationGroup.message}
                  </span>
                )}
              </Label>
              <Label>
                <Span>Група експл. 2</Span>
                <Controller
                  name="exploitationGroupShort"
                  control={control}
                  rules={{ required: "Обов'язкове поле" }}
                  render={({ field }) => (
                    <ShortInput
                      type="text"
                      placeholder="Введіть текст"
                      {...field}
                      onChange={e =>
                        setValue('exploitationGroupShort', e.target.value)
                      }
                    />
                  )}
                />
                {errors.exploitationGroupShort && (
                  <span style={{ color: 'red' }}>
                    {errors.exploitationGroupShort.message}
                  </span>
                )}
              </Label>
              <Label>
                <Span>Водій</Span>
                <Controller
                  name="driver"
                  control={control}
                  rules={{
                    required: "Обов'язкове поле",
                    pattern: {
                      value:
                        /^[А-ЯІ][а-яі]+\s[А-ЯІ]\.[А-ЯІ]\.$|^[А-ЯІ][а-яі]+\s[А-ЯІ][а-яі]+\s[А-ЯІ][а-яі]+$/,
                      message:
                        'Невірний формат (приклад: Бандера С.А. або Бандера Степан Андрійович)',
                    },
                  }}
                  render={({ field }) => (
                    <StyledSelect
                      {...field}
                      options={driverOptions}
                      onChange={selectedOption => {
                        setValue('driver', selectedOption);
                        setValue('driverRank', selectedOption.value.rank);
                      }}
                      value={watchDriver}
                      placeholder="Виберіть водія"
                      styles={customStyles}
                      isSearchable={false}
                    />
                  )}
                />
                {errors.driver && (
                  <span style={{ color: 'red' }}>{errors.driver.message}</span>
                )}
              </Label>
            </InputDiv>

            <InputDiv>
              <Label>
                <Span>Звання водія</Span>
                <Controller
                  name="driverRank"
                  control={control}
                  rules={{ required: "Обов'язкове поле" }}
                  render={({ field }) => (
                    <LongInput
                      type="text"
                      placeholder="Введіть текст"
                      {...field}
                      onChange={e => setValue('driverRank', e.target.value)}
                    />
                  )}
                />
                {errors.driverRank && (
                  <span style={{ color: 'red' }}>
                    {errors.driverRank.message}
                  </span>
                )}
              </Label>
              <Label>
                <Span>Підрозділ</Span>
                <Controller
                  name="unit"
                  control={control}
                  rules={{ required: "Обов'язкове поле" }}
                  render={({ field }) => (
                    <LongInput
                      type="text"
                      placeholder="Введіть текст"
                      {...field}
                      onChange={e => setValue('unit', e.target.value)}
                    />
                  )}
                />
                {errors.unit && (
                  <span style={{ color: 'red' }}>{errors.unit.message}</span>
                )}
              </Label>
            </InputDiv>

            <InputDiv>
              <Label>
                <Span>Старший</Span>
                <Controller
                  name="senior"
                  control={control}
                  rules={{
                    required: "Обов'язкове поле",
                    pattern: {
                      value:
                        /^[А-ЯІ][а-яі]+\s[А-ЯІ]\.[А-ЯІ]\.$|^[А-ЯІ][а-яі]+\s[А-ЯІ][а-яі]+\s[А-ЯІ][а-яі]+$/,
                      message:
                        'Невірний формат (приклад: Бандера С.А. або Бандера Степан Андрійович)',
                    },
                  }}
                  render={({ field }) => (
                    <StyledSelect
                      {...field}
                      options={seniorOptions}
                      onChange={selectedOption => {
                        setValue('senior', selectedOption);
                        // setSelectedSeniorRank(selectedOption);
                        setValue('seniorRank', selectedOption.value.rank);
                      }}
                      value={watchSenior}
                      placeholder="Виберіть старшого"
                      styles={customStyles}
                      isSearchable={false}
                    />
                  )}
                />
                {errors.senior && (
                  <span style={{ color: 'red' }}>{errors.senior.message}</span>
                )}
              </Label>
              <Label>
                <Span>Звання старшого</Span>
                <Controller
                  name="seniorRank"
                  control={control}
                  rules={{ required: "Обов'язкове поле" }}
                  render={({ field }) => (
                    <LongInput
                      type="text"
                      placeholder="Введіть текст"
                      {...field}
                      onChange={e => setValue('seniorRank', e.target.value)}
                    />
                  )}
                />
                {errors.seniorRank && (
                  <span style={{ color: 'red' }}>
                    {errors.seniorRank.message}
                  </span>
                )}
              </Label>
            </InputDiv>
          </MainDiv>

          <BtnActive>
            <AddBtnStyle type="submit" name="add">
              Зберегти
            </AddBtnStyle>
          </BtnActive>
        </form>
      </ModalWindowStyle>
    </OverlayStyle>
  );
}
