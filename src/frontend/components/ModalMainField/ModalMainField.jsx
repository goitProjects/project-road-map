import {useEffect, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import {registerLocale, setDefaultLocale} from 'react-datepicker';
import uk from 'date-fns/locale/uk';
import {useSelector} from 'react-redux';
import {selectCars, selectPersonnel} from 'redux/infos/selectors';
import {
  ModalWindowStyle,
  OverlayStyle,
  ButtonCloseStyle,
  InformTitle,
  InputContainerDiv,
  ShortInputStyle,
  MidInputStyle,
  LongInput,
  InputRowDiv,
  Label,
  Span,
  TimeDiv,
  InputTimeDiv,
  ToLongInput,
  OdometerTitle,
  BtnPlus,
  OdomPlusContainer,
  CancelBtnStyle,
  ConfirmBtnStyle,
  BtnBox,
  BtnTrash,
  DatePickerOne,
  DatePickerTwo,
  DatePickerOneLeave,
} from '../ModalMainField/ModalMainFieldStyle';
import {Icon} from '../Icon';
import {Icons} from '../Icons';
import {IconStyle, PickerContainer} from '../ModalFuel/ModalFuelStyle';
import {selectForm} from "../../../redux/form/selectors";
import {customStyles,customStylesSen} from "./styles";

export default function Modal({
                                showCloseIcon = true,
                                onClose,
                                onSubmitCallbackMain,
                              }) {
  const [duplicateInputs, setDuplicateInputs] = useState(1);

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: {errors},
  } = useForm();

  const handleBtnPlusClick = () => {
    setDuplicateInputs(prevCount => prevCount + 1);
  };
  const mainForm = useSelector(selectForm);
  const handleBtnTrashClick = index => {
    const updatedInputs = [...Array(duplicateInputs)];

    updatedInputs.splice(index, 1);

    setValue(`departureDate[${index}]`, null);
    setValue(`departureTime[${index}]`, '');
    setValue(`speedOmeter[${index}]`, '');
    setDuplicateInputs(updatedInputs.length);
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  const closeClick = e => {
    if (e.target.name === 'cancel' || e.currentTarget.name === 'closeSvg') {
      onClose();
    }
  };

  const onSubmit = data => {
    console.log('data main form', data);
    onSubmitCallbackMain(data);
    onClose();
  };

  const handleReset = () => {
    reset();
    setValue(`documentDate`, '');
    setValue(`numberDocument`, '');
    setValue(`militaryBase`, '');
    setValue(`driver`, '');
    setValue(`seniorCar`, '');
    setValue(`trafficRoute`, '');
    setValue(`headAutoservice`, '');
    setValue(`seniorTechUnit`, '');
    setValue(`seniorKtp`, '');
    setValue(`purposeStatement`, '');
    setValue(`carName`, '');
    setValue(`sign`, '');
    setValue(`exploitationGroup`, '');
    for (let i = 0; i < duplicateInputs; i++) {
      setValue(`departureDate[${i}]`, null);
      setValue(`departureTime[${i}]`, '');
      setValue(`speedOmeter[${i}]`, '');

    }
  };
  registerLocale('uk', uk);
  setDefaultLocale('uk');
  // ----------------
  const personnel = useSelector(selectPersonnel);
  const cars = useSelector(selectCars);
  console.log("cars: ", cars)
  const [selectedSign, setSelectedSign] = useState(null);

  const carsOption = cars.map(
    ({carName, sign, driver, senior, unit, exploitationGroup}) => ({
      value: {carName, sign, driver, senior, unit, exploitationGroup},
      label: sign,
    })
  );

  // --
  const [selectedSeniorCar, setSelectedSeniorCar] = useState(null);
  console.log(selectedSeniorCar);
  const seniorCarArr = personnel.filter(
    el => el.position.toLowerCase() === 'старший машини'
  );
  const seniorCarOptions = seniorCarArr.map(({name, rank}) => ({
    value: {name, rank},
    label: name,
  }));

  // --

  const [selectedHeadOfCarService, setSelectedHeadOfCarService] =
    useState(null);
  console.log(selectedHeadOfCarService);
  const headOfCarServiceArr = personnel.filter(el =>
    el.position.toLowerCase().includes('начальник авто')
  );
  const headOfCarServiceOptions = headOfCarServiceArr.map(({name, rank}) => ({
    value: {name, rank},
    label: name,
  }));

  // --
  const [selectedSeniorTechUnit, setSelectedSeniorTechUnit] = useState(null);
  console.log(selectedSeniorTechUnit);
  const seniorTechUnitArr = personnel.filter(el =>
    el.position.toLowerCase().includes('технік')
  );
  const seniorTechUnitOptions = seniorTechUnitArr.map(({name, rank}) => ({
    value: {name, rank},
    label: name,
  }));
  // --
  const [selectedSeniorKtp, setSelectedSeniorKtp] = useState(null);
  console.log(selectedSeniorKtp);
  const seniorKtpArr = personnel.filter(
    el => el.position.toLowerCase() === 'начальник ктп'
  );
  const seniorKtpOptions = seniorKtpArr.map(({name, rank}) => ({
    value: {name, rank},
    label: name,
  }));
  // --

  const handleSelectCar = (selectedOption) => {
    const tmp = personnel.find(el =>
      el.name === selectedOption.value.driver
    )
    setValue('sign', selectedOption);
    setSelectedSign(selectedOption);
    setValue('driver_name', selectedOption.value.driver);
    setValue('driver_rank', tmp.rank);
    setValue('senior', selectedOption.value.senior);
    setValue('unit', selectedOption.value.unit);
    setValue('exploitationGroup', selectedOption.value.exploitationGroup);
    setValue('carName', selectedOption.value.carName);
  }

  const handleSelectSenior = (selectedOption) => {
    setValue('senior', selectedOption);
    setSelectedSeniorCar(selectedOption);
    setValue('seniorCarRank', selectedOption.value.rank);
  }
  const handleHeadOfCarServiceOptions = (selectedOption) => {
    setValue('headOfCarService', selectedOption.value);
    setSelectedHeadOfCarService(selectedOption);
  }
  // ----------------
  useEffect(() => {
    if (mainForm?.car?.carSign) {
      handleSelectCar(carsOption.find(item => item.label === mainForm?.car?.carSign))
    }
    if (mainForm?.supervisor?.name) {
      handleSelectSenior(seniorCarOptions.find(item => item.label === mainForm?.supervisor?.name))
    }
    // if (mainForm?.headOfCarService) {
    //   handleSelectSenior(mainForm.headOfCarService);
    // }

    if (mainForm?.documentNumber) {
      setValue('numberDocument', mainForm.documentNumber)
    }
    if (mainForm?.documentDate) {
      setValue('documentDate', mainForm.documentDate)
    }
    if (mainForm?.route) {
      setValue('trafficRoute', mainForm.route)
    }
    if (mainForm?.route) {
      setValue('trafficRoute', mainForm.route)
    }
    // if (mainForm?.supervisor?.name) {
    //   seniorTechUnitOptions.map(seniorCarOptions.find(item => item.label === mainForm?.supervisor?.name))
    // }
  }, [])
  return (
    <OverlayStyle onClick={e => handleBackdropClick(e)}>
      <Icons/>
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
              <path d="M1 1L17 17" stroke="#FBFBFB"/>
              <path d="M1 17L17 0.999999" stroke="#FBFBFB"/>
            </svg>
          </ButtonCloseStyle>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <InformTitle>Загальна інформація</InformTitle>

          <InputContainerDiv>
            <InputRowDiv>
              <Label>
                <Span>Дата документа</Span>
                <Controller
                  name="documentDate"
                  control={control}
                  rules={{
                    required: "Обов'язкове поле",
                    pattern: {
                      value:
                        /^(0[1-9]|1[0-9]|2[0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/,
                      message:
                        'Невірний формат (приклад правильного формату: 01.01.2023)',
                    },
                  }}
                  render={({field}) => (
                    <>
                      <PickerContainer>
                        <DatePickerOne
                          selected={field.value || mainForm.documentDate}
                          onChange={date => {
                            setValue('documentDate', date)
                          }}
                          dateFormat="dd.MM.yyyy"
                          placeholderText="00.00.0000"
                          showIcon
                          icon={
                            <IconStyle size={16} height={18} name="calendar"/>
                          }
                          locale="uk"
                        />
                        {errors.documentDate && (
                          <span style={{color: 'red'}}>
                            {errors.documentDate.message}
                          </span>
                        )}
                      </PickerContainer>
                    </>
                  )}
                />
              </Label>

              <Label>
                <Span>Номер документа</Span>
                <Controller
                  name="numberDocument"
                  control={control}
                  rules={{required: "Обов'язкове поле"}}
                  defaultValue={mainForm.documentNumber}
                  render={({field}) => (
                    <>
                      <ShortInputStyle
                        type="text"
                        placeholder="0"
                        {...field}
                        onChange={e =>
                          setValue('numberDocument', e.target.value)
                        }

                      />
                      {errors.numberDocument && (
                        <span style={{color: 'red'}}>
                          {errors.numberDocument.message}
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
                      value: /^[А-ЯІ][а-яі]+\s[А-ЯІ]\.[А-ЯІ]\.$/,
                      message:
                        'Невірний формат (приклад правильного формату : Бандера С.А.)',
                    },
                  }}
                  render={({field}) => (
                    <Select
                      {...field}
                      options={carsOption}
                      onChange={selectedOption => handleSelectCar(selectedOption)}
                      value={selectedSign}
                      placeholder="Обрати"
                      styles={customStyles}
                      defaultValue={mainForm?.car?.carSign}
                    />
                  )}
                />
                {errors.driver && (
                  <span style={{color: 'red'}}>{errors.driver.message}</span>
                )}
              </Label>
              <Label>
                <Span>Військова частина</Span>
                <Controller
                  name="unit"
                  control={control}
                  rules={{required: "Обов'язкове поле"}}
                  render={({field}) => (
                    <>
                      <MidInputStyle
                        style={{outline: 'none'}}
                        type="text"
                        placeholder="Автозаповнення"
                        readOnly
                        {...field}
                        onChange={e => setValue('unit', e.target.value)}
                      />
                      {errors.unit && (
                        <span style={{color: 'red'}}>
                          {errors.unit.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </Label>
            </InputRowDiv>
            <InputRowDiv>
              <Label>
                <Span>Старший машини</Span>
                <Controller
                  name="senior"
                  control={control}
                  rules={{
                    required: "Обов'язкове поле",
                  }}
                  render={({field}) => (
                    <>
                      <Select
                        {...field}
                        options={seniorCarOptions}
                        onChange={selectedOption => handleSelectSenior(selectedOption)}
                        value={selectedSeniorCar}
                        placeholder="Введіть текст"
                        styles={customStylesSen}
                        defaultValue={mainForm?.supervisor?.name}
                      />
                    </>
                  )}
                />
                {errors.senior && (
                  <span style={{color: 'red'}}>{errors.senior.message}</span>
                )}
              </Label>
              <Label>
                <Span>Маршрут руху</Span> {/* legend */}
                <Controller
                  name="trafficRoute"
                  control={control}
                  rules={{required: "Обов'язкове поле"}}
                  render={({field}) => (
                    <>
                      <LongInput
                        type="text"
                        placeholder="Введіть текст"
                        {...field}
                        onChange={e => setValue('trafficRoute', e.target.value)}
                        defaultValue={mainForm.route}
                      />
                      {errors.trafficRoute && (
                        <span style={{color: 'red'}}>
                          {errors.trafficRoute.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </Label>
              <Label>
                <Span>Начальник авто служби</Span>
                <Controller
                  name="headOfCarService"
                  control={control}
                  rules={{
                    required: "Обов'язкове поле",
                    pattern: {
                      value: /^[А-ЯІ][а-яі]+\s[А-ЯІ]\.[А-ЯІ]\.$/,
                      message:
                        'Невірний формат (приклад правильного формату : Бандера С.А.)',
                    },
                  }}
                  render={({field}) => (
                    <>
                      <Select
                        {...field}
                        options={headOfCarServiceOptions}
                        onChange={selectedOption => handleHeadOfCarServiceOptions(selectedOption)}
                        value={selectedHeadOfCarService}
                        placeholder="Введіть текст"
                        styles={customStylesSen}
                      />
                    </>
                  )}
                />
                {errors.headOfCarService && (
                  <span style={{color: 'red'}}>
                    {errors.headOfCarService.message}
                  </span>
                )}
              </Label>
            </InputRowDiv>
            <InputRowDiv>
              <Label>
                <Span>Старший (технік) підрозділу</Span>
                <Controller
                  name="seniorTechUnit"
                  control={control}
                  rules={{
                    required: "Обов'язкове поле",
                    pattern: {
                      value: /^[А-ЯІ][а-яі]+\s[А-ЯІ]\.[А-ЯІ]\.$/,
                      message:
                        'Невірний формат (приклад правильного формату : Бандера С.А.)',
                    },
                  }}
                  render={({field}) => (
                    <>
                      <Select
                        {...field}
                        options={seniorTechUnitOptions}
                        onChange={selectedOption => {
                          setValue('seniorTechUnit', selectedOption);
                          setSelectedSeniorTechUnit(selectedOption);
                          setValue(
                            'seniorTechUnitRank',
                            selectedOption.value.rank
                          );
                        }}
                        value={selectedSeniorTechUnit}
                        placeholder="Введіть текст"
                        styles={customStylesSen}
                      />
                    </>
                  )}
                />
                {errors.seniorTechUnit && (
                  <span style={{color: 'red'}}>
                    {errors.seniorTechUnit.message}
                  </span>
                )}
              </Label>
              <Label>
                <Span>Начальник КТП</Span>
                <Controller
                  name="seniorKtp"
                  control={control}
                  rules={{
                    required: "Обов'язкове поле",
                    pattern: {
                      value: /^[А-ЯІ][а-яі]+\s[А-ЯІ]\.[А-ЯІ]\.$/,
                      message:
                        'Невірний формат (приклад правильного формату : Бандера С.А.)',
                    },
                  }}
                  render={({field}) => (
                    <>
                      <Select
                        {...field}
                        options={seniorKtpOptions}
                        onChange={selectedOption => {
                          setValue('seniorKtp', selectedOption);
                          setSelectedSeniorKtp(selectedOption);
                          setValue('seniorKtpRank', selectedOption.value.rank);
                        }}
                        value={selectedSeniorKtp}
                        placeholder="Введіть текст"
                        styles={customStylesSen}
                      />
                    </>
                  )}
                />
                {errors.seniorKtp && (
                  <span style={{color: 'red'}}>
                    {errors.seniorKtp.message}
                  </span>
                )}
              </Label>
              <Label>
                <Span>Підстава (мета) виписки</Span>
                <Controller
                  name="purposeStatement"
                  control={control}
                  rules={{required: "Обов'язкове поле"}}
                  render={({field}) => (
                    <>
                      <LongInput
                        type="text"
                        placeholder="0"
                        {...field}
                        onChange={e =>
                          setValue('purposeStatement', e.target.value)
                        }
                      />
                      {errors.purposeStatement && (
                        <span style={{color: 'red'}}>
                          {errors.purposeStatement.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </Label>
            </InputRowDiv>
            <InputRowDiv>
              <Label>
                <Span>Марка автомобіля</Span>
                <Controller
                  name="carName"
                  control={control}
                  rules={{
                    required: "Обов'язкове поле",
                  }}
                  render={({field}) => (
                    <>
                      <LongInput
                        style={{outline: 'none'}}
                        placeholder="Автозаповнення"
                        readOnly
                        type="text"
                        {...field}
                        onChange={e => setValue('carName', e.target.value)}
                      />
                      {errors.carName && (
                        <span style={{color: 'red'}}>
                          {errors.carName.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </Label>
              <Label>
                <Span>Водій</Span>
                <Controller
                  name="driver_name"
                  control={control}
                  render={({field}) => (
                    <>
                      <LongInput
                        style={{outline: 'none'}}
                        type="text"
                        placeholder="Автозаповнення"
                        readOnly
                        {...field}
                        onChange={e => setValue('sign', e.target.value)}
                      />
                      {errors.sign && (
                        <span style={{color: 'red'}}>
                          {errors.sign.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </Label>
              <Label>
                <Span>Група експлуатації</Span>
                <Controller
                  name="exploitationGroup"
                  control={control}
                  rules={{required: "Обов'язкове поле"}}
                  render={({field}) => (
                    <LongInput
                      style={{outline: 'none'}}
                      placeholder="Автозаповнення"
                      type="text"
                      readOnly
                      {...field}
                      onChange={e =>
                        setValue('exploitationGroup', e.target.value)
                      }
                    />
                  )}
                />
                {errors.exploitationGroup && (
                  <span style={{color: 'red'}}>
                    {errors.exploitationGroup.message}
                  </span>
                )}
              </Label>
            </InputRowDiv>
            <InputRowDiv>
              <Label>
                <Span>Вибуття за нарядом</Span>
                <Controller
                  name="documentDateLeave"
                  control={control}
                  rules={{
                    required: "Обов'язкове поле",
                    pattern: {
                      value:
                        /^(0[1-9]|1[0-9]|2[0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/,
                      message:
                        'Невірний формат (приклад правильного формату: 01.01.2023)',
                    },
                  }}
                  render={({field}) => (
                    <>
                      <PickerContainer>
                        <DatePickerOneLeave
                          selected={field.value}
                          onChange={date => setValue('documentDateLeave', date)}
                          dateFormat="dd.MM.yyyy HH:mm"
                          placeholderText="00.00.0000 00:00"
                          showTimeSelect
                          locale="uk"
                          timeIntervals={5}
                          timeFormat="HH:mm"
                          showIcon
                          icon={
                            <IconStyle size={16} height={18} name="calendar"/>
                          }
                        />

                        {errors.documentDateLeave && (
                          <span style={{color: 'red'}}>
                            {errors.documentDateLeave.message}
                          </span>
                        )}
                      </PickerContainer>
                    </>
                  )}
                />
              </Label>
              <Label>
                <Span>Прибуття за нарядом</Span>
                <Controller
                  name="documentDateCome"
                  control={control}
                  rules={{
                    required: "Обов'язкове поле",
                    pattern: {
                      value:
                        /^(0[1-9]|1[0-9]|2[0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/,
                      message:
                        'Невірний формат (приклад правильного формату: 01.01.2023)',
                    },
                  }}
                  render={({field}) => (
                    <>
                      <PickerContainer>
                        <DatePickerOneLeave
                          selected={field.value}
                          onChange={date => setValue('documentDateCome', date)}
                          dateFormat="dd.MM.yyyy HH:mm"
                          placeholderText="00.00.0000 00:00"
                          showTimeSelect
                          locale="uk"
                          timeIntervals={5}
                          timeFormat="HH:mm"
                          showIcon
                          icon={
                            <IconStyle size={16} height={18} name="calendar"/>
                          }
                        />

                        {errors.documentDateCome && (
                          <span style={{color: 'red'}}>
                            {errors.documentDateCome.message}
                          </span>
                        )}
                      </PickerContainer>
                    </>
                  )}
                />
              </Label>
            </InputRowDiv>
          </InputContainerDiv>
          <OdomPlusContainer>
            <OdometerTitle>Показники спідометра</OdometerTitle>
            <BtnPlus onClick={handleBtnPlusClick}>
              <Icon size={28} name="plus"/>
            </BtnPlus>
          </OdomPlusContainer>

          <TimeDiv>
            {[...Array(duplicateInputs)].map((_, index) => (
              <InputTimeDiv key={index}>
                <Label>
                  <Span>Дата вибуття</Span>
                  <Controller
                    name={`departureDate[${index}]`}
                    control={control}
                    rules={{
                      required: "Обов'язкове поле",
                      pattern: {
                        value:
                          /^(0[1-9]|1[0-9]|2[0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/,
                        message:
                          'Невірний формат (приклад правильного формату: 01.01.2023)',
                      },
                    }}
                    render={({field}) => (
                      <>
                        <PickerContainer>
                          <DatePickerTwo
                            selected={field.value}
                            onChange={date =>
                              setValue(`departureDate[${index}]`, date)
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
                          />
                          {errors.departureDate && (
                            <span style={{color: 'red'}}>
                              {errors.departureDate.message}
                            </span>
                          )}
                        </PickerContainer>
                      </>
                    )}
                  />
                </Label>
                <Label>
                  <Span>Час вибуття</Span>
                  <Controller
                    name={`departureTime[${index}]`}
                    control={control}
                    rules={{
                      required: "Обов'язкове поле",
                    }}
                    render={({field}) => (
                      <>
                        <Select
                          {...field}
                          options={Array.from(
                            {length: (24 * 60) / 5},
                            (v, i) => {
                              const totalMinutes = i * 5;
                              const hours = Math.floor(totalMinutes / 60)
                                .toString()
                                .padStart(2, '0');
                              const minutes = (totalMinutes % 60)
                                .toString()
                                .padStart(2, '0');
                              const time = `${hours}:${minutes}`;
                              return {value: time, label: time};
                            }
                          )}
                          onChange={selectedOption =>
                            setValue(
                              `departureTime[${index}]`,

                              selectedOption.value
                            )
                          }
                          placeholder="00:00"
                          value={
                            field.value
                              ? {value: field.value, label: field.value}
                              : null
                          }
                          styles={customStyles}
                        />
                        {errors[`departureTime[${index}]`] && (
                          <span style={{color: 'red'}}>
                            {errors[`departureTime[${index}]`].message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </Label>

                <Label>
                  <Span>Показники спідометра по вибуттю</Span>
                  <Controller
                    name={`speedOmeter[${index}]`}
                    control={control}
                    rules={{
                      required: "Обов'язкове поле",
                      pattern: {
                        value: /^\d+$/,
                        message: 'Можна вводити тільки числа',
                      },
                    }}
                    render={({field}) => (
                      <>
                        <ToLongInput
                          type="text"
                          placeholder="Введіть текст"
                          {...field}
                          onChange={e =>
                            setValue(`speedOmeter[${index}]`, e.target.value)
                          }
                        />
                        {errors.speedOmeter && (
                          <span style={{color: 'red'}}>
                            {errors.speedOmeter.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </Label>

                <Label>
                  <Span>&nbsp;</Span>
                  <BtnTrash
                    type="button
          "
                    onClick={() => handleBtnTrashClick(index)}
                  >
                    
                    <Icon size={16} name="trash"/>
                  </BtnTrash>
                </Label>
              </InputTimeDiv>
            ))}
          </TimeDiv>
          <TimeDiv>
            {[...Array(duplicateInputs)].map((_, index) => (
              <InputTimeDiv key={index}>
                <Label>
                  <Span>Дата прибуття</Span>
                  <Controller
                    name={`arrivalDate[${index}]`}
                    control={control}
                    rules={{
                      required: "Обов'язкове поле",
                      pattern: {
                        value:
                          /^(0[1-9]|1[0-9]|2[0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/,
                        message:
                          'Невірний формат (приклад правильного формату: 01.01.2023)',
                      },
                    }}
                    render={({field}) => (
                      <>
                        <PickerContainer>
                          <DatePickerTwo
                            selected={field.value}
                            onChange={date =>
                              setValue(`arrivalDate[${index}]`, date)
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
                          />
                          {errors.arrivalDate && (
                            <span style={{color: 'red'}}>
                              {errors.arrivalDate.message}
                            </span>
                          )}
                        </PickerContainer>
                      </>
                    )}
                  />
                </Label>
                <Label>
                  <Span>Час прибуття</Span>
                  <Controller
                    name={`arrivalTime[${index}]`}
                    control={control}
                    rules={{
                      required: "Обов'язкове поле",
                    }}
                    render={({field}) => (
                      <>
                        <Select
                          {...field}
                          options={Array.from(
                            {length: (24 * 60) / 5},
                            (v, i) => {
                              const totalMinutes = i * 5;
                              const hours = Math.floor(totalMinutes / 60)
                                .toString()
                                .padStart(2, '0');
                              const minutes = (totalMinutes % 60)
                                .toString()
                                .padStart(2, '0');
                              const time = `${hours}:${minutes}`;
                              return {value: time, label: time};
                            }
                          )}
                          onChange={selectedOption =>
                            setValue(
                              `arrivalTime[${index}]`,
                              selectedOption.value
                            )
                          }
                          placeholder="00:00"
                          value={
                            field.value
                              ? {value: field.value, label: field.value}
                              : null
                          }
                          styles={customStyles}
                        />
                        {errors[`arrivalTime[${index}]`] && (
                          <span style={{color: 'red'}}>
                            {errors[`arrivalTime[${index}]`].message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </Label>

                <Label>
                  <Span>Показники по прибуттю</Span>
                  <Controller
                    name={`speedOmeterArrival[${index}]`}
                    control={control}
                    rules={{
                      required: "Обов'язкове поле",
                      pattern: {
                        value: /^\d*$/, // Разрешить только цифры
                        message: 'Можна вводити тільки числа',
                      },
                    }}
                    render={({field}) => (
                      <>
                        <ToLongInput
                          type="text"
                          placeholder="Введіть текст Arrival"
                          {...field}
                          onChange={e =>
                            setValue(
                              `speedOmeterArrival[${index}]`,
                              e.target.value
                            )
                          }
                          onKeyPress={e => {
                            // Разрешить только цифры или пустой ввод
                            const isValidInput = /^\d*$/.test(e.key);
                            if (!isValidInput) {
                              e.preventDefault();
                            }
                          }}
                        />
                        {errors.speedOmeterArrival && (
                          <span style={{color: 'red'}}>
                            {errors.speedOmeterArrival.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </Label>

                <Label>
                  <Span>&nbsp;</Span>
                  <BtnTrash
                    type="button
          "
                    onClick={() => handleBtnTrashClick(index)}
                  >
                    
                    <Icon size={16} name="trash"/>
                  </BtnTrash>
                </Label>
              </InputTimeDiv>
            ))}
          </TimeDiv>
          <BtnBox>
            <ConfirmBtnStyle
              type="submit
          "
              name="confirm"
            >
              Додати
            </ConfirmBtnStyle>
            <CancelBtnStyle type="button" name="cancel" onClick={handleReset}>
              Видалити
            </CancelBtnStyle>
          </BtnBox>
        </form>
      </ModalWindowStyle>
    </OverlayStyle>
  );
}
