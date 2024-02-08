import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { selectPersonnel } from 'redux/infos/selectors';
import downloadMainList from 'redux/download/operations';
import {
  selectCar,
  selectCheckPerson,
  selectForm,
  selectRoutes,
} from 'redux/form/selectors';
import { setCarWork, setCheckedDate, setPersonnel } from 'redux/form/slice';
import { components } from 'react-select';
import { VscChevronDown } from 'react-icons/vsc';
import uk from 'date-fns/locale/uk';
import {
  AuxWrapper,
  BtnBox,
  BtnSection,
  CalcDiv,
  InputWrapper,
  PersonnelDiv,
  SectionHead,
  InfoBtn,
  SaveBtn,
  TBodyRow,
  StyledTBody,
  StyledTFoot,
  StyledTHead,
  StyledTable,
  StyledTitle,
  SubRow,
  SubSubRow,
  TableScroll,
  TableSection,
  StyledLink,
  StyledNav,
  Line,
  TFootRow,
  THeadRow,
  StyledSelect,
} from './CarWorkingInfo.styled';
import CarInfoModal from '../CarInfoModal/CarInfoModal';
import {
  DatePickerOne,
  PickerContainer,
  IconStyleCalendar,
} from '../CarInfoModal/CarInfoModal.styled';
import EditRouteModal from '../EditRouteInfo/EditRouteInfo';
import ChooseRouteModal from '../ChooseRouteModal/ChooseRouteModal';
import moment from 'moment';

const CarWorkingInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editRouteOpen, setEditRouteOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [driverSelect, setDriverOption] = useState(null);
  const [checkedSelect, setCheckedOption] = useState(null);

  const dispatch = useDispatch();

  const routes = useSelector(selectRoutes);
  const personnel = useSelector(selectPersonnel);
  const selectedCar = useSelector(selectCar);
  const checkPerson = useSelector(selectCheckPerson);
  const formToSend = useSelector(selectForm);

  const totalMil = routes.reduce((acc, item) => {
    return (acc += Number(item?.mileage.total));
  }, 0);
  const formula =
    (selectedCar.fuelConsumption * totalMil) / 100 -
    ((selectedCar.fuelConsumption * totalMil) / 100) * 0.15;

  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (
      selectedCar.driver.name ||
      selectedCar.driver.rank ||
      selectedCar.driver.position
    ) {
      const driverOption = {
        value: selectedCar.driver?.rank,
        label: selectedCar.driver?.name,
      };
      setDriverOption(driverOption);
    }
  }, [selectedCar]);

  useEffect(() => {
    if (checkPerson.name || checkPerson.rank || checkPerson.position) {
      const checkOption = {
        value: checkPerson,
        label: checkPerson.name,
      };
      setCheckedOption(checkOption);
    }
  }, [checkPerson]);

  useEffect(() => {
    if (routes.length !== 0) {
      dispatch(
        setCarWork({
          totalMileage: totalMil,
          totalExpense: formula,
        })
      );
    }
  }, [dispatch, routes, totalMil, formula]);

  useEffect(() => {
    setValue('driverRank', selectedCar.driver.rank);
  }, [setValue, selectedCar]);

  useEffect(() => {
    setValue('checkPos', checkPerson.position);
    setValue('checkRank', checkPerson.rank);
  }, [setValue, checkPerson]);

  const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <VscChevronDown />
      </components.DropdownIndicator>
    );
  };

  const driverArr = personnel.filter(el =>
    el.position.toLowerCase().includes('водій')
  );
  const driverOptions = driverArr.map(({ name, rank }) => ({
    value: rank,
    label: name,
  }));
  const checkedOptions = personnel.map(person => ({
    value: person,
    label: person.name,
  }));

  const renderInstruction = () => {
    const renderCollection = () => {
      return routes.map(route => {
        const {
          id,
          from,
          to,
          depTime,
          arrTime,
          mileage,
          motorHours,
          work,
          odometer,
        } = route;
        return (
          <TBodyRow key={id}>
            <td>
              {from} - {to}
              {route.return === 'так' ? null : ` - ${from}`}
            </td>
            <td>{depTime}</td>
            <td>{arrTime}</td>
            <td>{mileage.withCargo}</td>
            <td>{mileage.withoutCargo}</td>
            <td>{mileage.total}</td>
            <td>{mileage.withTrailer}</td>
            <td>{mileage.withTug}</td>
            <td>{motorHours.onStay}</td>
            <td>{motorHours.onMove}</td>
            <td>{motorHours.sum}</td>
            <td>{work.nameCargo}</td>
            <td>{work.weight}</td>
            <td>{odometer}</td>
          </TBodyRow>
        );
      });
    };
    let emptyRowArr = [];
    for (let i = 0; i < 14; i++) {
      emptyRowArr.push(<td key={i}></td>);
    }
    const renderEmpty = () => {
      return (
        <>
          <TBodyRow>{emptyRowArr.map(item => item)}</TBodyRow>
        </>
      );
    };
    switch (routes.length) {
      case 0:
        return (
          <>
            {renderEmpty()}
            {renderEmpty()}
          </>
        );
      case 1:
        return (
          <>
            {renderCollection()}
            {renderEmpty()}
          </>
        );

      default:
        return renderCollection();
    }
  };

  const onSubmit = data => {};

  const saveExcel = () => {
    dispatch(downloadMainList(formToSend))
      .unwrap()
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const date = new Date().toLocaleDateString();
        a.download = `roadList#${date}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openEditModal = () => {
    setEditModalOpen(true);
  };
  const closeEditModal = () => {
    setEditModalOpen(false);
  };
  const openEditRoute = id => {
    setSelectedRoute(id);
    setEditRouteOpen(true);
  };
  const closeEditRoute = () => {
    setEditRouteOpen(false);
  };

  return (
    <>
      <BtnSection>
        <SectionHead>
          <StyledTitle>Дорожній лист</StyledTitle>
          <BtnBox>
            <InfoBtn onClick={openModal}>Додати загальну інформацію</InfoBtn>
            <InfoBtn
              onClick={openEditModal}
              disabled={routes.length === 0 ? true : false}
            >
              Редагувати
            </InfoBtn>
            <SaveBtn onClick={saveExcel}>Зберегти в Excel</SaveBtn>
          </BtnBox>
        </SectionHead>
        <StyledNav>
          <StyledLink to="/papers/general">Загальна інформація</StyledLink>
          <StyledLink to="/papers/car">Робота машини</StyledLink>
        </StyledNav>
        <Line />
      </BtnSection>
      <TableSection className="printable">
        <TableScroll>
          <StyledTable>
            <StyledTHead>
              <THeadRow>
                <th scope="col" rowSpan={3}>
                  Маршрут руху (звідки, куди)
                </th>
                <th scope="colgroup" colSpan={2}>
                  Дата і час (години, хвилини)
                </th>
                <th scope="colgroup" colSpan={5}>
                  Пройдено кілометрів
                </th>
                <th scope="colgroup" colSpan={3}>
                  Відпрацьовано мотогодин
                </th>
                <th scope="colgroup" colSpan={2}>
                  Виконана робота
                </th>
                <th scope="col" rowSpan={3}>
                  Показанння спідометра, час і місце відпускання машини, підпис
                  старшого машини (особа, яка використовувала машину)
                </th>
              </THeadRow>
              <SubRow>
                <th scope="col" rowSpan={2}>
                  Вибуття
                </th>
                <th scope="col" rowSpan={2}>
                  Прибуття
                </th>
                <th scope="col" rowSpan={2}>
                  З вантажем
                </th>
                <th scope="col" rowSpan={2}>
                  Без вантажу
                </th>
                <th scope="col" rowSpan={2}>
                  Усього
                </th>
                <th scope="colgroup" colSpan={2}>
                  У тому числі
                </th>
                <th scope="col" rowSpan={2}>
                  На місці
                </th>
                <th scope="col" rowSpan={2}>
                  Під часу руху
                </th>
                <th scope="col" rowSpan={2}>
                  Усього
                </th>
                <th scope="col" rowSpan={2}>
                  Найменування вантажу
                </th>
                <th scope="col" rowSpan={2}>
                  Кількість, т
                </th>
              </SubRow>
              <SubSubRow>
                <th scope="col">З приче пом</th>
                <th scope="col">На буксирі</th>
              </SubSubRow>
            </StyledTHead>
            <StyledTBody>{renderInstruction()}</StyledTBody>
            <StyledTFoot>
              <TFootRow>
                <th scope="row">Всього: </th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>{totalMil || null}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </TFootRow>
            </StyledTFoot>
          </StyledTable>
        </TableScroll>
        <CalcDiv>
          <p>
            Всього пройдено: <span>{totalMil}</span>
          </p>
          <p>
            Всього витрачено:
            <span>
              {(selectedCar.fuelConsumption !== '' &&
                formula > 0 &&
                formula.toFixed(2)) ||
                0}
            </span>
          </p>
        </CalcDiv>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PersonnelDiv>
            <p>Водій (механік - водій):</p>
            <InputWrapper>
              <StyledSelect
                options={driverOptions}
                {...register('driver')}
                value={driverSelect}
                onChange={value => {
                  const driverFull = personnel.find(
                    person => value.label === person.name
                  );
                  dispatch(setPersonnel({ driver: driverFull, checkPerson }));
                }}
                components={{ DropdownIndicator }}
                ariaLabel={'Водій'}
                placeholder="Водій"
                classNamePrefix="Select"
              />
              <input
                {...register('driverRank')}
                type={'text'}
                placeholder={'Військове звання'}
                readOnly={true}
              />
            </InputWrapper>
          </PersonnelDiv>
          <PersonnelDiv>
            <p>Правильність оформлення дорожнього листа перевірив:</p>
            <AuxWrapper>
              <InputWrapper>
                <StyledSelect
                  options={checkedOptions}
                  {...register('checkPerson')}
                  value={checkedSelect}
                  onChange={({ value }) => {
                    dispatch(
                      setPersonnel({
                        driver: selectedCar.driver,
                        checkPerson: value,
                      })
                    );
                  }}
                  components={{ DropdownIndicator }}
                  ariaLabel={'Прізвище, ініціали'}
                  placeholder="Прізвище, ініціали"
                  classNamePrefix="Select"
                />
                <input
                  {...register('checkPos')}
                  type={'text'}
                  placeholder={'Посада'}
                  readOnly={true}
                />
                <input
                  {...register('checkRank')}
                  type={'text'}
                  placeholder={'Військове звання'}
                  readOnly={true}
                />
              </InputWrapper>
              <Controller
                name="checkedDate"
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
                render={({ field }) => (
                  <>
                    <PickerContainer>
                      <DatePickerOne
                        selected={field.value}
                        onChange={date => {
                          setValue(`checkedDate`, date);
                          dispatch(
                            setCheckedDate(moment(date).format('DD.MM.YY'))
                          );
                        }}
                        locale={uk}
                        dateFormat="dd.MM.yyyy"
                        placeholderText="00.00.0000"
                        showIcon
                        icon={
                          <IconStyleCalendar
                            size={16}
                            height={18}
                            name="dark-calendar"
                          />
                        }
                      />
                      {errors.checkedDate && (
                        <span style={{ color: 'red' }}>
                          {errors.checkedDate.message}
                        </span>
                      )}
                    </PickerContainer>
                  </>
                )}
              />
            </AuxWrapper>
          </PersonnelDiv>
        </form>
      </TableSection>
      {isModalOpen && <CarInfoModal onClose={closeModal} />}
      {editModalOpen && (
        <ChooseRouteModal
          onClose={closeEditModal}
          openEdit={openEditRoute}
          selectRoute={setSelectedRoute}
        />
      )}
      {editRouteOpen && (
        <EditRouteModal onClose={closeEditRoute} id={selectedRoute} />
      )}
    </>
  );
};

export default CarWorkingInfo;
